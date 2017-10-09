const js2xmlparser = require("js2xmlparser");

module.exports = (data , name, callback, surround) => {

    let xml = '';
    let i = 0;
    data.forEach((element, index, array) => {
        xml += '\r\n' + js2xmlparser(name, element, {
            declaration : {
                include : false
            }
        })
        i++;
        if (i === array.length) {
            if (!surround){
                callback(xml)
            } else {
                callback('<?xml version="1.0" encoding="UTF-8"?>\r\n<system>'  + xml + '</system>')
            }
        }
    });

}