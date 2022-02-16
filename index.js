require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const debug = require("debug")("sumasJosep");
const prompt = require("prompt");
const http = require("http");
const url = require("url");
const operaciones = require("./operations");

const server = http.createServer();
const port = process.env.SERVER_PORT || 3002;
server.listen(port, () => {
  // se invocará cuando el servidor se haya levantado/iniciado
  debug(chalk.green(`Server is up in http://localhost:${port}`));
});

server.on("request", (request, response) => {
  debug(`Request arrived at ${request.url} with method ${request.method}`);

  const { num1, num2 } = url.parse(request.url, true).query;
  const resultados = operaciones(num1, num2);
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");
  response.write("<h1>Resultados:</h1>");
  response.write("<h1>Resultados:</h1>");
  response.end();
});

server.on("error", (error) => {
  debug(chalk.red(`Error on server: ${error.message}`));
});
