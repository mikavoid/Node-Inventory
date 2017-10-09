const regedit = require('regedit');

let rootList = [];
let full = [];

module.exports = (callback) => {
    regedit.list(['HKLM\\SOFTWARE'])
        .on('data', function(entry) {
        rootList = entry.data.keys
    })
        .on('finish', function () {
        let programs = [];
        let i = 0;
        rootList.forEach((element, index) => {
            let childs = [];
            let obj = {id: i, root : element.trim(), childs : ''};
            i++;
            regedit.list(['HKLM\\SOFTWARE\\' + element.trim()])
                .on('data', function(entry) {
                childs = entry.data.keys
            })
                .on('finish', function () {
                obj.childs = childs;
                programs.push(obj);   
                if (typeof rootList[index + 1] === 'undefined') {
                    callback('hello world', programs);
                }
            })
        });

    })
}




