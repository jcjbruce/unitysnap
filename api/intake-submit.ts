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
        brand_heritage: "Brand Heritage",
        brand_personality: "Brand Personality",
        brand_story: "Brand Story",
        target_audience: "Target Audience",
        current_challenges: "Current Challenges",
        website_goals: "Website Goals",
        must_have_features: "Must-Have Features",
        color_preferences: "Color Preferences",
        typography_style: "Typography Style",
        visual_inspiration: "Visual Inspiration",
        photo_style: "Photo Style",
        gown_display: "Gown Display Preference",
        collection_categories: "Collection Categories",
        appointment_booking: "Appointment Booking",
        bride_stories_approach: "Bride Stories Approach",
        hosting_preference: "Hosting Preference",
        inspiration_urls: "Inspiration URLs",
        non_bridal_inspiration: "Non-Bridal Inspiration",
        social_inspiration: "Social Inspiration",
        dont_want: "What They Don't Want",
        contact_name: "Contact Name",
        contact_email: "Contact Email",
        target_launch: "Target Launch Date",
        budget_range: "Budget Range",
        additional_notes: "Additional Notes",
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
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #a8b8a8; margin: 0 0 16px;">Form Responses</h2>
              ${Object.entries(formData)
                .filter(([, v]) => v && String(v).trim())
                .map(([key, value]) => {
                  const label = fieldLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
                  return `
                    <div style="margin-bottom: 20px;">
                      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #a8b8a8; margin-bottom: 4px;">${label}</div>
                      <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${value}</div>
                    </div>`;
                }).join("")}
            </div>

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
