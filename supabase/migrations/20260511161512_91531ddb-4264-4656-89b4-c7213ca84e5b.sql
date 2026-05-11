
-- Enum for category type
CREATE TYPE public.category_type AS ENUM ('income', 'expense');

-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type public.category_type NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_user ON public.categories(user_id);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can see default categories + their own
CREATE POLICY "View own and default categories"
  ON public.categories FOR SELECT
  TO authenticated
  USING (is_default = true OR user_id = auth.uid());

CREATE POLICY "Insert own categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_default = false);

CREATE POLICY "Update own categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Delete own categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Seed default categories
INSERT INTO public.categories (name, type, is_default) VALUES
  ('Salary', 'income', true),
  ('Freelance', 'income', true),
  ('Investments', 'income', true),
  ('Groceries', 'expense', true),
  ('Rent', 'expense', true),
  ('Utilities', 'expense', true),
  ('Entertainment', 'expense', true),
  ('Transport', 'expense', true),
  ('Food', 'expense', true),
  ('Other', 'expense', true);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  amount NUMERIC(14,2) NOT NULL CHECK (amount >= 0),
  type public.category_type NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transactions_user_date ON public.transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category ON public.transactions(category_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View own transactions"
  ON public.transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Insert own transactions"
  ON public.transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Update own transactions"
  ON public.transactions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Delete own transactions"
  ON public.transactions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
