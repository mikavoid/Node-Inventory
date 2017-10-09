## NODE INVENTORY
    -   Creates XML files with Windows Host System informations (Brands etc..) and the installed software list
    -   The command line include the informations of the server which will recieve the files
    -   It send the XML files to the server after the system scan
    -   CRON will launch scans automatically


## USAGE
    -   npm install
    -	node  index.js –h [hote] –p [port] –c [server_path]
    -  	(node index.js –h localhost –p 8080 –c /maia-inventory/server.php)


