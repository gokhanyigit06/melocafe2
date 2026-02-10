import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function getUser(username: string) {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    console.log("Authorize called with:", credentials);
                    const parsedCredentials = z
                        .object({ username: z.string().min(1), password: z.string().min(1) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { username, password } = parsedCredentials.data;
                        console.log("Searching for user:", username);
                        const user = await getUser(username);
                        console.log("User found:", user ? "Yes" : "No");

                        if (!user) return null;

                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        console.log("Password match:", passwordsMatch);

                        if (passwordsMatch) {
                            console.log("Login successful!");
                            return {
                                id: user.id.toString(),
                                name: user.name,
                                email: user.username, // NextAuth expects email, we'll give it username
                            };
                        }
                    }

                    console.log("Invalid credentials or parsing failed:", parsedCredentials.error?.format());
                    return null;
                } catch (error) {
                    console.error("CRITICAL ERROR IN AUTHORIZE:", error);
                    return null;
                }
            },
        }),
    ],
});
