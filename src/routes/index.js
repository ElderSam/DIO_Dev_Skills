const express = require("express");

const userRoutes = require('./labs');

const routes = express.Router();

routes.get("/", (req, res) => {
	res.send("✔️ Server running!");
});

routes.use(userRoutes)

module.exports = routes;