const win = require('winsys')
const fs = require('fs')
const urlencode = require('urlencode')
const utf = require('utf8')
const trim = require('locutus/php/strings/trim')

const xmlparser = require ('./jsparser')


module.exports = (callback) => {
    let infos = {}
    let arr = [];
    let converted_arr = [];
    let converted = {};

    console.log('Récupération des données de la machine ...')
    infos = win()
    arr.push(infos);

    const tags = {
        "Nom%20de%20l'h%EF%BF%BDte" : {
            tag :   "hote",
            title : "Nom de l'hôte"
        },
        "Nom%20du%20syst%EF%BF%BDme%20d'exploitation" : {
            tag :   "os",
            title : "Nom du système d'exploitation"
        },
        "Version%20du%20syst%EF%BF%BDme" : {
            tag :   "version_systeme",
            title : "Version du système"
        },
        "Fabricant%20du%20syst%EF%BF%BDme%20d'exploitation" : {
            tag :   "fabricant_os",
            title : "Fabricant du système d'exploitation"
        },
        "Configuration%20du%20syst%EF%BF%BDme%20d'exploitation" : {
            tag :   "configuration_os",
            title : "Configuration du système d'exploitation"
        },
        "Type%20de%20version%20du%20syst%EF%BF%BDme%20d'exploitation" : {
            tag : "type_os",
            title : "Type de système d'exploitation",
        },
        "Propri%EF%BF%BDtaire%20enregistr%EF%BF%BD" : {
            tag : "proprietaire_enregistre",
            title : "Propriétaire enregistré",
        },
        "Organisation%20enregistr%EF%BF%BDe" : {
            tag : "organisation_enregistree",
            title : "Organisation enregistrée",
        },
        "Identificateur%20de%20produit" : {
            tag : "id_produit",
            title : "Identificateur de produit",
        },
        "Date%20d'installation%20originale" : {
            tag : "date_installation",
            title : "Date d'installation originale",
        },
        "Heure%20de%20d%EF%BF%BDmarrage%20du%20syst%EF%BF%BDme" : {
            tag : "heure_boot",
            title : "Heure de démarrage du système",
        },
        "Fabricant%20du%20syst%EF%BF%BDme" : {
            tag : "fabricant_systeme",
            title : "Fabricant du système",
        },
        "Mod%EF%BF%BDle%20du%20syst%EF%BF%BDme" : {
            tag : "modele_systeme",
            title : "Modèle du système",
        },
        "Type%20du%20syst%EF%BF%BDme" : {
            tag : "sys_type",
            title : "Type du système",
        },
        "Processeur(s)" : {
            tag : "processeurs",
            title : "Processeur(s)",
        },
        "%5B01%5D%EF%BF%BD" : {
            tag : "processeur",
            title : "Processeur",
        },
        "Version%20du%20BIOS" : {
            tag : "version_bios",
            title : "Version du BIOS",
        },
        "R%EF%BF%BDpertoire%20Windows" : {
            tag : "repertoire_windows",
            title : "Répertoire Windows",
        },
        "R%EF%BF%BDpertoire%20syst%EF%BF%BDme" : {
            tag : "repertoire_systeme",
            title : "Répertoire système",
        },
        "P%EF%BF%BDriph%EF%BF%BDrique%20d'amor%EF%BF%BDage" : {
            tag : "peripherique_amorcage",
            title : "Périphérique d'amorçage",
        },
        "Option%20r%EF%BF%BDgionale%20du%20syst%EF%BF%BDme" : {
            tag : "sys_option_regionale",
            title : "Option régionale du système",
        },
        "Param%EF%BF%BDtres%20r%EF%BF%BDgionaux%20d'entr%EF%BF%BDe" : {
            tag : "parametres_regionaux",
            title : "Paramètres régionaux d'entrée",
        },
        "Fuseau%20horaire" : {
            tag : "fuseau_horaire",
            title : "Fuseau horaire",
        },
        "M%EF%BF%BDmoire%20physique%20totale" : {
            tag : "memoire_physique_totale",
            title : "Mémoire physique totale",
        },
        "M%EF%BF%BDmoire%20physique%20disponible" : {
            tag : "memoire_physique_disponible",
            title : "Mémoire physique disponible",
        },
        "M%EF%BF%BDmoire%20virtuelle%EF%BF%BD" : {
            tag : "memoire_virtuelle",
            title : "Mémoire virtuelle?",
        },
        "Emplacements%20des%20fichiers%20d'%EF%BF%BDchange" : {
            tag : "emplacement_fichiers_echange",
            title : "Emplacements des fichiers d'échange",
        },
        "Domaine" : {
            tag : "domaine",
            title : "Domaine",
        },
        "Serveur%20d'ouverture%20de%20session" : {
            tag : "serveur_ouverture_session",
            title : "Serveur d'ouverture de session",
        },
        "Correctif(s)" : {
            tag : "correctifs",
            title : "Correctif(s)",
        },
        "Carte(s)%20r%EF%BF%BDseau" : {
            tag : "cartes_reseaux",
            title : "Carte(s) réseau",
        },
        "Nom%20de%20la%20connexion%EF%BF%BD" : {
            tag : "nom_connexion",
            title : "Nom de la connexion",
        },
        "%EF%BF%BDtat%EF%BF%BD" : {
            tag : "etat",
            title : "état",
        },
        "DHCP%20activ%EF%BF%BD%EF%BF%BD" : {
            tag : "dhcp-active",
            title : "DHCP activé",
        },
        "Serveur%20DHCP%EF%BF%BD" : {
            tag : "serveur-dhcp",
            title : "Serveur DHCP",
        }
    }

    //conversion en  tableau avec des clés crrectes ut8 et sans caractère spéciaux
    let i = 0;
    for (prop in arr[0]) {
        const uprop = urlencode(prop)
        if (uprop) {
            if (typeof tags[uprop] !== 'undefined') {
                converted[tags[uprop]['tag']] =  {
                    title : tags[uprop]['title'],
                    content : arr[0][prop]
                }
            } 
        }
        i++;
    }

    if (i >= Object.keys(arr[0]).length) {
        converted_arr.push(converted)
        if (converted_arr !== []) {
            xmlparser(converted_arr, 'infos', (xml) => {
                if (i >= Object.keys(arr[0]).length) {
                    //convertion terminée on enregistre le fichier
                    fs.writeFile('exports/data.xml', '<?xml version="1.0" encoding="UTF-8"?>\r\n' + xml, 'utf8', (err) => {
                        fs.readFile('exports/programs.xml', function read(err, data) {
                            if (err) {
                                throw err;
                            }
                            fs.appendFile('exports/data.xml', data, 'utf8', (err) => {
                                callback('Fichier data généré');
                            })
                        });
                    })


                    /*   fs.writeFile('../exports/infos.xml', xml, 'utf8', (err) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log('La liste des informations système est générée : ../exports/infos.xml');
                })*/
                }
            })
        }
    }
}

