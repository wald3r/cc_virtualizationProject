
const router = require('express').Router()
const axios = require('axios')
const serverPorts = [3001, 3002, 3003]
const serverNames = ['server1', 'server2', 'server3']

var roundRobin = 0

router.post('/:id', async(request, response) => {

  const key = request.params.id
  const rrValue = getRoundRobin()
  await sendNumber(serverPorts[rrValue], serverNames[rrValue], key)
  console.log('Received request:', key)
   
})
 

const sendValue = async (port, names, key) => {
  await axios.post(`http://${names}:${port}/fact/${key}`)
}


const getRoundRobin = () => {

  if(roundRobin < 3){
    var tmp = roundRobin
    roundRobin = roundRobin + 1
    return tmp
  }else{
    roundRobin = 1
    return 0
  }
}
 
 module.exports = router
 