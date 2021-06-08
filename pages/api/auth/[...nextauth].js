import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { fireBaseApp } from 'lib/firebase/base';

const firestore = fireBaseApp.firestore();

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      identifier: { label: 'Your email', type: 'text', placeholder: '' },
      password: { label: 'Password', type: 'password', placeholder: '' },
    },
    async authorize(creds, req) {
      /// logic for authorizing here
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
        {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.ok) {
        const { user, jwt } = await res.json();
        user.token = jwt;
        return user;
      } else {
        return null;
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.token;
    }

    return token;
  },
  async signIn(user, account, profile) {
    console.log('sign in...\n', user);
    return 'Hello World!';
  },
  async signOut() {
    console.log('sign out...');
    return 'You have been signed out.';
  },
  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const adapter = FirebaseAdapter(firestore);

const options = {
  providers,
  callbacks,
  adapter,
};

export default (req, res) =>
  NextAuth(req, res, {
    jwt: {
      secret: process.env.APP_SECRET,
    },
    session: {
      jwt: true,
    },
    ...options,
  });
