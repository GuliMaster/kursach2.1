/**
 * @fileOverview
 * "Server"||| Description: Handler of get requests.
 * */
const fs = require('fs');
const express = require('express');
const bin2hex = require('locutus/php/strings/bin2hex');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
/**
 * @param req - received request.
 * @param res - response for sending.
 */
/**
 * @swagger
 *
 * tags:
 * -    name: users
 *      description: users are in role of clients or admins
 *
 * /:
 *   get:
 *     tags:
 *     - users
 *     summary: Processing data depending on the request
 *     description: Sending, creating, deleting, updating, dropping data.
 *     consumes:
 *          -    application/json
 *     produces:
 *          -    application/json
 *     parameters:
 *          -   in: query
 *              name: actionType
 *              description: defines type of working with data
 *              required: true
 *              type: string
 *          -   in: query
 *              name: newDat
 *              description: contains some new data from request.
 *              type: string
 *          -   in: path
 *              required: true
 *              name: fileDat
 *              description: contains info about clients
 *              type: string
 *          -   in: path
 *              required: true
 *              name: queueDat
 *              description: contains some data about clients in the queue
 *              type: string
 *     responses:
 *          200:
 *                  $ref: '#/responses/200'
 *          400:
 *                  $ref: '#/responses/400'
 * definition:
 *      json-file:
 *          description: files contain queue or clients' info
 *          type: object
 *          required:
 *          -   idMax
 *          -   dat
 *          properties:
 *              idMax:
 *                  type: integer
 *                  example: 1
 *              dat:
 *                  type: object
 *                  required:
 *                  -   id
 *                  -   name
 *                  -   login
 *                  -   password
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 1
 *                      name:
 *                          type: string
 *                          example: I.I.Ivanov
 *                      login:
 *                          type: string
 *                          example: iivanov2020
 *                      password:
 *                          type: string
 *                          example: 1q2a3z
 *      client:
 *          type: object
 *          required:
 *          -   name
 *          -   login
 *          -   password
 *          properties:
 *              name:
 *                  type: string
 *                  example: I.I.Ivanov
 *              login:
 *                  type: string
 *                  example: iivanov2020
 *              password:
 *                  type: string
 *                  example: 1q2a3z
 */
app.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    /**
     * "Response on "read" request"
     */
    if(req.query.actionType=="r"){
        res.status(200).send(JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json')));
    }
    /**
     * "Response on "create" request"
     */
    else if(req.query.actionType=="c"){
        let newDat = req.query.item;
        let name = newDat.slice(0, newDat.indexOf(' '));
        let acc = newDat.slice(newDat.indexOf(' ')+1,);
        let login = acc.slice(0, acc.indexOf(' '));
        let password = bin2hex(acc.slice(acc.indexOf(' ')+1,));
        let client = {'name':name , 'login': login, 'password':password};
        let fileDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/clients.json'));
        let existence = 0;
        for (let key in fileDat.dat){
            if (fileDat.dat[key].login == login){
                res.status(200).send('Клиент с таким логином уже существует! Введите данные еще раз!');
                existence = 1;
            }
        }
        if (existence == 0) {
            fileDat.idMax++;
            fileDat.dat[fileDat.idMax] = client;
            fs.writeFileSync("/var/www/kursach2.1/clients.json", JSON.stringify(fileDat));
            let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
            queueDat.idMax++;
            queueDat.dat[queueDat.idMax] = {"id":queueDat.idMax,"name":name};
            fs.writeFileSync("/var/www/kursach2.1/queue.json", JSON.stringify(queueDat));
            res.status(200).send(`Вы успешно зарегистрировались и встали в очередь! Ваше место в очереди - ${queueDat.idMax}.`);
        }
    }
    /**
     * "Response on "add" request"
     */
    else if(req.query.actionType=="a"){
        let newDat = req.query.item;
        let login = newDat.slice(0, newDat.indexOf(' '));
        let password = bin2hex(newDat.slice(newDat.indexOf(' ')+1,));
        let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
        let fileDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/clients.json'));
        let existence = 0;
        for (let key in fileDat.dat){
            if (fileDat.dat[key].login == login){
                let name = fileDat.dat[key].name;
                for (let key in queueDat.dat) {
                    if (queueDat.dat[key].name == name) {
                        res.status(200).send(`Вы уже стоите в очереди! Ваше место в очереди - ${queueDat.dat[key].id}.`);
                        existence = 2;
                    }
                }
            }
        }
        if (existence!=2) {
            for (let key in fileDat.dat) {
                if (fileDat.dat[key].login == login) {
                    existence = 1;
                    if (fileDat.dat[key].password == password) {
                        queueDat.idMax++;
                        queueDat.dat[queueDat.idMax] = {"id":queueDat.idMax,"name": fileDat.dat[key].name};
                        fs.writeFileSync("/var/www/kursach2.1/queue.json", JSON.stringify(queueDat));
                        res.status(200).send(`Ваше место в очереди - ${queueDat.idMax}.`);
                    } else {
                        res.status(200).send('Неверный пароль! Введите данные еще раз!');
                    }
                }
            }
        }
        if (existance == 0) {
            res.status(200).send('Клиента с таким логином не существует! Введите данные еще раз!');
        }
    }
    /**
     * "Response on "know" request"
     */
    else if(req.query.actionType=="k"){
        let newDat = req.query.item;
        console.log(newDat);
        let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
        let fileDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/clients.json'));
        let existence = 0;
        for (let key in fileDat.dat){
            if (fileDat.dat[key].login == newDat){
                let name = fileDat.dat[key].name;
                for (let key in queueDat.dat) {
                    if (queueDat.dat[key].name == name) {
                        res.status(200).send(`Ваше место в очереди - ${queueDat.dat[key].id}`);
                        existence = 1;
                    }
                }
            }
        }
        if (existence == 0) {
            res.status(200).send('Клиента с таким логином не существует! Введите данные еще раз!');
        }
    }
    /**
     * "Response on "update" request"
     */
    else if(req.query.actionType=="u"){
        let newDat = req.query.item;
        let lastId = req.query.id;
        let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
        queueDat.dat[lastId].name = newDat;
        fs.writeFileSync("/var/www/kursach2.1/queue.json", JSON.stringify(queueDat));
        res.status(200).send(newDat.toString());
    }
    /**
     * "Response on "delete" request"
     */
    else if(req.query.actionType=="d"){
        let lastId = req.query.id;
        let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
        delete queueDat.dat[lastId];
        queueDat.idMax--;
        for (let key in queueDat.dat){
            if (lastId<key){
                queueDat.dat[key].id--;
            }
        }
        fs.writeFileSync("/var/www/kursach2.1/queue.json", JSON.stringify(queueDat));
        res.status(200).send(lastId.toString());
    }
    /**
     * "Response on "delete all" request"
     */
    else if(req.query.actionType == "da"){
        let queueDat = JSON.parse(fs.readFileSync('/var/www/kursach2.1/queue.json'));
        for (let key in queueDat.dat) {
            delete queueDat.dat[key];
        }
        queueDat.idMax = 0;
        fs.writeFileSync("/var/www/kursach2.1/queue.json", JSON.stringify(queueDat));
	res.status(200).send('request confirmed');
   }
    else{
        res.send('wrong request');
    }
});
app.listen(8080);

