const { describe, it } = require('mocha')
const request = require('supertest')

const Car = require('../../src/entities/car')
const Customer = require('../../src/entities/customer')

const app = require('../../server')
const { expect } = require('chai')

const mocks = {
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json'),
  validCarCategory: require('../mocks/valid-carCategory.json')
}

describe('API Suite test', () => {
  describe('/rent', () => {
    it('should create a rent transaction and return HTTP Status 200', async () => {
      const car = {
        ...mocks.validCar
      }

      const carCategory = {
        ...mocks.validCarCategory,
        carIds: [car.id]
      }

      const expectedStructure = {
        result: {
            customer: mocks.validCustomer,
            car,
            amount: 0,
            dueDate: new Date(),
        }
      }

      const response = await request(app)
        .post('/rent')
        .send({ customer: mocks.validCustomer, carCategory, numberOfDays: 10 })
        .expect(200)

      console.log(response.body)


      const getKeys = obj => Object.keys(obj)
      const { result } = response.body

      const expectedCustomer = new Customer(result.customer)
      const expectedCar = new Car(result.car)

      expect(getKeys(response.body)).to.be.deep.equal(getKeys(expectedStructure))
      expect(result.customer).to.be.deep.equal(expectedCustomer)
      expect(result.car).to.be.deep.equal(expectedCar)
      expect(result.amount).not.to.be.empty
      expect(result.dueDate).not.to.be.empty
    })
  })
})