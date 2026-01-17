-- ======================================
-- ENUM dla statusu pary
-- ======================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pair_status') THEN
    CREATE TYPE pair_status AS ENUM ('OWNER_ONLY', 'PAIRED');
  END IF;
END $$;

-- ======================================
-- Tabela movies
-- ======================================
CREATE TABLE IF NOT EXISTS public.movies (
  omdb_id text PRIMARY KEY,
  title text NOT NULL,
  year text,
  poster text,
  imdb_rating text,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ======================================
-- Tabela profiles
-- powiązana z Supabase auth.users
-- ======================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  username text,
  auth_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  avatar_seed text,
  personal_code text,
  CONSTRAINT profiles_username_length CHECK (char_length(username) >= 2 AND char_length(username) <= 25)
);

-- ======================================
-- Tabela pairs
-- ======================================
CREATE TABLE IF NOT EXISTS public.pairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  owner_profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  partner_profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  partner_display_name text,
  partner_avatar_seed text,
  status pair_status NOT NULL DEFAULT 'OWNER_ONLY',
  CHECK (
    (status = 'OWNER_ONLY' AND partner_profile_id IS NULL)
    OR (status = 'PAIRED' AND partner_profile_id IS NOT NULL)
  )
);

-- Migracja kolumn dla istniejących tabel (jeśli używają starych nazw)
DO $$
BEGIN
  -- Zmień nazwy kolumn jeśli istnieją stare nazwy
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pairs' AND column_name = 'first_profile_id') THEN
    ALTER TABLE public.pairs RENAME COLUMN first_profile_id TO owner_profile_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pairs' AND column_name = 'second_profile_id') THEN
    ALTER TABLE public.pairs RENAME COLUMN second_profile_id TO partner_profile_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pairs' AND column_name = 'second_display_name') THEN
    ALTER TABLE public.pairs RENAME COLUMN second_display_name TO partner_display_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pairs' AND column_name = 'second_avatar_seed') THEN
    ALTER TABLE public.pairs RENAME COLUMN second_avatar_seed TO partner_avatar_seed;
  END IF;
END $$;

-- Dodaj kolumny jeśli nie istnieją (dla nowych tabel)
ALTER TABLE public.pairs
ADD COLUMN IF NOT EXISTS partner_avatar_seed text;

-- Zaktualizuj FK constraints dla istniejących tabel (dodaj ON DELETE CASCADE)
-- Usuń wszystkie stare FK constraints i dodaj na nowo z ON DELETE CASCADE
DO $$
DECLARE
  r RECORD;
BEGIN
  -- Usuń wszystkie FK constraints z pairs do profiles (niezależnie od nazwy)
  FOR r IN 
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.pairs'::regclass
      AND confrelid = 'public.profiles'::regclass
      AND contype = 'f'
  LOOP
    EXECUTE format('ALTER TABLE public.pairs DROP CONSTRAINT %I', r.conname);
  END LOOP;
END $$;

-- Dodaj FK constraints z ON DELETE CASCADE (jeśli nie istnieją)
DO $$
BEGIN
  -- Sprawdź czy constraint dla owner_profile_id już istnieje
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.pairs'::regclass
      AND conname = 'pairs_owner_profile_id_fkey'
  ) THEN
    ALTER TABLE public.pairs
    ADD CONSTRAINT pairs_owner_profile_id_fkey 
    FOREIGN KEY (owner_profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Sprawdź czy constraint dla partner_profile_id już istnieje
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.pairs'::regclass
      AND conname = 'pairs_partner_profile_id_fkey'
  ) THEN
    ALTER TABLE public.pairs
    ADD CONSTRAINT pairs_partner_profile_id_fkey 
    FOREIGN KEY (partner_profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- ======================================
-- Tabela reviews
-- ======================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating1 numeric(3,1) NOT NULL,
  rating2 numeric(3,1) NOT NULL,
  comment1 text,
  comment2 text,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_profile_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  pair_id uuid NOT NULL REFERENCES public.pairs(id) ON DELETE CASCADE,
  movie_id text NOT NULL REFERENCES public.movies(omdb_id) ON DELETE CASCADE,
  CHECK (rating1 >= 1 AND rating1 <= 10),
  CHECK (rating2 >= 1 AND rating2 <= 10)
);

-- Zaktualizuj FK constraints dla reviews (dodaj ON DELETE CASCADE/SET NULL)
-- Usuń wszystkie stare FK constraints i dodaj na nowo
DO $$
DECLARE
  r RECORD;
BEGIN
  -- Usuń wszystkie FK constraints z reviews do profiles
  FOR r IN 
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND confrelid = 'public.profiles'::regclass
      AND contype = 'f'
  LOOP
    EXECUTE format('ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS %I', r.conname);
  END LOOP;
  
  -- Usuń wszystkie FK constraints z reviews do pairs
  FOR r IN 
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND confrelid = 'public.pairs'::regclass
      AND contype = 'f'
  LOOP
    EXECUTE format('ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS %I', r.conname);
  END LOOP;
  
  -- Usuń wszystkie FK constraints z reviews do movies
  FOR r IN 
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND confrelid = 'public.movies'::regclass
      AND contype = 'f'
  LOOP
    EXECUTE format('ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS %I', r.conname);
  END LOOP;
END $$;

-- Dodaj FK constraints z odpowiednimi ON DELETE (jeśli nie istnieją)
DO $$
BEGIN
  -- Sprawdź czy constraint dla updated_by_profile_id już istnieje
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND conname = 'reviews_updated_by_profile_id_fkey'
  ) THEN
    ALTER TABLE public.reviews
    ADD CONSTRAINT reviews_updated_by_profile_id_fkey 
    FOREIGN KEY (updated_by_profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL;
  END IF;

  -- Sprawdź czy constraint dla pair_id już istnieje
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND conname = 'reviews_pair_id_fkey'
  ) THEN
    ALTER TABLE public.reviews
    ADD CONSTRAINT reviews_pair_id_fkey 
    FOREIGN KEY (pair_id) REFERENCES public.pairs(id) ON DELETE CASCADE;
  END IF;

  -- Sprawdź czy constraint dla movie_id już istnieje
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.reviews'::regclass
      AND conname = 'reviews_movie_id_fkey'
  ) THEN
    ALTER TABLE public.reviews
    ADD CONSTRAINT reviews_movie_id_fkey 
    FOREIGN KEY (movie_id) REFERENCES public.movies(omdb_id) ON DELETE CASCADE;
  END IF;
END $$;

-- ======================================
-- Indeksy
-- ======================================
-- Profiles
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_personal_code
ON public.profiles(personal_code)
WHERE personal_code IS NOT NULL;

-- Pairs
CREATE INDEX IF NOT EXISTS idx_pairs_owner_profile
ON public.pairs(owner_profile_id);

CREATE INDEX IF NOT EXISTS idx_pairs_partner_profile
ON public.pairs(partner_profile_id);

-- Złożony indeks dla RLS (pomaga w EXISTS queries)
CREATE INDEX IF NOT EXISTS idx_pairs_profiles_composite
ON public.pairs(owner_profile_id, partner_profile_id);

-- Indeks dla profiles.auth_id (używany w RLS)
CREATE INDEX IF NOT EXISTS idx_profiles_auth_id
ON public.profiles(auth_id);

-- Indeks dla reviews.pair_id (używany w RLS)
CREATE INDEX IF NOT EXISTS idx_reviews_pair_id
ON public.reviews(pair_id);

-- ======================================
-- Funkcje
-- ======================================

-- Funkcja pomocnicza do sprawdzania czy profile są w parze (dla RLS policy)
-- Używa SECURITY DEFINER żeby uniknąć rekurencji w RLS
CREATE OR REPLACE FUNCTION public.is_profile_in_pair_with_me(p_profile_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.pairs pa
    JOIN public.profiles my_p ON my_p.auth_id = auth.uid()
    WHERE (pa.owner_profile_id = p_profile_id AND pa.partner_profile_id = my_p.id)
       OR (pa.partner_profile_id = p_profile_id AND pa.owner_profile_id = my_p.id)
  );
$$;

-- Funkcja do generowania 8-znakowego kodu alfanumerycznego
CREATE OR REPLACE FUNCTION public.generate_personal_code()
RETURNS text AS $$
DECLARE
  chars text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; -- bez 0, O, I, 1 (żeby uniknąć pomyłek)
  new_code text;
  i integer;
BEGIN
  new_code := '';
  FOR i IN 1..8 LOOP
    new_code := new_code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Funkcja do regeneracji kodu
CREATE OR REPLACE FUNCTION public.regenerate_personal_code(p_auth_id uuid)
RETURNS text AS $$
DECLARE
  new_code text;
  max_attempts integer := 10;
  attempts integer := 0;
BEGIN
  LOOP
    new_code := public.generate_personal_code();
    BEGIN
      UPDATE public.profiles
      SET personal_code = new_code
      WHERE auth_id = p_auth_id;
      EXIT; -- Sukces
    EXCEPTION
      WHEN unique_violation THEN
        attempts := attempts + 1;
        IF attempts >= max_attempts THEN
          RAISE EXCEPTION 'Failed to generate unique personal code after % attempts', max_attempts;
        END IF;
    END;
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Funkcja do łączenia par przez kod (z walidacją)
DROP FUNCTION IF EXISTS public.join_pair_by_code(text, uuid);

CREATE OR REPLACE FUNCTION public.join_pair_by_code(
  p_partner_code text,
  p_my_profile_id uuid
)
RETURNS TABLE (
  id uuid,
  created_at timestamptz,
  owner_profile_id uuid,
  partner_profile_id uuid,
  partner_display_name text,
  status pair_status
) AS $$
DECLARE
  v_owner_id uuid;
  v_my_existing_pair_id uuid;
  v_owner_existing_pair_id uuid;
  v_partner_username text;
  v_partner_avatar_seed text;
BEGIN
  -- 1. Znajdź profil właściciela kodu po kodzie
  SELECT profiles.id INTO v_owner_id
  FROM public.profiles
  WHERE profiles.personal_code = p_partner_code
  LIMIT 1;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Kod nie istnieje lub jest nieprawidłowy' USING ERRCODE = 'P0001';
  END IF;

  -- 2. Sprawdź czy nie próbujesz połączyć się sam ze sobą
  IF v_owner_id = p_my_profile_id THEN
    RAISE EXCEPTION 'Nie możesz połączyć się sam ze sobą' USING ERRCODE = 'P0002';
  END IF;

  -- 3. Sprawdź czy właściciel kodu już ma parę (z FOR UPDATE żeby uniknąć race conditions)
  SELECT pairs.id INTO v_owner_existing_pair_id
  FROM public.pairs
  WHERE pairs.owner_profile_id = v_owner_id
     OR pairs.partner_profile_id = v_owner_id
  FOR UPDATE
  LIMIT 1;

  IF v_owner_existing_pair_id IS NOT NULL THEN
    RAISE EXCEPTION 'Ten użytkownik już ma parę' USING ERRCODE = 'P0003';
  END IF;

  -- 4. Sprawdź czy Ty masz już parę
  SELECT pairs.id INTO v_my_existing_pair_id
  FROM public.pairs
  WHERE pairs.owner_profile_id = p_my_profile_id
     OR pairs.partner_profile_id = p_my_profile_id
  FOR UPDATE
  LIMIT 1;

  IF v_my_existing_pair_id IS NOT NULL THEN
    RAISE EXCEPTION 'Masz już parę' USING ERRCODE = 'P0004';
  END IF;

  -- 5. Pobierz dane partnera (może być NULL jeśli nie ma jeszcze ustawionych)
  SELECT profiles.username, profiles.avatar_seed INTO v_partner_username, v_partner_avatar_seed
  FROM public.profiles
  WHERE profiles.id = p_my_profile_id;

  -- 6. Utwórz parę (status PAIRED - automatyczne połączenie)
  -- owner_profile_id = osoba której kod wpisano
  -- partner_profile_id = osoba która wpisała kod
  -- Wypełniamy partner_display_name i partner_avatar_seed dla denormalizacji
  RETURN QUERY
  INSERT INTO public.pairs (
    owner_profile_id,
    partner_profile_id,
    status,
    partner_display_name,
    partner_avatar_seed
  )
  VALUES (
    v_owner_id,
    p_my_profile_id,
    'PAIRED',
    v_partner_username,
    v_partner_avatar_seed
  )
  RETURNING
    public.pairs.id,
    public.pairs.created_at,
    public.pairs.owner_profile_id,
    public.pairs.partner_profile_id,
    public.pairs.partner_display_name,
    public.pairs.status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Funkcja do pobierania pary użytkownika z danymi (z JOINami)
-- Przyjmuje tylko myProfileId - backend sam znajdzie parę (jeden user = jedna para)
DROP FUNCTION IF EXISTS public.get_my_pair_with_profiles(uuid);
DROP FUNCTION IF EXISTS public.get_pair_with_profiles(uuid, uuid);

CREATE OR REPLACE FUNCTION public.get_my_pair()
RETURNS TABLE (
  id uuid,
  created_at timestamptz,
  owner_profile_id uuid,
  partner_profile_id uuid,
  status pair_status,
  my_username text,
  my_avatar_seed text,
  partner_username text,
  partner_avatar_seed text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  v_me_id uuid;
BEGIN
  -- Pobieramy ID profilu na podstawie zalogowanego usera
  SELECT p_prof.id INTO v_me_id 
  FROM public.profiles p_prof 
  WHERE p_prof.auth_id = auth.uid();

  -- Jeśli użytkownik nie ma profilu, zwróć błąd
  IF v_me_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found for user' USING ERRCODE = 'P0006';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.created_at,
    p.owner_profile_id,
    p.partner_profile_id,
    p.status,
    me.username AS my_username,
    me.avatar_seed AS my_avatar_seed,
    -- COALESCE: jeśli partner ma konto -> partner.username, jeśli nie -> p.partner_display_name
    COALESCE(partner.username, p.partner_display_name) AS partner_username,
    -- COALESCE: jeśli partner ma konto -> partner.avatar_seed, jeśli nie -> p.partner_avatar_seed
    COALESCE(partner.avatar_seed, p.partner_avatar_seed) AS partner_avatar_seed
  FROM public.pairs p
  JOIN public.profiles me ON me.id = v_me_id
  LEFT JOIN public.profiles partner ON partner.id = CASE 
    WHEN p.owner_profile_id = v_me_id THEN p.partner_profile_id 
    ELSE p.owner_profile_id 
  END
  WHERE p.owner_profile_id = v_me_id OR p.partner_profile_id = v_me_id
  LIMIT 1;
END;
$$;

-- Funkcja do wymuszania jednej pary na profil
CREATE OR REPLACE FUNCTION public.enforce_single_pair_per_profile()
RETURNS trigger AS $$
BEGIN
  -- Sprawdzaj tylko przy INSERT lub gdy zmieniają się profile IDs
  IF TG_OP = 'INSERT' OR
     (TG_OP = 'UPDATE' AND (
       NEW.owner_profile_id IS DISTINCT FROM OLD.owner_profile_id OR
       NEW.partner_profile_id IS DISTINCT FROM OLD.partner_profile_id
     ))
  THEN
    -- sprawdź owner_profile_id
    IF NEW.owner_profile_id IS NOT NULL THEN
      IF EXISTS (
        SELECT 1
        FROM public.pairs p
        WHERE p.id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
          AND (p.owner_profile_id = NEW.owner_profile_id
               OR p.partner_profile_id = NEW.owner_profile_id)
      ) THEN
        RAISE EXCEPTION 'Profile % already belongs to another pair', NEW.owner_profile_id;
      END IF;
    END IF;

    -- sprawdź partner_profile_id
    IF NEW.partner_profile_id IS NOT NULL THEN
      IF EXISTS (
        SELECT 1
        FROM public.pairs p
        WHERE p.id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
          AND (p.owner_profile_id = NEW.partner_profile_id
               OR p.partner_profile_id = NEW.partner_profile_id)
      ) THEN
        RAISE EXCEPTION 'Profile % already belongs to another pair', NEW.partner_profile_id;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ======================================
-- Triggery
-- ======================================

-- Trigger do tworzenia profilu przy rejestracji
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_code text;
  max_attempts integer := 10;
  attempts integer := 0;
BEGIN
  LOOP
    new_code := public.generate_personal_code();
    BEGIN
      INSERT INTO public.profiles (auth_id, email, personal_code)
      VALUES (NEW.id, NEW.email, new_code);
      EXIT; -- Sukces, wyjdź z pętli
    EXCEPTION
      WHEN unique_violation THEN
        attempts := attempts + 1;
        IF attempts >= max_attempts THEN
          RAISE EXCEPTION 'Failed to generate unique personal code after % attempts', max_attempts;
        END IF;
        -- Spróbuj ponownie z nowym kodem
    END;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger do wymuszania jednej pary na profil
DROP TRIGGER IF EXISTS trg_enforce_single_pair_per_profile ON public.pairs;

CREATE TRIGGER trg_enforce_single_pair_per_profile
BEFORE INSERT OR UPDATE ON public.pairs
FOR EACH ROW
EXECUTE FUNCTION public.enforce_single_pair_per_profile();

-- Trigger do automatycznego updated_at w reviews
CREATE OR REPLACE FUNCTION public.update_reviews_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_reviews_updated_at ON public.reviews;

CREATE TRIGGER trg_update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_reviews_updated_at();

-- ======================================
-- Uzupełnij personal_code dla istniejących profili
-- ======================================
UPDATE public.profiles
SET personal_code = public.generate_personal_code()
WHERE personal_code IS NULL;

-- ======================================
-- RLS (Row Level Security) - PROFILES
-- ======================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_pair_partners" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own_and_partners" ON public.profiles;

-- Policy pozwalająca na SELECT własnego profilu i profili partnerów w parze
-- Używamy funkcji pomocniczej z SECURITY DEFINER żeby uniknąć rekurencji
CREATE POLICY "profiles_select_own_and_partners"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  -- Własny profil
  auth.uid() = auth_id
  OR
  -- Profil partnera w parze (używamy funkcji pomocniczej żeby uniknąć rekurencji)
  public.is_profile_in_pair_with_me(profiles.id)
);

CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- ======================================
-- RLS - PAIRS
-- ======================================
ALTER TABLE public.pairs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pairs_select_own" ON public.pairs;
DROP POLICY IF EXISTS "pairs_insert_as_owner" ON public.pairs;
DROP POLICY IF EXISTS "pairs_update_own" ON public.pairs;
DROP POLICY IF EXISTS "pairs_delete_own" ON public.pairs;

CREATE POLICY "pairs_select_own"
ON public.pairs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles pr
    WHERE pr.auth_id = auth.uid()
      AND pr.id IN (public.pairs.owner_profile_id, public.pairs.partner_profile_id)
  )
);

CREATE POLICY "pairs_insert_as_owner"
ON public.pairs
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles pr
    WHERE pr.auth_id = auth.uid()
      AND pr.id = public.pairs.owner_profile_id
  )
);

CREATE POLICY "pairs_update_own"
ON public.pairs
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles pr
    WHERE pr.auth_id = auth.uid()
      AND pr.id IN (public.pairs.owner_profile_id, public.pairs.partner_profile_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles pr
    WHERE pr.auth_id = auth.uid()
      AND pr.id IN (public.pairs.owner_profile_id, public.pairs.partner_profile_id)
  )
);

CREATE POLICY "pairs_delete_own"
ON public.pairs
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles pr
    WHERE pr.auth_id = auth.uid()
      AND pr.id IN (public.pairs.owner_profile_id, public.pairs.partner_profile_id)
  )
);

-- ======================================
-- RLS - REVIEWS
-- ======================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reviews_select_own_pairs" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_own_pairs" ON public.reviews;
DROP POLICY IF EXISTS "reviews_update_own_pairs" ON public.reviews;
DROP POLICY IF EXISTS "reviews_delete_own_pairs" ON public.reviews;

CREATE POLICY "reviews_select_own_pairs"
ON public.reviews
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.pairs p
    JOIN public.profiles pr
      ON pr.id IN (p.owner_profile_id, p.partner_profile_id)
     AND pr.auth_id = auth.uid()
    WHERE p.id = public.reviews.pair_id
  )
);

CREATE POLICY "reviews_insert_own_pairs"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.pairs p
    JOIN public.profiles pr
      ON pr.id IN (p.owner_profile_id, p.partner_profile_id)
     AND pr.auth_id = auth.uid()
    WHERE p.id = public.reviews.pair_id
  )
);

CREATE POLICY "reviews_update_own_pairs"
ON public.reviews
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.pairs p
    JOIN public.profiles pr
      ON pr.id IN (p.owner_profile_id, p.partner_profile_id)
     AND pr.auth_id = auth.uid()
    WHERE p.id = public.reviews.pair_id
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.pairs p
    JOIN public.profiles pr
      ON pr.id IN (p.owner_profile_id, p.partner_profile_id)
     AND pr.auth_id = auth.uid()
    WHERE p.id = public.reviews.pair_id
  )
);

CREATE POLICY "reviews_delete_own_pairs"
ON public.reviews
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.pairs p
    JOIN public.profiles pr
      ON pr.id IN (p.owner_profile_id, p.partner_profile_id)
     AND pr.auth_id = auth.uid()
    WHERE p.id = public.reviews.pair_id
  )
);

-- ======================================
-- RLS - MOVIES
-- ======================================
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "movies_select_all" ON public.movies;

CREATE POLICY "movies_select_all"
ON public.movies
FOR SELECT
TO authenticated
USING (true);

-- ======================================
-- GRANTy - uprawnienia dla ról
-- ======================================
GRANT SELECT, UPDATE
ON public.profiles
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.pairs
TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.reviews
TO authenticated;

-- Movies - publiczne dane, dostęp dla wszystkich
GRANT SELECT
ON public.movies
TO authenticated, anon;

-- ======================================
-- GRANTy dla funkcji
-- ======================================
GRANT EXECUTE ON FUNCTION public.is_profile_in_pair_with_me(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_personal_code() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.regenerate_personal_code(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_pair_by_code(text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_pair() TO authenticated;

-- ======================================
-- REVOKE dla anon (dane prywatne)
-- ======================================
REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.pairs FROM anon;
REVOKE SELECT ON public.reviews FROM anon;

-- Movies - zostaw SELECT dla anon (publiczne dane o filmach)
-- Jeśli nie potrzebujesz publicznego API, odkomentuj poniższą linię:
-- REVOKE SELECT ON public.movies FROM anon;