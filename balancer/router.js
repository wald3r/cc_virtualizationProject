
const router = require('express').Router()
const axios = require('axios')
const helper = require('./helper')

const scale = 5
var serverPorts = helper.createServerports
var serverNames = helper.createServernames

var roundRobin = 0


const redis = require('redis');
const client = redis.createClient({port: 6379, host: 'redis'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))




router.post('/:key', async(request, response) => {

  var key = request.params.key
  console.log(request.params.key)
  if(request.params.key === Number(1)){
    await client.randomkey(async (err, value) => {
      key = value
    })
  }
  console.log(key)
  for(;;){
    const rrValue = getRoundRobin()
    const status = await sendKey(serverPorts[rrValue], serverNames[rrValue], key)
    if(status === 200){
      console.log('Forwarded request', key, 'to', serverNames[rrValue])
      break
    }
  }
})
 

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
 