const express = require("express");
const app = express();
const routeHandler = require("./routes");

app.get("/", (req, res) => {
    res.status(200).json({ message: "API running" });
});

app.use("/api/v1", routeHandler);

module.exports = app;