const Server = require("./models/Server");
const app = express()

require("dotenv").config();
const server = new Server();
server.listen();
