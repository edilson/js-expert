const CarService = require('../service/carService')
const { join } = require('path')

const carsDatabase = join(__dirname, './../../database', 'cars.json')

class CarController {
  constructor() {
    this.carService = new CarService({ cars: carsDatabase });
  }

  async createRent({ customer, carCategory, numberOfDays }) {
    return await this.carService.rent(customer, carCategory, numberOfDays)
  }
}

module.exports = CarController;