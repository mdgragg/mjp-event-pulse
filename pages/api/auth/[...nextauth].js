import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { fireBaseApp } from 'lib/firebase/base';

const firestore = fireBaseApp.firestore();

export default NextAuth({
  jwt: {
    secret: process.env.APP_SECRET,
  },
  session: {
    jwt: true,
  },
  providers: [
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
          const { user } = await res.json();
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log('sign in...', user);
      return 'Hello World!';
    },
    async signOut() {
      console.log('sign out...');
      return 'You have been signed out.';
    },
    async session(session, user) {
      console.log('session... ', session);
      console.log('user... ', user);
      // session.jwt = user.jwt;
      // session.id = user.id;
      return session;
    },
  },
  adapter: FirebaseAdapter(firestore),
});
