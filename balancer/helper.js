const createServerports = (scale) => {

  var list = []
  var startNumber = 3001
  for(let a = 0; a < scale; a++){
    list = list.concat(startNumber)
    startNumber++
  }

  return list
}

const createServernames = (scale) => {

  var list = []
  var startNumber = 1
  var startName = `server_${startNumber}`
  for(let a = 0; a < scale; a++){
    list = list.concat(startName)
    startNumber++
    startName = `server_${startNumber}`
  }

  return list
}


module.exports = {createServernames, createServerports}