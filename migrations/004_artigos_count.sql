INSERT INTO settings (key, value) VALUES ('artigos_count', '4') ON CONFLICT (key) DO NOTHING;
