const http = require("http");
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];
const posts = [
  {
    userID: 1,
    userName: "Rebekah Johnson",
    postingId: 2,
    postingTitle: "두 번째 게시글",
    postingContent: "두 번째 게시글 내용",
  },
  {
    userID: 1,
    userName: "Rebekah Johnson",
    postingId: 1,
    postingTitle: "간단한 HTTP API 개발 시작!",
    postingContent:
      "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
  },
  {
    userID: 2,
    userName: "Fabian Predovic",
    postingId: 2,
    postingTitle: "HTTP의 특성",
    postingContent: "Request/Response와 Stateless!!",
  },
  {
    userID: 3,
    userName: "new user 1",
    postingId: 3,
    postingImageUrl: "내용 1",
    postingContent: "sampleContent3",
  },
  {
    userID: 4,
    userName: "new user 2",
    postingId: 4,
    postingImageUrl: "내용 2",
    postingContent: "sampleContent4",
  },
];

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
          userID: user.id,
          userName: user.name,
          postingId: user.postingId,
          postingTitle: user.postingTitle,
          postingImageUrl: user.postingImageUrl,
          postingContent: user.postingContent,
        });
        response.end(JSON.stringify({ posts }));
      });
    }
  } else if (method === "GET") {
    if (url === "/users/postlist") {
      response.end(JSON.stringify({ data: posts }));
    }
  }
  //http://IP:8000/users/postup/1/1
  else if (method === "PATCH") {
    if (url.startsWith("/users/postlist")) {
      //userId 를 불러옴
      const userId = parseInt(url.split("/")[3]);
      // postingId 를 불러옴
      const postingId = parseInt(url.split("/")[4]);
      //위에 userId 와 posts 객체 안에 있는 user.id 가 같은 것을 찾는 것

      const result = posts.findIndex(
        (user) => user.userID === userId && user.postingId === postingId
      );

      console.log(result);
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        posts[result] = {
          userID: user.id,
          userName: user.name,
          postingId: user.postingId,
          postingTitle: user.postingTitle,
          postingImageUrl: user.postingImageUrl,
          postingContent: user.postingContent,
        };
        response.end(JSON.stringify({ posts }));
      });
    }
  }
  //user 에서 찾은 객체들 중에 posting id가 같은지 확인하는 것
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});
