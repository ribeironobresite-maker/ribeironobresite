import { sql } from "./db";

export type PracticeArea = {
  id: number;
  title: string;
  body: string;
  icon: string;
  highlighted: boolean;
  displayOrder: number;
  isActive: boolean;
};

type DbRow = {
  id: number;
  title: string;
  body: string;
  icon: string;
  highlighted: boolean;
  display_order: number;
  is_active: boolean;
};

function toArea(r: DbRow): PracticeArea {
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    icon: r.icon,
    highlighted: r.highlighted,
    displayOrder: r.display_order,
    isActive: r.is_active,
  };
}

export async function getActiveAreas(): Promise<PracticeArea[]> {
  try {
    const rows = (await sql`
      SELECT id, title, body, icon, highlighted, display_order, is_active
      FROM practice_areas
      WHERE is_active = TRUE
      ORDER BY display_order ASC, id ASC
    `) as DbRow[];
    return rows.map(toArea);
  } catch (err) {
    console.error("[practice-areas] erro lendo DB:", err);
    return [];
  }
}

export async function getAllAreas(): Promise<PracticeArea[]> {
  const rows = (await sql`
    SELECT id, title, body, icon, highlighted, display_order, is_active
    FROM practice_areas
    ORDER BY display_order ASC, id ASC
  `) as DbRow[];
  return rows.map(toArea);
}

export async function getAreaById(id: number): Promise<PracticeArea | null> {
  const rows = (await sql`
    SELECT id, title, body, icon, highlighted, display_order, is_active
    FROM practice_areas
    WHERE id = ${id}
    LIMIT 1
  `) as DbRow[];
  if (rows.length === 0) return null;
  return toArea(rows[0]);
}

export type PracticeAreaInput = {
  title: string;
  body: string;
  icon: string;
  highlighted?: boolean;
  displayOrder?: number;
  isActive?: boolean;
};

export async function createArea(input: PracticeAreaInput): Promise<number> {
  const rows = (await sql`
    INSERT INTO practice_areas
      (title, body, icon, highlighted, display_order, is_active)
    VALUES (
      ${input.title},
      ${input.body},
      ${input.icon},
      ${input.highlighted ?? false},
      ${input.displayOrder ?? 999},
      ${input.isActive ?? true}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateArea(
  id: number,
  input: PracticeAreaInput
): Promise<void> {
  await sql`
    UPDATE practice_areas
    SET
      title         = ${input.title},
      body          = ${input.body},
      icon          = ${input.icon},
      highlighted   = ${input.highlighted ?? false},
      display_order = ${input.displayOrder ?? 999},
      is_active     = ${input.isActive ?? true},
      updated_at    = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteArea(id: number): Promise<void> {
  await sql`DELETE FROM practice_areas WHERE id = ${id}`;
}
