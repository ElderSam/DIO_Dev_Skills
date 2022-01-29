const express = require('express');

const server = express();
server.use(express.json()) // <==== parse request body as JSON

const routes = express.Router()

routes.get('/', (req, res) => res.send('first route!'))

server.use(routes)

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));