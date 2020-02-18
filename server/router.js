
const config = require('./config')
const router = require('express').Router()



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

 body = request.params.id
 const result = factorial(body)
 console.log('Factorial value:', result, 'Original value:', body)
	
})



module.exports = router
