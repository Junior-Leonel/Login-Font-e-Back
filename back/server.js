const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsMiddleware = cors();
const jsonParser = bodyParser.json();

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
    jsonParser(req, res, () => {
      res.setHeader("Content-Type", "application/json");

      if (req.method === "OPTIONS") {
        res.end();
      } else if (req.url === "/login" && req.method === "POST") {
        // Lógica de tratamento para a rota /login
        console.log("requisição ", req.body);

        // Simulação de lógica de autenticação
        if (req.body.email === "Lucas" && req.body.senha === "123") {
          // Autenticação bem-sucedida
          res.writeHead(200);
          const responseJson = { mensagem: "Autenticação bem-sucedida!" };
          res.end(JSON.stringify(responseJson));
        } else {
          // Autenticação falhou
          res.writeHead(401);
          const responseJson = { mensagem: "Autenticação falhou." };
          res.end(JSON.stringify(responseJson));
        }
      } else {
        res.writeHead(404);
        const responseJson = { mensagem: "Rota não encontrada." };
        res.end(JSON.stringify(responseJson));
      }
    });
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
