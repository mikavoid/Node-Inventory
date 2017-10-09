const system = require('./system')

// Un callback pour system qui est en charge de récupérer la liste des programmes
module.exports = (callback) => {
    system((res, programs) => {
        callback(programs)
    })
}
