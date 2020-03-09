const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");

const clubhouse = require("./app/clubhouse")

function run() {
    const app = express();
    app.use(bodyParser());


    // Handler for calls from clubhouse
    const listenUrl = "/" + config.get("server.clubhouse-api-endpoint");
    app.post(listenUrl, function (req, res) {
        var event = req.body;
        console.log(event);
        clubhouse.parseEvent(event);
        res.send(200);
    })
    

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