import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./database.js";
import "./models/Task.js";
import "./models/User.js";
import taskRoutes from "./routes/Task.routes.js";
import userRoutes from "./routes/user.routes.js";
import { logRoutes } from "./middlewares/log-routes.middleware.js";
import { erroMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();
sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log("Conexão estabelecida com sucesso!.");
    const app = express();

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(logRoutes);
    app.use("/task", taskRoutes);
    app.use("/user", userRoutes);
    app.use(erroMiddleware);

    const port = process.env.PORT;
    return app.listen(port, () =>
      console.log(`Servidor iniciado na porta: http://localhost:${port}`)
    );
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
