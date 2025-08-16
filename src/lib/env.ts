const isProd = process.env.NODE_ENV === 'production';

export const NEXTAUTH_URL = isProd
  ? 'https://amazon-clone-snowy-five.vercel.app'
  : 'http://localhost:3000';
