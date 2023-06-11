const { io } = require("../index");

const Bands = require("../models/bands");

const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Oasis"));
bands.addBand(new Band("Hozier"));
bands.addBand(new Band("Led Zepellin"));
bands.addBand(new Band("Metallica"));

// Messages
io.on("connection", (client) => {
    client.emit("active-bands", bands.getBands());

    console.log("Client Connected");
    client.on("disconnect", () => {
        console.log("Client dissconnected");
    });

    client.on("mensaje", (payload) => {
        console.log("Message received: ", payload);
        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });

    client.on("emmit-message", (payload) => {
        client.broadcast.emit("message", payload);
    });

    client.on("vote-band", (payload) => {
        bands.voteBand(payload.band_id);
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete_band", (payload) => {
        console.log("Band to delete: " + payload.band_id);
        bands.deleteBand(payload.band_id);
        io.emit("active-bands", bands.getBands());
    });

    client.on("create_band", (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit("active-bands", bands.getBands());
    });
});
