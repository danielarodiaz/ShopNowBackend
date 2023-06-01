const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../config/DBconfig");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.conectarDB();

    this.middlewars();

    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }

  middlewars() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online port: ", this.port);
    });
  }
}

module.exports = Server;
