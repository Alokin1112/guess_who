const app = require("express");
const { emit } = require("process");
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
    socket.role = "";
    socket.pick = "";
    socket.hasPicked = false;
    console.log(`Player called ${socket.nickname} joined the room: ${gameId}`);
    const sockets = await io.in(gameId).fetchSockets();
    const nicks = sockets.map((soc) => soc.nickname);
    io.to(gameId).emit("joinGame", nicks);
  });

  socket.on("startGame", async ({ gameId }) => {
    const sockets = await io.in(gameId).fetchSockets(); //pobranie uzytkownikow w pokoju
    if (sockets.some((ele) => ele.role == "picker")) {
      //przypadek ze gra juz sie zaczeła, wtedy przypisz tylko osobie dołączajęcej range, bez losowania pickera
      socket.role = "guesser";
      socket.emit("startGame", "guesser");
    } else {
      sockets.forEach((el) => (el.role = "guesser"));
      io.to(gameId).emit("startGame", "guesser");
      const pickIndex = Math.floor(Math.random() * sockets.length - 0.001);
      sockets[pickIndex].role = "picker";
      sockets[pickIndex].emit("startGame", "picker");
    }
  });
  socket.on("sendMessage", ({ gameId, message }) => {
    message.sender = socket.nickname;
    socket.to(gameId).emit("sendMessage", message);
  });

  socket.on("sendAnswer", ({ gameId, message }) => {
    socket.to(gameId).emit("sendAnswer", message);
  });

  socket.on("sendPick", async ({ gameId, champ }) => {
    if (socket.role == "picker") {
      socket.pick = champ.name;
    } else if (socket.role == "guesser") {
      const sockets = await io.in(gameId).fetchSockets();
      socket.hasPicked = true;
      const pickedChamp = sockets.find((ele) => ele.role == "picker").pick;
      const result = pickedChamp == champ.name;
      socket.emit("sendPick", result);
      if (result) {
        io.to(gameId).emit("gameEnded", {
          who: socket.nickname,
          what: pickedChamp,
        });
      } else if (
        !sockets.some((ele) => ele.role == "guesser" && !ele.hasPicked)
      ) {
        //jezeli gracz nie zgadl to sprawdzamy czy jest jeszcze osoba ktora mogla zgadnąć
        io.to(gameId).emit("gameEnded", { who: "Noone", what: pickedChamp });
        sockets.forEach((ele) => ele.disconnect());
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
});
