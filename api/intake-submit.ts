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
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[intake-submit] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const submission = {
    business_name: businessName ?? null,
    contact_name: contactName ?? null,
    contact_email: contactEmail ?? null,
    contact_phone: contactPhone ?? null,
    form_data: formData,
    file_urls: Array.isArray(fileUrls) ? fileUrls.join(",") : null,
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
      .insert(submission)
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
      await resend.emails.send({
        from: "Becker's Bridal Intake <onboarding@resend.dev>",
        to: "info@civicfirm.ca",
        subject: `New Intake Submission: ${businessName || "Unknown"}`,
        text: [
          `Business: ${businessName || "N/A"}`,
          `Contact: ${contactName || "N/A"}`,
          `Email: ${contactEmail || "N/A"}`,
          `Phone: ${contactPhone || "N/A"}`,
          `Submission ID: ${id}`,
          "",
          "View full details in Supabase.",
        ].join("\n"),
      });
    }
  } catch (e) {
    console.warn("[intake-submit] Failed to send email:", e);
  }

  return res.status(200).json({ success: true, id });
}
