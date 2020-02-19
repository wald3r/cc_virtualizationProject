
const router = require('express').Router()
const axios = require('axios')
const helper = require('./helper')

const scale = 5
var serverPorts = helper.createServerports(scale)
var roundRobin = 0



router.get('/', async(request, response) => {

    const answer = await getValue()
    response.status(200).send(answer.data)
})


const getValue = async () => {

  for(;;){
    try{
      const rrValue = getRoundRobin()
      console.log(`Redirecting message to ${serverPorts[rrValue]}`)
      const response = await sendMessage(serverPorts[rrValue], '127.0.0.1')
      if(response.data !== undefined){
        return response
      }
    }catch(exception){
      console.log(`Server not reachable. Try next server.`)
    }
  }
}

 

const sendMessage = async (port, names) => {
  const response = await axios.get(`http://${names}:${port}/fact/`)
  return response
}


const getRoundRobin = () => {

  if(roundRobin < scale){
    var tmp = roundRobin
    roundRobin = roundRobin + 1
    return tmp
  }else{
    roundRobin = 1
    return 0
  }
}
 
 module.exports = router
 