-- Rode isto no Supabase: dashboard do projeto > SQL Editor > New query > cola e clica em Run.

-- ============================================================
-- 1. CATÁLOGO DE FILMES (master data — só admin edita, todo mundo lê)
-- ============================================================
create table if not exists movies (
  id text primary key,                    -- slug, ex: 'chinatown-1974'
  ficha integer not null,                 -- número da ficha (1 a 1001)
  title text not null,
  original_title text,
  year integer,
  director text,
  country text,
  genre text,
  decade integer,                         -- 1950, 1960, ...
  synopsis text,
  poster_url text,                        -- preenchido pelo importador de capas (TMDB)
  tmdb_id integer,
  created_at timestamptz default now() not null
);

create index if not exists movies_decade_idx on movies (decade);
create index if not exists movies_ficha_idx on movies (ficha);

alter table movies enable row level security;

create policy "Qualquer um lê o catálogo"
  on movies for select
  using (true);

-- políticas de escrita (insert/update/delete) são criadas mais abaixo,
-- depois da função is_admin_user(), porque dependem dela.

-- ============================================================
-- 2. PROGRESSO DO USUÁRIO (o que cada um assistiu, nota etc.)
-- ============================================================
create table if not exists watched_movies (
  user_id uuid references auth.users(id) on delete cascade not null,
  movie_id text references movies(id) on delete cascade not null,
  watched_at timestamptz default now() not null,
  rating smallint check (rating between 1 and 5),
  primary key (user_id, movie_id)
);

alter table watched_movies enable row level security;

create policy "Usuário vê os próprios registros"
  on watched_movies for select
  using (auth.uid() = user_id);

create policy "Usuário insere os próprios registros"
  on watched_movies for insert
  with check (auth.uid() = user_id);

create policy "Usuário atualiza os próprios registros"
  on watched_movies for update
  using (auth.uid() = user_id);

create policy "Usuário remove os próprios registros"
  on watched_movies for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 3. USUÁRIOS PERMITIDOS / ADMIN
-- ============================================================
create table if not exists allowed_users (
  user_id uuid references auth.users(id) on delete cascade primary key,
  is_admin boolean default false not null,
  created_at timestamptz default now() not null
);

alter table allowed_users enable row level security;

create policy "Usuário vê o próprio registro em allowed_users"
  on allowed_users for select
  using (auth.uid() = user_id);

-- security definer evita a recursão infinita que pegamos no 1001 Discos
-- (uma policy em allowed_users que consulta allowed_users trava o Postgres).
create or replace function is_admin_user()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from allowed_users
    where user_id = auth.uid() and is_admin = true
  );
$$;

-- agora sim as políticas de escrita do catálogo, restritas a admin
create policy "Admin insere filmes"
  on movies for insert
  with check (is_admin_user());

create policy "Admin atualiza filmes"
  on movies for update
  using (is_admin_user());

create policy "Admin remove filmes"
  on movies for delete
  using (is_admin_user());
