const routes = require('./src/routes')
const { createServer } = require('http')

const server = createServer(routes)
                  .listen(3000, () => console.log('App running at', 3000))

module.exports = server