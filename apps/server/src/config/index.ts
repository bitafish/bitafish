import dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  HOST,
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
  jwt: {
    accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenExpiresIn: parseInt(ACCESS_TOKEN_EXPIRES_IN),
    refreshTokenPrivateKey: REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: REFRESH_TOKEN_PUBLIC_KEY,
    refreshTokenExpiresIn: parseInt(REFRESH_TOKEN_EXPIRES_IN),
  },
};
