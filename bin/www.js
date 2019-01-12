#!/usr/bin/env node

const http = require("http");

const { PORT } = require("../config/env.keys");

const server = http.createServer();

server.listen(PORT);

server.on("listening", () => {
    console.log(`[SERVER]::LISTEN:${PORT}`);
});

server.on("error", ({ message }) => {
    console.log(`[SERVER]::ERROR:${message}`);
});
