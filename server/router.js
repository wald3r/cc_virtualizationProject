
const router = require('express').Router()
const redis = require('redis');


const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))


const factorial = (n) => {
  
  if (n < 0) { throw "Number must be non-negative" }
 
  var result = 1;
  while (n > 1) {
    result *= n
    n--
  }
  return result
}

router.get('/', async(request, response) => {
 
  client.randomkey((err, key) => {
    client.get(key, (err, value) => {
      const fac = factorial(value)
      return response.status(200).send(`The factorial of ${value} is ${fac}`)
    })
  })

})



module.exports = router
