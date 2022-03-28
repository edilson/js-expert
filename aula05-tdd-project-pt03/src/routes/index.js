const { once } = require('events')

const CarController = require('../controllers/carController')

const carController = new CarController()

const routes = {
  "rent:post": async (request, response) => {
    const item = await once(request, 'data')

    const body = JSON.parse(item)

    const createTransaction = await carController.createRent({ 
      customer: body.customer, 
      carCategory: body.carCategory, 
      numberOfDays: body.numberOfDays 
    })

    return response.end(JSON.stringify(createTransaction))
  },
  default: async (_, response) => {
    response.writeHead(404)
    return response.end()
  }
}

function handleError(error, response) {
  response.writeHead(500)
  return response.end()
}

const handler = function (request, response) {
  const { method, url } = request
  let [_, route] = url.split('/')
  route = `${route}:${method}`

  const routeKey = route.toLowerCase()

  const routeChosen = routes[routeKey] || routes.default

  return routeChosen(request, response).catch((error) => handleError(error, response))
}

module.exports = handler