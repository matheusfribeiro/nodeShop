const http = require('http');
const port = 3000

const routes = require('./routes')

const server = http.createServer(routes);

server.listen(port, () => console.log(`Server is listening on port ${port}`));
