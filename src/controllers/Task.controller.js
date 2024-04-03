import { Op } from "sequelize";
import { NotFoundError } from "../helpers/api-errors.js";
import { Task } from "../models/Task.js";

class TaskController {
  async create(req, res) {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  }

  async findAll(req, res) {
    let { limit, title } = req.query;
    const options = { limit };

    if (title) {
      options.where = {
        title: {
          [Op.like]: `%${title}%`,
        },
      };
    }

    const TaskList = await Task.findAll(options);

    if (!TaskList) {
      throw new NotFoundError("Tarefas não encontradas.");
    }

    return res.json(TaskList);
  }

  async findOne(req, res) {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      throw new NotFoundError("Tarefa não encontrada.");
    }
    return res.json(task);
  }

  async updateOne(req, res) {
    const filter = { where: { id: req.params.id } };
    const task = await Task.update(req.body, filter);

    if (task[0] > 0) {
      return res.json({ message: "Tarefa atualizada com sucesso!" });
    }
    throw new NotFoundError("Tarefa não encontrada.");
  }

  async deleteOne(req, res) {
    const filter = { where: { id: req.params.id } };
    const task = await Task.destroy(filter);

    if (task > 0) {
      return res.json({ message: "Tarefa deletada com sucesso!" });
    }
    throw new NotFoundError("Tarefa não encontrada.");
  }
}

export default new TaskController();
