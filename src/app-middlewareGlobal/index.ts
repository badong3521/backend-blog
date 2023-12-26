import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Application } from "express";
import chat, { ChatModelInterface } from "../app-models/Chat";
import { Server } from "socket.io";

// Middleware
export default function middlewareGlobal(app: Application) {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("combined"));

  // io.on("connection", (socket): any => {
  //   console.log("New client connected");

  //   socket.on("joinRoom", (room: string) => {
  //     socket.join(room);
  //     console.log("Client joined room:", room);
  //   });

  //   socket.on(
  //     "chatMessage",
  //     async (data: { message: string; sender: string; room: string }) => {
  //       console.log("Received chat message:", data);
  //       try {
  //         await chat.create();
  //         console.log("Message saved to database");

  //         io.to(data.room).emit("chatMessage", data);
  //       } catch (error) {
  //         console.error("Error saving message to database:", error);
  //       }
  //     }
  //   );

  //   socket.on("disconnect", () => {
  //     console.log("Client disconnected");
  //   });
  // });

  //SET HEADERS
  app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  const server = require("http").Server(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("totalOrders", 300);
  });
  return server;
}
