INSERT INTO settings (key, value) VALUES
  ('books_per_page', '3'),
  ('books_autoplay_ms', '0')
ON CONFLICT (key) DO NOTHING;
