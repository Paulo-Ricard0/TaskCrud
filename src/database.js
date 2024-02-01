import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/task-database.sqlite",
  logging: false,
});
