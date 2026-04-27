import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import pool from "@/libs/db";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        // 1. Cari user di database
        const [users] = await pool.query(
          "SELECT * FROM users WHERE username = ?",
          [username],
        );

        const user = users[0];

        if (!user) return null;

        // 2. Cek apakah password cocok
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return { id: user.id, name: user.name, email: user.username };
        }

        return null;
      },
    }),
  ],
});