import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export const config = {
  api: { bodyParser: { sizeLimit: "20mb" } },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { fileName, fileType, fileData } = req.body;

    if (!fileName || !fileType || !fileData) {
      return res.status(400).json({ error: "fileName, fileType, and fileData are required" });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileData, "base64");

    // Create unique path
    const id = nanoid(10);
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `intake/${id}-${safeName}`;

    const { error } = await supabase.storage
      .from("intake-uploads")
      .upload(path, buffer, {
        contentType: fileType,
        upsert: false,
      });

    if (error) {
      console.error("[intake-upload] Upload failed:", error.message);
      return res.status(500).json({ error: "Upload failed" });
    }

    const { data: urlData } = supabase.storage
      .from("intake-uploads")
      .getPublicUrl(path);

    return res.status(200).json({
      url: urlData.publicUrl,
      name: fileName,
    });
  } catch (e) {
    console.error("[intake-upload] Error:", e);
    return res.status(500).json({ error: "Upload failed" });
  }
}
