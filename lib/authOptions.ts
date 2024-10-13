import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "./db";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // 1 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 1, // 1 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (existingUser) {
          return true;
        }
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const dbUser = await prismaClient.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      if (!dbUser) {
        return session;
      }
      return {
        ...session,
        user: {
          id: dbUser.id,
        },
      };
    },
  },
} satisfies NextAuthOptions;
