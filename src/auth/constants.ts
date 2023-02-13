export const jwtConstants = {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN_SECONDS,
};
