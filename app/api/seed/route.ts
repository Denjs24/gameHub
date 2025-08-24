import { sql } from "@/app/lib/db"; // см. lib/db.ts

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255),
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
    INSERT INTO users (name, email, image)
    VALUES ('TestName', 'testEmail', 'testImageURL')
    ON CONFLICT (id) DO NOTHING;
  `;
}

export async function GET() {
    try {
      await sql.begin(() => [
        seedUsers()
      ]);
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
}