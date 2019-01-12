const express = require("express");
const app = express();

/**
 * Error Handling
 *
 * 1. First block is used to catch error, then
 * 2. Second block is used to handle & send error
 */
app.use((req, res, next) => {
    const error = new Error("URL not found!");
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
    /* eslint-disable-next-line */
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
