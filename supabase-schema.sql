-- ============================================================================
--  Schéma Supabase — Import / mise à jour de réseaux & stations IRVE
--  À exécuter UNE FOIS dans : Supabase → SQL Editor → New query → Run.
--
--  PostgreSQL 100 % standard (aucune dépendance propriétaire) : ce schéma est
--  directement migrable vers n'importe quelle autre base PostgreSQL.
--  Côté application, tout l'accès passe par l'objet `DataStore` (dans index.html) :
--  pour changer de base de données, on ne réécrit QUE cet objet.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table des réseaux
-- ----------------------------------------------------------------------------
create table if not exists public.networks (
  id          text primary key,            -- code court, ex: "SDEC", "REVEO"
  name        text not null,
  region      text        default '',
  maint       text        default '',      -- mainteneur
  pdc_target  integer,                      -- objectif nombre de points de charge
  volume      text        default '',       -- libellé volumétrie affiché
  dc_share    numeric,                       -- part de DC (0..1)
  bbox        jsonb,                          -- {lonMin,lonMax,latMin,latMax}
  users       integer     default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- Table des stations (rattachées à un réseau)
-- ----------------------------------------------------------------------------
create table if not exists public.stations (
  id          text primary key,            -- identifiant unique de la station
  net_id      text references public.networks(id) on delete cascade,
  name        text             default '',
  city        text             default '',
  lat         double precision,
  lon         double precision,
  pdc         integer,                      -- nombre de points de charge
  power       numeric,                       -- puissance max en kW
  type        text,                          -- 'AC' | 'DC'
  state       text             default 'ok', -- ok | warn | err | off
  conns       jsonb,                          -- liste de connecteurs, ex: ["T2","CCS"]
  model       text             default '',
  extra       jsonb,                          -- colonnes Excel non mappées (souplesse)
  updated_at  timestamptz      default now()
);

create index if not exists stations_net_id_idx on public.stations (net_id);

-- ----------------------------------------------------------------------------
-- Row Level Security (RLS)
-- ----------------------------------------------------------------------------
alter table public.networks enable row level security;
alter table public.stations enable row level security;

-- Lecture : tout utilisateur connecté peut consulter.
drop policy if exists networks_read on public.networks;
create policy networks_read on public.networks
  for select to authenticated using (true);

drop policy if exists stations_read on public.stations;
create policy stations_read on public.stations
  for select to authenticated using (true);

-- Écriture (insert/update/delete) : RÉSERVÉE aux Propriétaires & Administrateurs.
-- Le verrou est posé directement dans la base via la table public.profiles(id, role) :
-- même un appel direct à l'API (hors application) est refusé pour les autres rôles.
-- Les valeurs de rôle doivent correspondre EXACTEMENT à celles de l'appli :
--   'Propriétaire' et 'Administrateur'.
create or replace function public.can_write_irve() returns boolean
  language sql stable security definer set search_path = public as $$
    select exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('Propriétaire', 'Administrateur')
    );
  $$;

drop policy if exists networks_write on public.networks;
create policy networks_write on public.networks
  for all to authenticated
  using (public.can_write_irve()) with check (public.can_write_irve());

drop policy if exists stations_write on public.stations;
create policy stations_write on public.stations
  for all to authenticated
  using (public.can_write_irve()) with check (public.can_write_irve());

-- Note : si vous renommez/ajoutez un rôle habilité, mettez à jour la liste
-- dans public.can_write_irve() ci-dessus (une seule ligne à changer).
