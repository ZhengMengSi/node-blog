const http = require('http')

const PORT = 4444
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
