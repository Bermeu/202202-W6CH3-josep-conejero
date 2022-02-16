const configuration = require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const debug = require("debug")("sumasJosep");
const prompt = require("prompt");
const http = require("http");

const server = http.createServer();
const port = process.env.SERVER_PORT;
server.listen(port, () => {
  // se invocará cuando el servidor se haya levantado/iniciado
  debug(chalk.green(`Server is up in http://localhost:${port}`));
});
