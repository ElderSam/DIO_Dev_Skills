const express = require('express');
const routes = require('./routes');

const server = express();
server.use(express.json()) // <==== parse request body as JSON

server.use(routes)

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));