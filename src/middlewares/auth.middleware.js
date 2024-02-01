import { UnauthorizedError } from "../helpers/api-errors.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_PASS);

  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const { password: _, ...loggedUser } = user.get({ plain: true });
  req.user = loggedUser;
  next();
};
