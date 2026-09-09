-- Migration: tabela practice_areas
-- Contexto: cria CRUD de áreas de atuação editáveis pelo admin.
-- Antes era hardcoded em components/Areas.tsx; agora vem do DB com seed
-- contendo as 3 áreas originais do Dr. Antonio.

CREATE TABLE IF NOT EXISTS practice_areas (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(128) NOT NULL,
  body          TEXT NOT NULL,
  icon          VARCHAR(64) NOT NULL DEFAULT 'document',
  highlighted   BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS practice_areas_active_order_idx
  ON practice_areas (is_active, display_order);

-- Seed com as 3 áreas que estavam hardcoded em components/Areas.tsx
INSERT INTO practice_areas (title, body, icon, highlighted, display_order, is_active)
VALUES
  (
    'Direito Cível',
    'Indenizações por danos morais e materiais, contratos, locação, cobranças, responsabilidade civil e ações em geral. Atuação técnica e personalizada caso a caso.',
    'balance', FALSE, 1, TRUE
  ),
  (
    'Direito do Consumidor',
    'Cobranças abusivas, negativações indevidas, falhas em produtos e serviços, cláusulas abusivas em contratos, planos de saúde, bancos, telefonia e e-commerce. Defesa do consumidor em ações individuais.',
    'shield', FALSE, 2, TRUE
  ),
  (
    'Direito Trabalhista',
    'Rescisões, verbas indenizatórias, horas extras, assédio moral, equiparação salarial, doenças ocupacionais e ações de reconhecimento de vínculo. Defendo trabalhadores e atendo empregadores em consultoria.',
    'briefcase', FALSE, 3, TRUE
  )
ON CONFLICT DO NOTHING;
