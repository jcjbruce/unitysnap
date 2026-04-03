import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessName, contactName, contactEmail, contactPhone, formData, fileUrls } = req.body;

  if (!formData || typeof formData !== "object") {
    return res.status(400).json({ error: "formData is required" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[intake-submit] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const submission = {
    project_slug: businessName ?? "unknown",
    contact_email: contactEmail ?? "unknown",
    payload: {
      business_name: businessName ?? null,
      contact_name: contactName ?? null,
      contact_phone: contactPhone ?? null,
      form_data: formData,
      file_urls: Array.isArray(fileUrls) ? fileUrls : [],
    },
  };

  // Primary insert
  let id: string | number | null = null;
  const { data, error } = await supabase
    .from("intake_submissions")
    .insert(submission)
    .select("id")
    .single();

  if (!error) {
    id = data.id;
  } else {
    console.error("[intake-submit] Primary insert failed:", error.message);

    // Fallback to backup table
    const { data: backupData, error: backupError } = await supabase
      .from("intake_submissions_backup")
      .insert({ ...submission, error_log: { error: error.message } })
      .select("id")
      .single();

    if (backupError) {
      console.error("[intake-submit] Backup insert also failed:", backupError.message);
      return res.status(500).json({ error: "Failed to save submission" });
    }

    id = backupData.id;
    console.warn("[intake-submit] Saved to backup table");
  }

  // Send email notification via Resend
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);

      // ─── Build email HTML ───────────────────────────────────────
      const sections = [
        { title: "1 — Brand & Identity", fields: [
          { key: "business_name", label: "Business name" },
          { key: "tagline", label: "Tagline or motto" },
          { key: "boutique_feeling", label: "How would you describe the feeling of walking into your boutique?" },
          { key: "brand_words", label: "Three words that describe your brand" },
        ]},
        { title: "2 — Typography", fields: [
          { key: "has_existing_fonts", label: "Do you have existing fonts you use?" },
          { key: "existing_font_description", label: "Please name or describe them" },
          { key: "typography_files", label: "Uploaded typography materials", isFile: true },
          { key: "preferred_font_pairing", label: "Which serif pairing feels most like Becker's?" },
          { key: "fonts_to_avoid", label: "Any fonts you want to avoid?" },
        ]},
        { title: "3 — Color Palette", fields: [
          { key: "has_color_palette", label: "Do you have an existing color palette?" },
          { key: "color_reference", label: "Describe your colors" },
          { key: "color_reference_files", label: "Uploaded color palette / style inspiration", isFile: true },
          { key: "color_mood", label: "Which mood feels closest to what you envision?" },
          { key: "colors_to_avoid", label: "Any colors to avoid?" },
        ]},
        { title: "4 — Photography & Visual Assets", fields: [
          { key: "has_interior_photos", label: "Do you have professional photos of the boutique interior?" },
          { key: "has_wedding_photos", label: "Do you have professional wedding photos you have rights to use?" },
          { key: "photo_files", label: "Uploaded photos", isFile: true },
          { key: "photographer_contacts", label: "Any photographers we should contact for image rights?" },
          { key: "visual_inspiration", label: "Any visual references or styles you love?" },
        ]},
        { title: "5 — Website Content", fields: [
          { key: "store_hours", label: "Store hours" },
          { key: "phone", label: "Phone number for the site" },
          { key: "email", label: "Contact email for the site" },
          { key: "contact_preference", label: "Contact preference displayed on site" },
          { key: "additional_pages", label: "Additional pages or menu items to include" },
        ]},
        { title: "6 — Designers & Collections", fields: [
          { key: "designers", label: "Designers or collections currently carried" },
          { key: "featured_designers", label: "Any you'd like featured prominently?" },
          { key: "designer_logo_files", label: "Uploaded designer logos / brand assets", isFile: true },
        ]},
        { title: "7 — Real Bride Stories", fields: [
          { key: "has_bride_stories", label: "Do you have past brides willing to share a quote or photo?" },
          { key: "bride_stories_approach", label: "How you'd like to approach collecting these?" },
        ]},
        { title: "8 — Hosting", fields: [
          { key: "hosting_preference", label: "Would you like Civic Firm to manage your website hosting?" },
        ]},
        { title: "9 — Inspiration", fields: [
          { key: "inspiration_urls", label: "Up to 3 websites you admire (any industry)" },
          { key: "non_bridal_inspiration", label: "Any other sites or visual references whose look and feel you love?" },
          { key: "social_inspiration", label: "Any social media accounts or posts that capture the vibe you want?" },
          { key: "social_inspiration_files", label: "Uploaded social inspiration", isFile: true },
          { key: "dont_want", label: "Anything you definitely don't want the site to look or feel like?" },
        ]},
        { title: "10 — Anything Else", fields: [
          { key: "anything_else", label: "Anything important about Becker's we should know before we start?" },
          { key: "questions_for_us", label: "Any questions for us?" },
        ]},
        { title: "Service Agreement", fields: [
          { key: "agreement_signatory", label: "Signed by" },
          { key: "agreement_title", label: "Title / Role" },
          { key: "agreement_accepted", label: "Agreement accepted" },
          { key: "agreement_date", label: "Date signed" },
        ]},
      ];

      const sectionStyle = `font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #c9b99a; margin: 0 0 20px; padding-top: 8px;`;
      const labelStyle = `font-size: 12px; color: #6b7b6b; margin-bottom: 4px;`;
      const valueStyle = `font-size: 14px; line-height: 1.7; color: #2a3a2a; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #f0ebe5;`;

      const renderFileField = (val: string) => {
        return val.split(", ").filter(Boolean).map((fileUrl: string) => {
          const rawName = decodeURIComponent(fileUrl.split("/").pop() || fileUrl);
          const fileName = rawName.replace(/^[a-zA-Z0-9_-]{10,12}-/, "");
          if (fileUrl.startsWith("http")) {
            return `
              <div style="margin-bottom: 10px; padding: 10px 14px; background: #faf8f5; border: 1px solid #e8e0d8; border-radius: 4px;">
                <a href="${fileUrl}" style="color: #4a5a4a; text-decoration: none; font-size: 14px;">
                  📎 <strong>${fileName}</strong>
                </a>
                <div style="margin-top: 4px;">
                  <a href="${fileUrl}" style="font-size: 11px; color: #c9b99a; text-decoration: underline;">View / Download</a>
                </div>
              </div>`;
          }
          return `<div style="margin-bottom: 8px;">📎 ${fileName}</div>`;
        }).join("");
      };

      const sectionsHtml = sections.map((section) => {
        const fieldsHtml = section.fields
          .filter((f) => formData[f.key] && String(formData[f.key]).trim())
          .map((f) => {
            const val = String(formData[f.key]);
            const display = f.isFile ? renderFileField(val) : val.replace(/\n/g, "<br/>");
            return `<div style="${labelStyle}">${f.label}</div><div style="${valueStyle}">${display}</div>`;
          }).join("");
        if (!fieldsHtml) return "";
        return `
          <div style="padding: 24px 32px; background: #fff; border-bottom: 1px solid #e8e0d8;">
            <h2 style="${sectionStyle}">${section.title}</h2>
            ${fieldsHtml}
          </div>`;
      }).filter(Boolean).join("");

      await resend.emails.send({
        from: "Civic Firm Intake <intake@civicfirm.com>",
        to: "info@civicfirm.com",
        subject: `New Intake: ${businessName || "Unknown"}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #2a3a2a;">
            <div style="background: #f5f0eb; padding: 24px 32px; border-bottom: 2px solid #c9b99a;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 500;">Client Intake Form</h1>
              <p style="margin: 8px 0 0; color: #6b7b6b; font-size: 14px;">${businessName || "Unknown Business"}</p>
            </div>

            <div style="padding: 24px 32px; background: #fff; border-bottom: 1px solid #e8e0d8;">
              <h2 style="${sectionStyle}">Contact</h2>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7b6b; width: 120px;">Business</td><td style="padding: 6px 0; font-weight: 500;">${businessName || "N/A"}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7b6b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${contactEmail}" style="color: #4a5a4a;">${contactEmail || "N/A"}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6b7b6b;">Phone</td><td style="padding: 6px 0;">${contactPhone || "N/A"}</td></tr>
              </table>
            </div>

            ${sectionsHtml}

            <div style="padding: 16px 32px; background: #f5f0eb; font-size: 12px; color: #a8b8a8;">
              Submission ID: ${id}
            </div>
          </div>
        `,
      });
    }
  } catch (e) {
    console.warn("[intake-submit] Failed to send email:", e);
  }

  return res.status(200).json({ success: true, id });
}
