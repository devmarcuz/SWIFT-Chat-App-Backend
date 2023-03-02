const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/messageRoute");
const { Server } = require("socket.io");
const { createServer } = require("http");
const connectDB = require("./db/connectDB");
require("dotenv").config({});

connectDB();
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", userRoutes);
app.use("/api/auth/message", messageRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
const Message = require("./model/Message");
const User = require("./model/User");

io.on("connection", (socket) => {
  socket.on("recieve-user", (id) => {
    onlineUsers.set(id, socket.id);
  });

  socket.on("send-msg", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    let time;

    if (sendUserSocket) {
      // Message.find(
      //   {
      //     users: { $all: [data.from, data.to] },
      //   },
      //   (err, all) => {
      //     time = all[all.length - 1];

      //     socket.to(sendUserSocket).emit("recieve-msg", {
      //       message: data.message,
      //       time: time.createdAt,
      //     });

      //     if (err) return err;
      //   }
      // );

      try {
        const all = await Message.find({
          users: { $all: [data.from, data.to] },
        });

        time = await all[all.length - 1];

        socket.to(sendUserSocket).emit("recieve-msg", {
          message: data.message,
          time: time.createdAt,
        });
      } catch (err) {
        return err;
      }
    }
  });

  socket.on("join-chat", async (id) => {
    try {
      const user = await User.findById(id.userId);
      user.online = true;
      user.save();

      socket.broadcast.emit("user-online", { online: true });
    } catch (err) {
      return err;
    }
  });

  socket.on("leave-chat", async (id) => {
    try {
      const user = await User.findById(id);
      user.online = false;
      user.save();

      onlineUsers.delete(id);

      socket.broadcast.emit("user-left", { offline: true });
    } catch (err) {
      return err;
    }
  });
});

httpServer.listen(process.env.PORT, () =>
  console.log(`Server Started on Port ${process.env.PORT}`)
);
