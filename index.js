/*
    Si vous voulez tester l'application
    - Il faut installer NodeJS > 4.0
    - Vous placer dans le repertoire de l'application en ligne de commande
    - Installer les dépendances en faisant 'npm install' (npm est installé avec NodeJS)
    - Lancer le programme en tapant npm start

    Vous devriez avoir la liste de vos programmes dans exports/programs.xml
*/
require('events').EventEmitter.prototype._maxListeners = 100
const argv = require('yargs')
.usage('$0 <cmd> [args]')
.option('host', {
    alias: 'h',
    describe: 'Nom d\'hôte du serveur',
    default : '127.0.0.1',
    type : 'string'
})
.option('port', {
    alias: 'p',
    describe: 'Port d\'écoute du serveur',
    default : '8080',
    type : 'num'
})
.option('chemin', {
    alias: 'c',
    describe: 'Chemin vers le fichier du serveur',
    default : '/maia-inventory/server.php',
    type : 'string'
})
.help('help')
.argv

const fs = require('fs')
const crypto = require('crypto-js')
const CronJob = require('cron').CronJob

const programs = require('./modules/programs')
const jsparser = require('./modules/jsparser')
const infos = require('./modules/infos')
const sendToServer = require('./modules/sender')


//programme lancé toutes les minutes 
new CronJob('00 * * * * *', function() {
    console.log('Démarrage de Maia Inventory')

    programs((programs) => {
        jsparser(programs, 'program', (xml) => {
            fs.writeFile('exports/programs.xml', xml, 'utf-8', () => {
                console.log('La liste des programmes est générée : exports/programs.xml');
                infos((message) => {
                    const serveur_config = {
                        hostname    : argv.host,
                        port        : argv.port,
                        path        : argv.chemin,
                        method      : 'POST'
                    }
                    console.log(message)
                    sendToServer(serveur_config, (message) => {
                        console.log('Message : ' + message)
                    });
                })
            })
        }, false);
    })
    
}, null, true, 'Europe/Paris');
console.log('En attente, le scan du système démarrera toutes les minutes')