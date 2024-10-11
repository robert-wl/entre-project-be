import Constants from "../constants";

export const jwtConfig = {
  secret: Constants.Security.JWT_SECRET_KEY,
  signOptions: { expiresIn: `${60 * 60 * 24}s` },
};
