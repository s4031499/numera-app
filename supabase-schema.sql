-- ============================================================
-- NUMERA — Supabase Schema
-- Chạy file này trong Supabase Dashboard > SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────
-- 1. Bảng profiles (thông tin người dùng)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  day         INTEGER CHECK (day BETWEEN 1 AND 31),
  month       INTEGER CHECK (month BETWEEN 1 AND 12),
  year        INTEGER CHECK (year BETWEEN 1900 AND 2100),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────
-- 2. Bảng saved_readings (lá số đã lưu)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_readings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  day          INTEGER NOT NULL CHECK (day BETWEEN 1 AND 31),
  month        INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year         INTEGER NOT NULL CHECK (year BETWEEN 1900 AND 2100),
  relationship TEXT,
  numbers      JSONB,
  saved_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Index để query nhanh theo user_id
CREATE INDEX IF NOT EXISTS saved_readings_user_id_idx
  ON public.saved_readings (user_id, saved_at DESC);

-- ────────────────────────────────────────────────
-- 3. Row Level Security — profiles
-- ────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: chỉ đọc của mình"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles: chỉ chèn của mình"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: chỉ cập nhật của mình"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ────────────────────────────────────────────────
-- 4. Row Level Security — saved_readings
-- ────────────────────────────────────────────────
ALTER TABLE public.saved_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_readings: chỉ đọc của mình"
  ON public.saved_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "saved_readings: chỉ chèn của mình"
  ON public.saved_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_readings: chỉ xóa của mình"
  ON public.saved_readings FOR DELETE
  USING (auth.uid() = user_id);

-- ────────────────────────────────────────────────
-- 5. Trigger: tự tạo profile khi user đăng ký
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
