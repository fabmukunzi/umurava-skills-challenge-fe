/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_URL } from '@/lib/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  profile_url?: string;
  names?: string;
}

let userData = {};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        if (!credentials) throw new Error('Missing credentials');

        const res = await fetch(`${BASE_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(
          data.data.token
        );
        return {
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken?.names,
          role: decodedToken.role,
          profileUrl: decodedToken.profile_url,
          token: data.data.token,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account && account.provider == 'google') {
        token.user = userData;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      session.token = token.user.token;
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      if (account?.provider === 'google') {
        const data = {
          names: profile?.name,
          email: profile?.email,
          profile_url: (profile as { picture?: string })?.picture,
        };

        const res = await fetch(`${BASE_API_URL}/auth/social-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const resData = await res.json();
          const user: DecodedToken = jwtDecode<DecodedToken>(
            resData.data.token
          );

          userData = {
            id: user.id,
            name: user?.names,
            email: user?.email,
            profileUrl: user?.profile_url,
            token: resData.data.token,
          };

          return true;
        }
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
