const http = require("http");
const server = http.createServer();

const users = [];
const posts = [];

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "POST") {
    if (url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, { "content-Type": "application/json" });
        response.end(JSON.stringify({ message: "userCreated" }));
      });
    } else if (url === "/users/postup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        posts.push({
          userId: user.id,
          userName: user.name,
          postingId: user.postingId,
          postingTitle: user.postingTitle,
          postingContent: user.postingContent,
        });
        response.end(JSON.stringify({ message: "postCreated" }));
      });
    }
  } else if (method === "GET") {
    if (url === "/users/postlist") {
      response.end(JSON.stringify({ data: posts }));
    }
  }
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});
