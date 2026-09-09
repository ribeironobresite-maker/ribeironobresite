-- Migration 003 — Contato e Google Maps editáveis pelo admin

INSERT INTO settings (key, value) VALUES
  ('contact_city',              'Maricá'),
  ('contact_state',             'RJ'),
  ('contact_address',           'Rua Domício da Gama, 89, loja 3'),
  ('contact_neighborhood',      'Edifício Shopping Maricá · Centro'),
  ('contact_whatsapp_number',   '5521987751070'),
  ('contact_whatsapp_display',  '(21) 98775-1070'),
  ('contact_email',             'cardozoadvogado@hotmail.com'),
  ('contact_maps_enabled',      'false'),
  ('contact_maps_url',          '')
ON CONFLICT (key) DO NOTHING;
