require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const sequelize = require("./db");
// const router = require("./src/routes");
const configureWebSocket = require("./src/socket");
const Users = require("./src/models/Users");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use("/api", router);


app.use((req, res, next) => {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

configureWebSocket(server);

const start = async () => {
  try {
    await sequelize.authenticate();
    try {
      await sequelize.sync({ force: true }); // force: true удалит существующие таблицы
      console.log('Таблицы успешно созданы.');

    } catch (error) {
      console.error('Ошибка при создании таблиц:', error);
    }

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
