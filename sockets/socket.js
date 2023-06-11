const { io } = require("../index");

// Messages
io.on("connection", (client) => {
    console.log("Client Connected");
    client.on("disconnect", () => {
        console.log("Client dissconnected");
    });

    client.on("mensaje", (payload) => {
        console.log("Message received: ", payload);
        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });
});
