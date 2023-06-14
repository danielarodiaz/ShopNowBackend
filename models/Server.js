const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../config/DBconfig");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.userPath = "/api/users";
    this.categoryPath = "/api/category"
    
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

  routes() {
    this.app.use(this.authPath, require("../routes/authRouter"));
    this.app.use(this.userPath, require("../routes/userRouter"));
    this.aoo.use(this.categoryPath, require("../routes/categoryRouter"))
    this.aoo.use(this.productPath, require("../routes/productRouter"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online port: ", this.port);
    });
  }
}

module.exports = Server;
