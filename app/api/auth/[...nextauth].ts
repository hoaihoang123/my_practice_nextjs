import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { LoginResponse } from "@/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // app/api/auth/[...nextauth].ts
      async authorize(credentials) {
        try {
          console.log("🔑 NextAuth authorize called with:", credentials?.email);

          // Real API call only
          const res = await fetch("https://server.aptech.io/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mozilla/5.0 (NextAuth)",
            },
            body: JSON.stringify({
              username: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log("📡 API Response status:", res.status);
          console.log(
            "📡 API Response headers:",
            Object.fromEntries(res.headers.entries())
          );

          if (!res.ok) {
            const errorText = await res.text();
            console.log("❌ API Error:", errorText);
            return null;
          }

          const user = await res.json();
          console.log(
            "✅ API Success - Full Response:",
            JSON.stringify(user, null, 2)
          );

          // Check actual API response structure: loggedInUser + access_token
          if (user && user.loggedInUser && user.access_token) {
            console.log("🎯 Valid user structure detected");

            // Return the exact structure from API
            const validatedUser = {
              loggedInUser: {
                id: user.loggedInUser.id,
                email: user.loggedInUser.email,
              },
              access_token: user.access_token,
            };

            console.log(
              "🔄 Validated user:",
              JSON.stringify(validatedUser, null, 2)
            );
            return validatedUser;
          }

          console.log(
            "❌ Invalid user structure - missing access_token or loggedInUser"
          );
          console.log(
            "❌ Expected: {loggedInUser: {...}, access_token: '...'}"
          );
          console.log("❌ Received:", Object.keys(user || {}));
          return null;
        } catch (error) {
          console.error("💥 NextAuth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Lưu thông tin từ API response vào token
        const userData = user as LoginResponse;
        token.id = userData.loggedInUser.id;
        token.email = userData.loggedInUser.email;
        token.accessToken = userData.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Gán thông tin từ token vào session
      if (session.user) {
        session.access_token = token.accessToken as string;
        session.user.id = token.id as number;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
