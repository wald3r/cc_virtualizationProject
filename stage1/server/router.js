
const router = require('express').Router()
const redis = require('redis');

/**
 * Connect to redis
 */
const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))

/**
 * Calculate the factorial value of the given parameter
 * @param {*} n 
 */
const factorial = (n) => {
  
  if (n < 0) { throw "Number must be non-negative" }
 
  var result = 1;
  while (n > 1) {
    result *= n
    n--
  }
  return result
}

/**
 * Http get method to pull a random value from redis and calculate the factorial value of it
 */
router.get('/', async(request, response) => {
 
  client.randomkey((err, key) => {
    client.get(key, (err, value) => {
      const fac = factorial(value)
      console.log(`The factorial of ${value} is ${fac}`)
      return response.status(200).send(`The factorial of ${value} is ${fac}`)
    })
  })

})



module.exports = router
