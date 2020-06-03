var TelegramBot = require('node-telegram-bot-api');
var token = '632065176:AAGWUZorgaqTSSLBtwqGdwvwJPkqw4ivOlg';
var bot = new TelegramBot(token, { polling: true });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const server = "http://95.217.210.154";
var query_to_server = function(bot, server, msg, xhr, actionType){
    xhr.open('GET',encodeURI(`${server}?actionType=${actionType}&item=${msg.text}`), false);
    xhr.send();
    if (xhr.status != 200){
        bot.sendMessage(msg.chat.id, `${xhr.status + ': ' + xhr.statusText}`); // пример вывода: 404: Not Found
    } else {
        bot.sendMessage(msg.chat.id, `${xhr.responseText}`); // responseText -- текст ответа.
        console.log(xhr.responseText);
    }
};

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Добро пожаловать! Для начала работы введите "Начать"');
});

bot.onText(/Начать/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Для начала Вам необходимо зарегистрироваться/авторизоваться');
    const opts = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Регистрация', callback_data: 'reg'},
                    {text: 'Авторизация', callback_data: 'auth'}
                ],
                    [{text: 'Узнать место в очереди', callback_data: 'know'}]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    };
    bot.sendMessage(msg.chat.id, 'Пора сделать выбор!', opts);
});

bot.on('callback_query', (query) => {
    if (query.data == 'reg'){
        bot.sendMessage(query.message.chat.id, 'Введите свои ФИО, логин и пароль! (В формате:И.И.Иванов login 1234)');
        bot.on('text', (msg) => {
            if (msg.text.match(/[ ]/gi).length!=2 || msg.text.match(/[- .А-ЯA-Z0-9]/gi).length!=msg.text.length){
                bot.sendMessage(msg.chat.id, 'Используйте верный формат для регистрации!');
            }
            else {
                query_to_server(bot, server, msg, xhr, 'c');
            }
        });
    }
    if (query.data == 'auth'){
        bot.sendMessage(query.message.chat.id, 'Введите свои логин и пароль! (В формате:login 1234)');
        bot.on('text', (msg) => {
            if (msg.text.match(/[ ]/gi).length!=1 || msg.text.match(/[- .А-ЯA-Z0-9]/gi).length!=msg.text.length){
                bot.sendMessage(msg.chat.id, 'Используйте верный формат для авторизации!');
            }
            else {
                query_to_server(bot, server, msg, xhr, 'a');
            }
        });
    }
    if (query.data == 'know'){
        bot.sendMessage(query.message.chat.id, 'Введите свой логин! (В формате:login)');
        bot.on('text', (msg) => {
            console.log(msg.text.match(/[ ]/gi));
            if (msg.text.match(/[ ]/gi)!=null || msg.text.match(/[- .А-ЯA-Z0-9]/gi).length!=msg.text.length){
                bot.sendMessage(msg.chat.id, 'Используйте верный формат для регистрации!');
            }
            else {
                query_to_server(bot, server, msg, xhr, 'k');
            }
        });
    }
});



