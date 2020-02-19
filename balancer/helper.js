const createServerports = () => {

  var list = []
  var startNumber = 3001
  for(let a = 0; a < scale; a++){
    list.append(startNumber)
    startNumber++
  }

  return list
}

const createServernames = () => {

  var list = []
  var startNumber = 1
  var startName = `project_server_${startNumber}`
  for(let a = 0; a < scale; a++){
    list.append(startName)
    startNumber++
    startName = `project_server_${startNumber}`
  }

  return list
}


module.exports = {createServernames, createServerports}