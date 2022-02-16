require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const debug = require("debug")("sumasJosep");
const prompt = require("prompt");
const http = require("http");
const url = require("url");
const operaciones = require("./operaciones");

const server = http.createServer();
const port = process.env.SERVER_PORT || 3002;
server.listen(port, () => {
  // se invocará cuando el servidor se haya levantado/iniciado
  debug(chalk.green(`Servidor en marcha en http://localhost:${port}`));
});

server.on("request", (request, response) => {
  debug(`Request llega a ${request.url} con método ${request.method}`);

  const { num1, num2 } = url.parse(request.url, true).query;
  const resultados = operaciones(num1, num2);

  if (request.url === "/calculator") {
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");
    response.write("<h1>Resultados:</h1>");
    response.write(`<p>Suma: ${resultados.resultadoSuma}</p>`);
    response.write(`<p>Resta: ${resultados.resultadoResta}</p>`);
    response.write(
      `<p>Multiplicaci&oacute;n: ${resultados.resultadoMultiplicacion}</p>`
    );
    response.write(`<p>Divisi&oacute;n: ${resultados.resultadoDivision}</p>`);
  } else {
    response.statusCode = 404;
    response.setHeader("Content-type", "text/html");
    response.write("<h1>Página no encontrada</h1>");
  }
  response.end();
});

server.on("error", (error) => {
  debug(chalk.red(`Error en el servidor: ${error.message}`));
});
