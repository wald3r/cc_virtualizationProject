
const router = require('express').Router()
const redis = require('redis');


const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))


const getValue = async (key) => {

  await client.get(key, async (err, value) => {
     const fac = factorial(value)
     console.log('Factorial value:', fac, '/ Original key:', key)
  })

}


const factorial = (n) => {
  
  if (n < 0) { throw "Number must be non-negative" }
 
  var result = 1;
  while (n > 1) {
    result *= n
    n--
  }
  return result
}

router.post('/:id', async(request, response) => {
  const key = request.params.id
  await getValue(key)
})



module.exports = router
