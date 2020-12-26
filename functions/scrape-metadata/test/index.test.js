const chai = require('chai');
const expect = chai.expect;

const scraper = require('../index')

describe('/ scraper / 1 /', function () {
  let successInput
  let successResponse
  before(function () {
    successInput = require('./data/succesInput.json')
    successResponse = require('./data/successResponse.json')
    errorInput = require('./data/errorInput.json')
  })

  //Test Case 1: Success Check. 
  it('1.1 / should scrape web-page information', async function () {
    let response = await scraper.handler(successInput, context)
    actualOutput = JSON.parse(response.body)
    expect(actualOutput).to.deep.equal(successResponse);
  })

  //Test Case 2: Faliure Check. 
  it('1.2 / should return error message', async function () {
    let response = await scraper.handler(errorInput, context)
    actualOutput = JSON.parse(response.body)
    expect(actualOutput).to.deep.equal('INTERNAL SERVER ERROR');
  })

})