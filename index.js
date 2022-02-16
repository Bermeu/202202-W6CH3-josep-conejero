require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const debug = require("debug")("sumasJosep");
const prompt = require("prompt");
const http = require("http");
const url = require("url");

const server = http.createServer();
const port = process.env.SERVER_PORT || 3002;
server.listen(port, () => {
  // se invocará cuando el servidor se haya levantado/iniciado
  debug(chalk.green(`Server is up in http://localhost:${port}`));
});

server.on("request", (request, response) => {
  debug(`Request arrived at ${request.url} with method ${request.method}`);

  const { a, b } = url.parse(request.url, true).query;
  const results = operations(a, b);
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");
  response.write();
  response.end();
});

server.on("error", (error) => {
  debug(chalk.red(`Error on server: ${error.message}`));
});
