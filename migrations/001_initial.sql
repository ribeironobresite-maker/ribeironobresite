-- =====================================================================
-- Migration 001 — Schema inicial (Dr. Antonio C Cardozo)
-- =====================================================================

-- Configurações chave-valor (paleta, hero, bio/foto do advogado)
CREATE TABLE IF NOT EXISTS settings (
  key        VARCHAR(64) PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Livros publicados pelo advogado
CREATE TABLE IF NOT EXISTS books (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  subtitle      VARCHAR(255),
  cover_url     TEXT,
  description   TEXT,
  year          INTEGER,
  publisher     VARCHAR(255),
  buy_link      TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS books_active_order_idx
  ON books (is_active, display_order);

-- Artigos do blog
CREATE TABLE IF NOT EXISTS posts (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  title         VARCHAR(255) NOT NULL,
  excerpt       TEXT NOT NULL,
  category      VARCHAR(128),
  cover_url     TEXT,
  content       TEXT NOT NULL,
  author        VARCHAR(128),
  reading_time  VARCHAR(32),
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS posts_published_idx
  ON posts (is_published, published_at DESC);

-- =====================================================================
-- Seed inicial — placeholders pro Antonio preencher no admin
-- =====================================================================

INSERT INTO settings (key, value) VALUES
  ('palette',             'navy'),
  ('hero_mode',           'logo'),
  ('hero_image_url',      ''),
  ('hero_logo_entrance',  'slide'),
  ('hero_logo_idle',      'none'),
  ('lawyer_photo_url',    ''),
  ('lawyer_bio',          'Inscrito na OAB/RJ desde 2002, com mais de 20 anos de atuação em Direito Cível, do Consumidor e Trabalhista. Pós-graduado em Direito Cível, Processual Civil e Direito do Trabalho. Autor de obras jurídicas. Atendimento técnico e direto com o advogado, com foco em proteger os direitos do cliente em todas as instâncias.'),
  ('lawyer_years',        '20')
ON CONFLICT (key) DO NOTHING;

INSERT INTO books (title, subtitle, year, publisher, buy_link, display_order)
VALUES
  ('Título do Livro 1', 'Subtítulo do livro', 2023, 'Editora', '', 1),
  ('Título do Livro 2', 'Outro subtítulo', 2025, 'Editora', '', 2)
ON CONFLICT DO NOTHING;
