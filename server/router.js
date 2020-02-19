
const router = require('express').Router()
const redis = require('redis');


const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))


const getValue = async (key) => {

  await client.get(key, async (err, value) => {
     return factorial(value)
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
 console.log('test')
 const key = request.params.id
 const result = await getValue(key)
 console.log('Factorial value:', result, '/ Original key:', key)
 response.status(200)
	
})



module.exports = router
