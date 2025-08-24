export const runtime = "nodejs";

import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { sql } from "./app/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      favorites?: string[];
    } & DefaultSession["user"];
  }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({user}){
            if (!user.email || !user.name) return false;

            // проверяем, есть ли такой юзер
            const existing = await sql`
                SELECT * FROM users WHERE email = ${user.email}
            `;

            if (existing.length === 0) {
                // если нет — добавляем
                await sql`
                  INSERT INTO users (name, email, image)
                  VALUES (${user.name}, ${user.email}, ${user.image || ''})
                `;
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
              const [dbUser] = await sql`SELECT * FROM users WHERE email = ${user.email || ''}`;
              if (dbUser) {
                token.id = dbUser.id;
              }

              // Получаем массив избранных игр сразу при логине
              const favorites = await sql`
                SELECT game_id FROM favorites_games WHERE user_id = ${dbUser.id}
              `;
              token.favorites = favorites.map(f => f.game_id);
            }

            return token;
          },
        
          // Переносим id из токена в session
        async session({ session, token }) {
            if (token.id && typeof token.id === 'string') {
              session.user.id = token.id;
              session.user.favorites = Array.isArray(token.favorites) ? token.favorites : [];
            }
            return session;
        }
    }
})