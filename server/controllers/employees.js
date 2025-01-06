const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const employee = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!employee) {
      return res.status(400).json({ message: "Сотрудник не найден" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const add = async (req, res) => {
  try {
    const { firstName, lastName, address, age } = req.body;

    if (!firstName || !lastName || !address || !age) {
      return res.status(400).json({ message: "Заполните обязательные поля!" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...req.body,
        userId: req.user.id
      }
    });

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const edit = async (req, res) => {
  try {
    await prisma.employee.update({
      where: {
        id: req.body.id
      },
      data: req.body
    });

    res.status(204).json({ message: "Данные обновлены!" });
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const remove = async (req, res) => {
  try {
    await prisma.employee.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(204).json({ message: "Пользователь удален!" });
  } catch (error) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

module.exports = {
  add, edit, remove, all, employee
};