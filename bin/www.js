#!/usr/bin/env node

const http = require("http");
const mongoose = require("mongoose");

const { PORT, MONGO_URI } = require("../config/env.keys");

// Importing Express App
const app = require("../server");

// Creating HTTP Server
const server = http.createServer(app);

// Connecting MongoDB ============
mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    },
    error => {
        // if mongoDB is unable to connect
        // throws error => shutdown app
        if (error) {
            throw new Error(`[MongoDB]::ERROR:${error.message}`);
        }

        console.log(`[MongoDB]::LISTEN`);

        // Connecting server selected port ========
        server.listen(PORT);
    }
);

// Function for checking server connection
server.on("listening", () => {
    console.log(`[SERVER]::LISTEN:${PORT}`);
});

// Function for checking connecting or error
server.on("error", ({ message }) => {
    throw new Error(`[SERVER]::ERROR:${message}`);
});

/**
 * For Handling unhandled promise rejection
 *
 * If any rejection occurs in the app,
 * then the server will forcefully shutdown
 * Ex: Like if the app is unable to connect to database
 *     then the app will shutdown.
 */
process.on("unhandledRejection", reason => {
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    throw reason;
});

process.on("uncaughtException", error => {
    // I just received an error that was never handled,
    // time to handle it and then decide whether a restart isneeded
    throw error;
});
