/**
 * Router class
 */
const router = require('express').Router()
const axios = require('axios')
const helper = require('./helper')

const scale = 5
var serverPorts = helper.createServerports(scale)
var roundRobin = 0


/**
 * Waits for incoming http get requests
 */
router.get('/', async(request, response) => {

    const answer = await getValue()
    response.status(200).send(answer.data)
})

/**
 * Picks a http server to get factorial value
 */
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

 
/**
 * Sends a message to a http server
 * @param {*} port 
 * @param {*} names 
 */
const sendMessage = async (port, names) => {
  const response = await axios.get(`http://${names}:${port}/fact/`)
  return response
}

/**
 * Computate which http server shall receive the next message
 */
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
 