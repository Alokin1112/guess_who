const app = require("express");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: true,
  origins: ["*"],
});

io.on("connection", (socket) => {
  console.log("User connected"); /*
  socket.emit("message", "Hello");
  
  socket.on("startGame", ({ gameId }) => {
    createGame().then((words) => {
      io.to(gameId).emit("startGame", words);
      console.log(`Started Game at ${gameId}`);
    });
  });

  */
  socket.on("disconnect", () => {
    console.log("User Left----");
  });

  socket.on("joinGame", async ({ gameId, nickname }) => {
    socket.join(gameId);
    socket.nickname = nickname;
    console.log(`Player called ${socket.nickname} joined the room: ${gameId}`);
    const sockets = await io.in(gameId).fetchSockets();
    const nicks = sockets.map((soc) => soc.nickname);
    socket
      .to(gameId)
      .emit("joinGame", `Player called ${socket.nickname} joined the game!`);
    io.to(gameId).emit("joinGame", nicks);
  });

  socket.on("startGame", async ({ gameId }) => {
    const sockets = await io.in(gameId).fetchSockets(); //pobranie uzytkownikow w pokoju
    io.to(gameId).emit("startGame", "guesser");
    const pickIndex = Math.floor(Math.random() * (sockets.length - 1));
    sockets[pickIndex].emit("startGame", "picker");
  });
  socket.on("sendMessage", ({ gameId, message }) => {
    message.sender = socket.nickname;
    socket.to(gameId).emit("sendMessage", message);
  });

  socket.on("sendAnswer", ({ gameId, message }) => {
    socket.to(gameId).emit("sendAnswer", message);
  });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
});
