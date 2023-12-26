"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
// Middleware
function middlewareGlobal(app) {
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("combined"));
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
    const io = new socket_io_1.Server(server, {
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
exports.default = middlewareGlobal;
