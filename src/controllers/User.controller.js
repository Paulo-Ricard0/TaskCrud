import { BadRequestError } from "../helpers/api-errors.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestError("E-mail ja utilizado.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });
    const { password: _, ...user } = newUser.get({ plain: true });
    return res.status(201).json(user);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError("E-mail ou senha inválidos.");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw new BadRequestError("E-mail ou senha inválidos.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
      expiresIn: "40d",
    });

    const { password: _, ...userLogin } = user.get({ plain: true });
    return res.json({ userLogin, token });
  }

  async getProfile(req, res) {
    return res.json(req.user);
  }
}

export default new UserController();
