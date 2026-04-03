import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // Add CORS headers for typical API routes
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const { contact, brand, design, technical, content, timeline } = data;
    
    // We construct a summary text for email
    const emailBody = `
      New Intake Form Submission for Becker's Bridal Boutique!

      === BUSINESS & CONTACT ===
      Name: ${contact?.firstName} ${contact?.lastName}
      Email: ${contact?.email}
      Phone: ${contact?.phone}
      Organization: ${contact?.organization}
      Role: ${contact?.role}

      === BRAND & HERITAGE ===
      Background: ${brand?.background}
      Values: ${brand?.values}
      Market Position: ${brand?.marketPosition}
      Audience: ${brand?.audience}

      === DESIGN VISION ===
      Aesthetic: ${design?.aesthetic}
      Competitors: ${design?.competitors}
      Must-Haves: ${design?.mustHaves}
      Don't Wants: ${design?.dontWants}

      === TECHNICAL & BOOKING ===
      Current CMS: ${technical?.currentCms}
      Booking System: ${technical?.bookingSystem}
      Integrations: ${technical?.integrations}
      Accessibility Requirements: ${technical?.accessibility}

      === CONTENT & ASSETS ===
      Brand Guidelines?: ${content?.hasGuidelines ? 'Yes' : 'No'}
      Photography Ready?: ${content?.hasPhotography ? 'Yes' : 'No'}
      Content Migration: ${content?.migrationScope}

      === TIMELINE & BUDGET ===
      Target Launch: ${timeline?.targetLaunch}
      Budget Range: ${timeline?.budgetRange}
      Other Notes: ${timeline?.otherNotes}
    `;

    // 1. Save to Supabase
    if (supabaseUrl && supabaseKey) {
      const { error: dbError } = await supabase
        .from('intake_submissions')
        .insert([{
          project_slug: 'becker-bridal', // identifying tag
          payload: data,
          contact_email: contact?.email || 'anonymous',
          created_at: new Date().toISOString()
        }]);

      if (dbError) {
        console.error('Supabase Primary Insertion Error:', dbError);
        // Fallback to secondary table
        const { error: backupError } = await supabase
          .from('intake_submissions_backup')
          .insert([{
            project_slug: 'becker-bridal',
            payload: data,
            contact_email: contact?.email || 'anonymous',
            created_at: new Date().toISOString(),
            error_log: JSON.stringify(dbError)
          }]);
        
        if (backupError) {
            console.error('Supabase Backup Insertion Error (Critical):', backupError);
            throw new Error('Both primary and backup database insertions failed.');
        }
      }
    } else {
      console.warn('Skipping Supabase insertion due to missing environment variables.');
    }

    // 2. Send via Resend
    if (process.env.RESEND_API_KEY) {
      const { error: emailError } = await resend.emails.send({
        from: 'Civic Firm Intake <info@civicfirm.ca>', 
        to: ['info@civicfirm.ca'],
        replyTo: contact?.email,
        subject: `New Becker's Bridal Proposal Intake - ${contact?.firstName} ${contact?.lastName}`,
        text: emailBody,
      });

      if (emailError) {
        console.error('Resend Error:', emailError);
        // We log email error, but don't strictly fail the submission if DB succeeded
      }
    } else {
      console.warn('Skipping email notification due to missing RESEND_API_KEY environment variable.');
    }

    return res.status(200).json({ success: true, message: 'Intake submitted securely.' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
