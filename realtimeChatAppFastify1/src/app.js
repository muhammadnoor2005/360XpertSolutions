const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/user.routes');
const prismaPlugin = require('./plugins/prisma');
const fastifyStatic = require('@fastify/static');
const fastifyFormbody = require('@fastify/formbody');

// helper functions import
const {formatMessage} = require("./services/messages");
const {userJoin,getCurrUser,userLeave,getRoomUsers} = require("./services/users");

const path = require("path");

const socketio = require('socket.io');

fastify.register(prismaPlugin);
fastify.register(userRoutes, { prefix: '/users' });
fastify.register(fastifyFormbody);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    
    const io = socketio(fastify.server, {
      // cors: {
      //   origin: "*", // allow all origins
      //   methods: ["GET", "POST"]
      // }
    });

    // when client connets
    io.on("connection", (socket) => {
      const botName = "Chat Wave";
      const prisma = fastify.prisma;

      socket.on("joinRoom", async ({ username, room }) => {
        // Find or create the room
        let dbRoom = await prisma.room.upsert({
          where: { name: room },
          update: {},
          create: { name: room },
        });

        // Find or create the user
        let dbUser = await prisma.user.upsert({
          where: { username },
          update: {},
          create: { username },
        });

        // Save user join in-memory for socket tracking
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Fetch last 50 messages for the room
        const messages = await prisma.message.findMany({
          where: { roomId: dbRoom.id },
          orderBy: { createdAt: 'asc' },
          include: { user: true },
          take: 50,
        });

        // Send chat history to the user(only mapping specific fields)
        socket.emit("chatHistory", messages.map(m => ({
          username: m.user.username,
          content: m.content,
          createdAt: m.createdAt
          })
        ));

        // welcome current user
        socket.emit("message", formatMessage(botName, "Welcome to Chat Wave"));
        
        // broadcast when user connects
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} joined the chat`));

        // shows all users in a room
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });

      // listen for chatMsg
      socket.on("chatMsg", async (msg) => {
        const user = getCurrUser(socket.id);
        if (!user) return;

        // Save message to DB
        const dbUser = await prisma.user.findUnique({ where: { username: user.username } });
        const dbRoom = await prisma.room.findUnique({ where: { name: user.room } });
        
        if (dbUser && dbRoom) {
          await prisma.message.create({
            data: {
              content: msg,
              userId: dbUser.id,
              roomId: dbRoom.id,
            },
          });
        }
        io.to(user.room).emit("message", formatMessage(user.username, msg));
      });

      // handle disconnection
      socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit("message", formatMessage(botName, `${user.username} left the chat`));

          // WHEN anyone DISCONNECTs then update the users list in the room
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
      });
    });

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();