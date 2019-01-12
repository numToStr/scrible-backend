#!/usr/bin/env node

const http = require("http");
const mongoose = require("mongoose");
const app = require("../server");

const { PORT, MONGO_URI } = require("../config/env.keys");

const server = http.createServer(app);

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true },
    error => {
        if (error) {
            throw new Error(`[MongoDB]::ERROR:${error.message}`);
        }

        console.log(`[MongoDB]::LISTEN`);

        server.listen(PORT);
    }
);

server.on("listening", () => {
    console.log(`[SERVER]::LISTEN:${PORT}`);
});

server.on("error", ({ message }) => {
    console.log(`[SERVER]::ERROR:${message}`);
});
