const createServerports = (scale) => {

  var list = []
  var startNumber = 3001
  for(let a = 0; a < scale; a++){
    list = list.concat(startNumber)
    startNumber++
  }

  return list
}



module.exports = { createServerports }