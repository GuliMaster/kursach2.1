const fs = require('fs');
const express = require('express');
const bin2hex = require('locutus/php/strings/bin2hex');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    console.log(req.query);
    if(req.query.actionType=="r"){
        res.send(JSON.parse(fs.readFileSync('queue.json')));
    }
    else if(req.query.actionType=="c"){
        let newDat = req.query.item;
        let name = newDat.slice(0, newDat.indexOf(' '));
        let acc = newDat.slice(newDat.indexOf(' ')+1,);
        let login = acc.slice(0, acc.indexOf(' '));
        let password = bin2hex(acc.slice(acc.indexOf(' ')+1,));
        let client = {'name':name , 'login': login, 'password':password};
        let fileDat = JSON.parse(fs.readFileSync('clients.json'));
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
            fs.writeFileSync("clients.json", JSON.stringify(fileDat));
            let queueDat = JSON.parse(fs.readFileSync('queue.json'));
            queueDat.idMax++;
            queueDat.dat[queueDat.idMax] = {"id":queueDat.idMax,"name":name};
            fs.writeFileSync("queue.json", JSON.stringify(queueDat));
            res.status(200).send(`Вы успешно зарегистрировались и встали в очередь! Ваше место в очереди - ${queueDat.idMax}.`);
        }
    }
    else if(req.query.actionType=="a"){
        let newDat = req.query.item;
        let login = newDat.slice(0, newDat.indexOf(' '));
        let password = bin2hex(newDat.slice(newDat.indexOf(' ')+1,));
        let queueDat = JSON.parse(fs.readFileSync('queue.json'));
        let fileDat = JSON.parse(fs.readFileSync('clients.json'));
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
                        fs.writeFileSync("queue.json", JSON.stringify(queueDat));
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
    else if(req.query.actionType=="k"){
        let newDat = req.query.item;
        console.log(newDat);
        let queueDat = JSON.parse(fs.readFileSync('queue.json'));
        let fileDat = JSON.parse(fs.readFileSync('clients.json'));
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
    else if(req.query.actionType=="u"){
        let newDat = req.query.item;
        let lastId = req.query.id;
        let queueDat = JSON.parse(fs.readFileSync('queue.json'));
        queueDat.dat[lastId].name = newDat;
        fs.writeFileSync("queue.json", JSON.stringify(queueDat));
        res.status(200).send(newDat.toString());
    }
    else if(req.query.actionType=="d"){
        let lastId = req.query.id;
        let queueDat = JSON.parse(fs.readFileSync('queue.json'));
        delete queueDat.dat[lastId];
        queueDat.idMax--;
        for (let key in queueDat.dat){
            if (lastId<key){
                queueDat.dat[key].id--;
            }
        }
        fs.writeFileSync("queue.json", JSON.stringify(queueDat));
        res.status(200).send(lastId.toString());
    }
    else{
        res.send('wrong request')
    }
});
app.listen(8080);