import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prismaClient from "~/app/libs/prismadb";
import { LoginSchema } from "~/app/libs/LoginModel";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismaClient),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const parsed = LoginSchema.safeParse(credentials ?? {});
          if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
          }

          const user = await prismaClient.user.findUnique({
            where: {
              email: parsed.data.email,
            },
          });
          if (!user || !user.hashedPassword) {
            throw new Error("Wrong email or password");
          }

          const match = bcrypt.compareSync(
            parsed.data.password,
            user.hashedPassword
          );
          if (!match) {
            throw new Error("Wrong email or password");
          }

          return user;
        } catch (e) {
          console.log(e);
          throw new Error(
            e instanceof Error ? e.message : "Something went wrong"
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.email) {
        return token;
      }

      const dbUser = await prismaClient.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
