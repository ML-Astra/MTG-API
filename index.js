const express = require('express');
const server = express();
const logger = require('logger').createLogger('system.log');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const ini = require('ini');
const { OPEN_READONLY } = require('sqlite3');
const ejs = require('ejs');
const jp = require('jsonpath');
const path = require('path');
// Open INI file
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

logger.info('Server Starting.');

if(config.debug == true){
    logger.setLevel('debug');
    console.warn('In debug mode!!!');
    logger.debug('Debug Mode Enabled')
    sqlite3.verbose();
    logger.debug('SQLite3 Verbose mode enabled.')
};

// Open SQLite DB

logger.debug('Opening Database R--');
const db = new sqlite3.Database('./AllPrintings.sqlite');

/*
const db = sqlite.open({
    filename: "./AllPrintings.sqlite",
    mode: OPEN_READONLY,
    driver: sqlite3.Database
}); */

server.set('view engine','ejs');
server.use(express.static(path.join(__dirname,"public")));

// Get Card by name
server.get('/card-by-name::cardName', (req,res)=>{
    var card = db.get(`SELECT name,uuid, flavorText, Text, manaCost FROM cards WHERE name='${req.params.cardName}';`,(err,row)=>{
        if(err){
            return err;
        }
        console.log(req.params.cardName);
        console.log(row);
        var cardName = jp.query(row,'$.name').toString();
        var cardText = jp.query(row, '$.text').toString();
        var manaCost = jp.query(row, '$.manaCost').toString();

        
        res.render('pages/card-by-name.ejs',{
            cardName:cardName,
            cardText:cardText,
            manaCost:manaCost
        });
    });
});


server.listen(config.port, ()=>{
    logger.info(`Listening on port: ${config.port}`)
})

