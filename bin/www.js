#!/usr/bin/env node

const http = require("http");

const server = http.createServer();

server.listen(5000);

server.on("listening", () => {
    console.log("[SERVER]::LISTEN");
});

server.on("error", ({ message }) => {
    console.log(`[SERVER]::ERROR:${message}`);
});
