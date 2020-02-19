
const router = require('express').Router()
const axios = require('axios')
const helper = require('./helper')

const scale = 5
var serverPorts = helper.createServerports(scale)
var serverNames = helper.createServernames(scale)
var roundRobin = 0


const redis = require('redis');
const client = redis.createClient({port: 6379, host: '127.0.0.1'});
client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))




router.post('/:key', async(request, response) => {

  var key = request.params.key
  if(request.params.key === '1'){
    await distributeKey('xwbc')
  }else{
    await distributeKey(key)
  }

  
})


const distributeKey = async (key) => {
  for(;;){
    try{
      const rrValue = getRoundRobin()
      console.log(serverPorts[rrValue])
      console.log(key)
      const response = await sendKey(serverPorts[rrValue], '127.0.0.1', key)
      if(response.code === 200){
        console.log('Forwarded request', key, 'to', serverNames[rrValue])
        break
      }
    }catch(exception){
      console.log('Error')
    }
  }
}
 

const sendKey = async (port, names, key) => {
  const response = await axios.post(`http://${names}:${port}/fact/${key}`)
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
 