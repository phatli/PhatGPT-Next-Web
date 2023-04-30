import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import { getServerSideConfig } from "@/app/config/server";
import md5 from "spark-md5";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { password, username } = credentials as any;
        const serverConfig = getServerSideConfig();
        const hashedCode = md5.hash(password ?? "").trim();
        if (serverConfig.needCode && serverConfig.codes.has(hashedCode)) {
          return { id: "1", name: username };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return Promise.resolve(token);
    },

    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
