-- ─── Maison Pomeranian — Schéma Supabase ─────────────────────────────
-- À exécuter dans le SQL Editor de Supabase.

-- ── Table : dog_profiles ──────────────────────────────────────────────
create table if not exists public.dog_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,                 -- Clerk user id (pas un uuid Supabase auth)
  name text not null,
  birth_date date not null,
  weight integer not null check (weight between 100 and 50000),  -- en grammes
  color text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_dog_profiles_user_id on public.dog_profiles(user_id);

-- ── Table : customer_profiles ────────────────────────────────────────
create table if not exists public.customer_profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null unique,
  email text not null,
  first_name text,
  last_name text,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

-- ── Trigger updated_at ────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_dog_profiles_updated_at on public.dog_profiles;
create trigger trg_dog_profiles_updated_at
  before update on public.dog_profiles
  for each row execute function public.set_updated_at();

-- ── RLS ──────────────────────────────────────────────────────────────
-- Note : comme l'auth est gérée par Clerk (pas par Supabase Auth),
-- on protège l'accès via la service role uniquement côté serveur.
-- Les routes API Next.js valident l'ownership via Clerk auth() puis
-- filtrent par user_id avant chaque query. Activer RLS bloque tout
-- accès direct depuis les clés anon.

alter table public.dog_profiles enable row level security;
alter table public.customer_profiles enable row level security;

-- Aucune policy permissive : seul le service role bypass la RLS.
-- Si vous voulez autoriser des lectures côté client, créez des policies
-- alignées avec un JWT custom Clerk → Supabase.
