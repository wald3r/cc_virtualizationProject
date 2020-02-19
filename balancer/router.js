
const router = require('express').Router()
const axios = require('axios')
const helper = require('./helper')

const scale = 5
var serverPorts = helper.createServerports(scale)
var serverNames = helper.createServernames(scale)
var roundRobin = 0


const redis = require('redis');
const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))




router.post('/:key', async(request, response) => {

  var key = request.params.key
  if(request.params.key === '1'){
    await client.randomkey(async (err, value) => {
      await distributeKey(value)
    })
  }else{
    await distributeKey(key)
  }

  
})


const distributeKey = async (key) => {
  for(;;){
    const rrValue = getRoundRobin()
    console.log(serverPorts[rrValue])
    console.log(serverNames[rrValue])
    console.log(key)
    const status = await sendKey(serverPorts[rrValue], serverNames[rrValue], key)
    if(status === 200){
      console.log('Forwarded request', key, 'to', serverNames[rrValue])
      break
    }
    break
  }
}
 

const sendKey = async (port, names, key) => {
  const response = await axios.post(`http://${names}:${port}/fact/${key}`)
  return response.status
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
 