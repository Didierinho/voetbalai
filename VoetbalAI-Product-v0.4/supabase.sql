
create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  intro text not null default '',
  body text not null default '',
  analysis text not null default '',
  facts jsonb not null default '[]'::jsonb,
  category text not null default 'Nieuws',
  club text not null default '',
  source_1 text not null default '',
  source_2 text not null default '',
  reliability_status text not null default '',
  reliability_score text not null default '',
  publication_status text not null default 'draft'
    check (publication_status in ('draft','published')),
  image_key text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists articles_publication_status_idx
  on public.articles(publication_status, published_at desc);

alter table public.articles enable row level security;

-- Geen publieke insert/update policy.
-- De app gebruikt server-side de service role key voor redactie-acties.
