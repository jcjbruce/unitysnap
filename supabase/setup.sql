-- Supabase SQL Setup for Intake Submissions

-- 1. Create the primary intake submissions table
CREATE TABLE IF NOT EXISTS public.intake_submissions (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    project_slug TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security (RLS) and require service keys / explicit rules if used directly via client
-- Since we are inserting via backend Edge API (where we use the service or anon key), 
-- we can allow anon inserts or just restrict to service roles.
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

-- If inserting via anon key in the API, uncomment the following policy to allow anonymous inserts:
-- CREATE POLICY "Allow anon insert" ON public.intake_submissions FOR INSERT TO anon WITH CHECK (true);

-- 2. Create the backup/fallback intake submissions table
CREATE TABLE IF NOT EXISTS public.intake_submissions_backup (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    project_slug TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    payload JSONB NOT NULL,
    error_log JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.intake_submissions_backup ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow anon insert to backup" ON public.intake_submissions_backup FOR INSERT TO anon WITH CHECK (true);
