const express = require("express");
const app = express();

const customError = require("./services/validation/custom.error");
const api = require("./app/app");

/**
 * Binding Custom Error to global
 * It will attach $Error constructor class to global
 * $Error class extends the native javascript Error Object
 *
 * @returns {Error}
 */
global.$Error = customError;

// Registering app routes
app.use("/api", api);

/**
 * Error Handling
 *
 * 1. First block is used to catch error, then
 * 2. Second block is used to handle & send error
 */
app.use((req, res, next) => {
    const error = new $Error("URL not found!", 404, "ServerError");
    next(error);
});

app.use((
    {
        message = "Oops! Something went wrong",
        status = 500,
        name = "SeverError"
    },
    req,
    res,
    // eslint-disable-next-line
    next
) => {
    console.log(`
    ${message}
    ${status}
    ${name}
    `);

    return res.status(status).json({
        success: false,
        message,
        name
    });
});

module.exports = app;
