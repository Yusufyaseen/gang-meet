import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  console.log("a user connected");
  socket.on("disconnect", () => {
    socket.broadcast.emit("calended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", {
      signal: data.signal,
      theOtherName: data.theOtherName,
    });
  });

  socket.on("leaveCall", ({ to }) => {
    io.to(to).emit("cancelRef");
  });
});

server.listen(port, () => {
  console.log("Allah the Merciful");
});
