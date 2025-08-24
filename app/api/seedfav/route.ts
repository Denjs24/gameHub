import { sql } from "@/app/lib/db";

async function seedFav() {
  await sql`
    CREATE TABLE IF NOT EXISTS favorites_games (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      game_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, game_id)
    );
  `;
}

export async function GET() {
  try {
    await seedFav(); // просто вызываем функцию

    return new Response(JSON.stringify({ message: "Database seeded successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
