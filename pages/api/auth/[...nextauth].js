import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Your email', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'text', placeholder: '' },
      },
      async authorize(creds, req) {
        /// logic for authorizing here
        return null;
      },
    }),
  ],
});
