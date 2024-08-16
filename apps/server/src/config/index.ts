import dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  HOST,
  DATABASE_URL,
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

export default {
  port: PORT,
  host: HOST,
  db_url: DATABASE_URL,
  jwt: {
    accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenExpiresIn: parseInt(ACCESS_TOKEN_EXPIRES_IN),
    refreshTokenPrivateKey: REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: REFRESH_TOKEN_PUBLIC_KEY,
    refreshTokenExpiresIn: parseInt(REFRESH_TOKEN_EXPIRES_IN),
  },
};
