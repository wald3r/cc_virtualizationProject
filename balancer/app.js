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

  Promise.all(matchingKeys.map(key => client.getAsync(key))).then(values => {
    console.log(values)
  })
  
/*
  for(let a = 0; a < matchingKeys.length; a++){
     await client.get(matchingKeys[a], async (err, value) => {
      if (err) throw err
      else {
        const rrValue = getRoundRobin()
        console.log('send value:', value, 'to', serverNames[rrValue])
        await sendNumber(serverPorts[rrValue], serverNames[rrValue], value)
      }
    })
  }
*/
})


const getRoundRobin = () => {

  if(roundRobin < 3){
    var tmp = roundRobin
    roundRobin = roundRobin + 1
    return tmp
  }else{
    roundRobin = 0
    return 0
  }
}

const sendNumber = async (port, names, number) => {
  await axios.post(`http://${names}:${port}/api/fact/${number}`)
}
