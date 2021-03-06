/**
 * Start http server
 */
const http = require('http')
const config = require('./config')
const app = require('./app')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
