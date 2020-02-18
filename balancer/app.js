const redis = require('redis');
const redisScan = require('node-redis-scan')
const axios = require('axios')
const serverPorts = [3001, 3002, 3003]

const client = redis.createClient({port: 6379, host: 'redis'});
const scanner = new redisScan(client) 

var roundRobin = 0

client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))

scanner.eachScan('*', (matchingKeys) => {

  for(let a = 0; a < matchingKeys.length; a++){
     client.get(matchingKeys[a], (err, value) => {
      if (err) throw err
      else {

        console.log('send value:', value)
        sendNumber(serverPorts[getRoundRobin()], value)
      }
    })
  }
})

const getRoundRobin = () => {

  if(roundRobin < serverPorts.length){
    var tmp = roundRobin
    roundRobin ++
    return tmp
  }else{
    roundRobing = 0
    return 0
  }
}

const sendNumber = (port, number) => {
  axios.post(`http://127.0.0.1:${port}/api/fact/${number}`)
}
