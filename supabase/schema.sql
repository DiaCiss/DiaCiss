-- ═══════════════════════════════════════════════════════════
-- EASILYDESIGN — Schéma complet Supabase
-- À exécuter dans : Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- 1. PROFILES (étend auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'designer', 'admin')),
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger : crée automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id                  TEXT PRIMARY KEY DEFAULT 'ORD-' || upper(substring(gen_random_uuid()::text, 1, 8)),
  design_id           TEXT NOT NULL,
  client_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  designer_id         TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','in_progress','delivered','paid','completed','revision_requested')),
  tier                TEXT NOT NULL CHECK (tier IN ('basic','intermediate','premium')),
  price               INTEGER NOT NULL,
  retouches_used      INTEGER NOT NULL DEFAULT 0,
  max_retouches       INTEGER NOT NULL,
  -- Champs de personnalisation
  custom_text         TEXT,
  phone_number        TEXT,
  event_date          TEXT,
  event_location      TEXT,
  additional_notes    TEXT,
  color_preference    TEXT,
  amount              TEXT,
  social_links        JSONB,
  photo_url           TEXT,
  logo_url            TEXT,
  -- Timestamps
  delivery_deadline   TIMESTAMPTZ,
  paid_at             TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  sender_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_type   TEXT NOT NULL CHECK (sender_type IN ('client','designer','system')),
  content       TEXT NOT NULL,
  attachments   JSONB,
  read          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles : chacun voit son propre profil
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Orders : le client voit ses commandes
CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "orders_update_own" ON public.orders
  FOR UPDATE USING (auth.uid() = client_id);

-- Messages : le client voit les messages de ses commandes
CREATE POLICY "messages_select_own" ON public.messages
  FOR SELECT USING (
    order_id IN (SELECT id FROM public.orders WHERE client_id = auth.uid())
  );
CREATE POLICY "messages_insert_own" ON public.messages
  FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM public.orders WHERE client_id = auth.uid())
    OR sender_type = 'system'
  );
CREATE POLICY "messages_update_own" ON public.messages
  FOR UPDATE USING (
    order_id IN (SELECT id FROM public.orders WHERE client_id = auth.uid())
  );

-- ═══════════════════════════════════════════════════════════
-- REALTIME (pour les messages en temps réel)
-- ═══════════════════════════════════════════════════════════
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- ═══════════════════════════════════════════════════════════
-- STORAGE (buckets pour les uploads)
-- ═══════════════════════════════════════════════════════════
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-files', 'order-files', false)
ON CONFLICT DO NOTHING;

-- Politique : chaque client peut uploader ses propres fichiers
CREATE POLICY "upload_own_files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'order-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "read_own_files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'order-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
