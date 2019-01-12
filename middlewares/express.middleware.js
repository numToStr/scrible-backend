const helmet = require("helmet");

// Express configuration middlwares ============
const expressMiddlewares = (app, express) => {
    // For securing headers
    app.use(
        helmet({
            // For faking our Tech Stack to show as PHP
            hidePoweredBy: { setTo: "PHP 7.2" }
        })
    );

    // For logging requests [Development]
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line
        const logger = require("morgan");
        app.use(logger("dev"));
    }

    // For accepting json data
    app.use(
        express.json({
            limit: "50KB"
        })
    );
    // For accepting url encoded data
    app.use(
        express.urlencoded({
            limit: "50KB",
            extended: false
        })
    );
};

module.exports = expressMiddlewares;
