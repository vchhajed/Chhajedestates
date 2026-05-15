-- ============================================================
-- CHHAJED ESTATE — Supabase Setup
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Enquiries table (contact form submissions)
create table if not exists enquiries (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  mobile      text not null,
  email       text,
  project_interest text,
  budget      text,
  message     text,
  status      text not null default 'new',   -- new | contacted | converted | closed
  notes       text,
  created_at  timestamptz default now()
);

-- 2. Site config table (editable website content)
create table if not exists site_config (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  value       jsonb not null,
  updated_at  timestamptz default now()
);

-- ── Row-Level Security ──────────────────────────────────────

alter table enquiries  enable row level security;
alter table site_config enable row level security;

-- Enquiries: anyone can INSERT (public form), anyone can SELECT/UPDATE (admin uses anon key)
create policy "public insert enquiries"  on enquiries for insert  with check (true);
create policy "public select enquiries"  on enquiries for select  using (true);
create policy "public update enquiries"  on enquiries for update  using (true);

-- Site config: public can read, anyone can upsert (admin panel)
create policy "public select site_config" on site_config for select using (true);
create policy "public upsert site_config" on site_config for insert with check (true);
create policy "public update site_config" on site_config for update using (true);

-- ── Seed default site_config values ────────────────────────

insert into site_config (key, value) values
  ('settings', '{
    "phone": "+91 9422500152",
    "email": "gautamchhajed5751@gmail.com",
    "whatsapp": "919422500152",
    "address": "Pune, Maharashtra, India",
    "hours_weekday": "Mon – Sat: 9:00 AM – 8:00 PM",
    "hours_weekend": "Sunday: 10:00 AM – 5:00 PM"
  }'::jsonb),
  ('hero', '{
    "badge": "Premium Real Estate Consultancy, Pune",
    "subheading": "Unlock Maximum Value for Your Project with Our Expertise. Exclusive mandates, high-ROI properties, and trusted partnerships across Pune."
  }'::jsonb),
  ('stats', '[
    {"value": "500+", "label": "Happy Families"},
    {"value": "78+",  "label": "Units Sold"},
    {"value": "10+",  "label": "Premium Projects"},
    {"value": "15+",  "label": "Years Experience"}
  ]'::jsonb)
on conflict (key) do nothing;
