const express = require("express");
const config = require("config");
const webhook = require("webhook-discord");
const bodyParser = require("body-parser");


function run() {
    const app = express();
    app.use(bodyParser());

    // "Hello world" endpoint to test if service can be accessed
    app.get("/", (req, res) => res.send("service online"))

    // Start listening
    const port = config.get("server.port");
    app.listen(port, function () {
        console.log("Clubhouse webhook app listening on port " + port + "!" );
    });
}

module.exports = run;

if (require.main === module) {
    run();
}