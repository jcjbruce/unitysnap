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
      // Build a clean summary of every form field
      const fieldLabels: Record<string, string> = {
        // Section 1: Brand & Heritage
        business_name: "Business Name",
        tagline: "Tagline",
        boutique_feeling: "Boutique Feeling",
        brand_words: "Brand Words",
        // Section 2: Typography
        has_existing_fonts: "Has Existing Fonts",
        existing_font_description: "Existing Font Description",
        typography_files: "Typography Files",
        preferred_font_pairing: "Preferred Font Pairing",
        fonts_to_avoid: "Fonts to Avoid",
        // Section 3: Color Palette
        has_color_palette: "Has Color Palette",
        color_reference: "Color Reference",
        color_reference_files: "Color Reference Files",
        color_mood: "Color Mood",
        colors_to_avoid: "Colors to Avoid",
        // Section 4: Photography
        has_interior_photos: "Has Interior Photos",
        has_wedding_photos: "Has Wedding Photos",
        photo_files: "Photo Files",
        photographer_contacts: "Photographer Contacts",
        visual_inspiration: "Visual Inspiration",
        // Section 5: Contact & Pages
        store_hours: "Store Hours",
        phone: "Phone",
        email: "Email",
        contact_preference: "Preferred Contact Method",
        additional_pages: "Additional Pages Requested",
        // Section 6: Designers
        designers: "Designers Carried",
        featured_designers: "Featured Designers",
        designer_logo_files: "Designer Logo Files",
        // Section 7: Real Brides
        has_bride_stories: "Has Bride Stories",
        bride_stories_approach: "Bride Stories Approach",
        // Section 8: Hosting
        hosting_preference: "Hosting Preference",
        // Section 9: Inspiration
        inspiration_urls: "Inspiration URLs",
        non_bridal_inspiration: "Non-Bridal Inspiration",
        social_inspiration: "Social Inspiration",
        social_inspiration_files: "Social Inspiration Files",
        dont_want: "What They Don't Want",
        // Section 10: Anything Else
        anything_else: "Anything Else",
        questions_for_us: "Questions for Us",
      };

      const formLines = Object.entries(formData)
        .filter(([, v]) => v && String(v).trim())
        .map(([key, value]) => {
          const label = fieldLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return `${label}:\n${value}`;
        });

      await resend.emails.send({
        from: "Civic Firm Intake <onboarding@resend.dev>",
        to: "info@civicfirm.com",
        subject: `New Intake: ${businessName || "Unknown"}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #2a3a2a;">
            <div style="background: #f5f0eb; padding: 24px 32px; border-bottom: 2px solid #a8b8a8;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 500;">New Intake Submission</h1>
              <p style="margin: 8px 0 0; color: #6b7b6b; font-size: 14px;">${businessName || "Unknown Business"}</p>
            </div>

            <div style="padding: 24px 32px; background: #fff; border-bottom: 1px solid #e8e0d8;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a8b8a8; margin: 0 0 16px;">Contact</h2>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7b6b; width: 120px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${contactName || "N/A"}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7b6b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${contactEmail}" style="color: #4a5a4a;">${contactEmail || "N/A"}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6b7b6b;">Phone</td><td style="padding: 6px 0;">${contactPhone || "N/A"}</td></tr>
              </table>
            </div>

            <div style="padding: 24px 32px; background: #fff;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a8b8a8; margin: 0 0 16px;">Full Submission</h2>
              ${Object.entries(formData)
                .filter(([, v]) => v && String(v).trim())
                .map(([key, value]) => {
                  const label = fieldLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
                  const strVal = String(value);
                  // Render file lists as bullet points
                  const isFiles = key.endsWith("_files");
                  const display = isFiles
                    ? strVal.split(", ").filter(Boolean).map((f: string) => `• ${f}`).join("<br/>")
                    : strVal.replace(/\n/g, "<br/>");
                  return `
                    <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f0ebe5;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8b8a8; margin-bottom: 6px;">${label}</div>
                      <div style="font-size: 14px; line-height: 1.7; color: #2a3a2a;">${display}</div>
                    </div>`;
                }).join("")}
            </div>

            ${Array.isArray(fileUrls) && fileUrls.length > 0 ? `
            <div style="padding: 24px 32px; background: #fff; border-top: 1px solid #e8e0d8;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a8b8a8; margin: 0 0 16px;">Uploaded Files</h2>
              ${fileUrls.map((f: string) => `<div style="font-size: 14px; margin-bottom: 6px;">📎 ${f}</div>`).join("")}
            </div>` : ""}

            <div style="padding: 16px 32px; background: #f5f0eb; font-size: 12px; color: #a8b8a8;">
              Submission ID: ${id} &bull; Saved to Supabase
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
