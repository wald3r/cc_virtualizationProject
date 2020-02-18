const redis = require('redis');
const redisScan = require('node-redis-scan')
const axios = require('axios')
const serverPorts = [3001, 3002, 3003]
const serverNames = ['server1', 'server2', 'server3']

const client = redis.createClient({port: 6379, host: 'redis'});
const scanner = new redisScan(client) 

var roundRobin = 0

client.on('connect', () => console.log('connected'))
client.on('error', (err) => console.log('Something went wrong ' + err))

scanner.eachScan('*', async (matchingKeys) => {

  for(let a = 0; a < matchingKeys.length; a++){
     await client.get(matchingKeys[a], async (err, value) => {
      if (err) throw err
      else {

        console.log('send value:', value)
        const rrValue = getRoundRobin()
        sendNumber(serverPorts[rrValule], serverNames[rrValue], value)
        await sleep(1000)
      }
    })
  }
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

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

const sendNumber = (port, names, number) => {
  axios.post(`http://${names}:${port}/api/fact/${number}`)
}
