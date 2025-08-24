import { sql } from "@/app/lib/db";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const favorites = await sql`
    SELECT game_id
    FROM favorites_games
    WHERE user_id = ${session.user.id}
  `;
  
  return new Response(JSON.stringify(favorites.map(f => f.game_id)), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { gameId }: { gameId: number } = await request.json();

  await sql`
    INSERT INTO favorites_games (user_id, game_id)
    VALUES (${session.user.id}, ${gameId})
    ON CONFLICT (user_id, game_id) DO NOTHING
  `;

  return new Response("Added", { status: 200 });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { gameId }: { gameId: number } = await request.json();

  await sql`
    DELETE FROM favorites_games
    WHERE user_id = ${session.user.id} AND game_id = ${gameId}
  `;

  return new Response("Deleted", { status: 200 });
}
