const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Заполните обязательные поля!" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if (user && isPasswordCorrect) {
      const { id, name, email } = user;
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ id, name, email, token });
    } else {
      return res.status(400).json({ message: "Неверно введен логин или пароль" });
    }
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Заполните обязательные поля!" });
    }

    const candidate = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (candidate) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    if (user) {
      const { id, name, email } = user;
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ id, name, email, token });
    } else {
      return res.status(400).json({ message: "Не удалось создать пользователя" });
    }
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const current = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

module.exports = {
  login, register, current
};