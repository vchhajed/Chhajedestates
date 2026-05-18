-- ============================================================
-- Outbound Leads table
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

create table if not exists outbound_leads (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  mobile           text not null,
  email            text,
  city             text,
  locality         text,
  requirement      text,
  bhk_config       text,
  budget           text,
  project_interest text,
  source           text,
  source_url       text,
  profession       text,
  notes            text,
  status           text not null default 'new',
  priority         text not null default 'medium',
  contacted_at     timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

alter table outbound_leads enable row level security;

create policy "public select outbound_leads" on outbound_leads for select using (true);
create policy "public insert outbound_leads" on outbound_leads for insert with check (true);
create policy "public update outbound_leads" on outbound_leads for update using (true);
