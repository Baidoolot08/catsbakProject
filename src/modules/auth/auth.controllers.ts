import  bcrypt  from 'bcrypt';
import { Request, Response } from "express";
import prisma from "../../config/prisma";
import generateToken from "../../config/token";

const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Имя, email и пароль обязательны",
      });
}
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id.toString(), user.email);

  res.status(201).json({
  success: true,
  token,
  data: {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  },
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при регистрации: ${(error as Error).message}`,
    });
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email и пароль обязательны",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Неверный пароль",
      });
    }

    const token = generateToken(user.id.toString(), user.email);

 res.status(200).json({
  success: true,
  token,
  data: {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  },
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при входе: ${(error as Error).message}`,
    });
  }
};

export default {
  Register,
  Login
};


