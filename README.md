# kursach2.1
**Курсовая работа "Электронная очередь", курс 2, дисциплина: Информатика и информационные технологии в правоохранительной деятельности**
-----------------------------------
***
[♥ Ссылка на хостинг с проектом ♥](http://95.217.210.154/)
***
***
### Unit-testing.
Для модульного тестирования основного функционала проекта используется тестовый фреймворк [Mocha](https://mochajs.org/).
***
***
### CI/CD: Buddy. 
В качестве системы непрерывной интеграции и разработки используется [Buddy: The DevOps Automation Platform](https://app.buddy.works).
![Image](https://app.buddy.works/dakurushin/kursach2-1/pipelines/pipeline/262488/badge.svg?token=918d50d7e5fc1e6c04efd0bb49106f27aa96f681af776c988d9e0b1053d8b1b1)

Ссылка на Pipeline проекта: [→Клик!←](https://app.buddy.works/dakurushin/kursach2-1/pipelines/pipeline/262488)
***
***
### Система автодокументирования.
Для документации кода используется система [JSDoc](https://jsdoc.app/). В код добавлены блоки комментариев для его разъяснения.

Ссылка для просмотра документации кода: [→Клик!←](http://95.217.210.154/documentation/js/index.html)
***
***
**Руководство по установке**
-----------------------------------
***
### 1) Инструкция пользователя:
#### a. В роли Клиента:
1. Скачайте мессенджер Telegram:
    <p>
      <img src = "https://pngicon.ru/file/uploads/telegram.png" width = "80">
    </p>
    Google Play: https://play.google.com/store/apps/details?id=org.telegram.messenger
 
    App Store: https://apps.apple.com/ru/app/telegram-messenger/id686449807
    
    Desktop: https://telegram-for-desktop.ru.uptodown.com/windows
2. Напишите боту "Электронная очередь" @kursach1_queue_bot.
3. Следуйте дальнейшим инструкциям, которые предоставляет бот.
#### b. В роли Администратора:
1. Получите уникальный код для регистрации в системе у системного администратора. (Пример: 17092000)
2. Пройдите регистрацию или авторизацию, если Вы уже зарегистрированы.
3. Приступайте к работе! 

**P.S.**: Вам будет доступен список ваших клиентов, которые были зарегистрированы в очереди, а также интуитивно понятный функциональный набор для работы.`
***
### 2) Инструкция разработчика:
**Прим.**: Рассмотрим в качестве примера развертывание приложения на хостинге [Hetzner](https://www.hetzner.com/)
1. Hetzner: 
    * Зарегистрируйтесь на Hetzner.
    * Пройдите аутентификацию.
    * Возьмите в аренду облачный сервер: сгенерируйте пару SSH ключей (секретный и публичный) ***командой***-[`$ ssh-keygen`] в вашей командной строке или интерпретаторе командной строки (например, [Git Bash](https://git-scm.com/downloads)), введите публичный ключ в раздел "SSH-ключи" при покупке.
    * Включите сервер.
    * Далее нам понадобится только IP-адрес вашего сервера.
2. Командная строка или интерпретатор командной строки:<br><br>
**Прим.**: Рассмотрим в качестве примера развертывание на ОС Ubuntu 18.04.
    * Выполните вход на сервер, выполнив следующую команду:
        1) `$ ssh root@your_server's_ip-address -i path_to_your_secret_key`
    * Установите APACHE2, выполнив следующие команды: 
        1) `$ sudo apt update`
        2) `$ sudo apt install apache2`
        3) `$ sudo systemctl status apache2` - Проверка статуса.
    * Установите MySQL, выполнив следующие команды:
        1) `$ sudo apt install mysql-server`
        2) `$ sudo mysql_secure_installation` - В результате выполнения этой команды вам будет предложено настроить плагин валидации паролей (VALIDATE PASSWORD PLUGIN). Введите Y для включения плагина или что-нибудь другое для продолжения без его включения.
        3) Вне зависимости от того, включили вы плагин валидации паролей или нет, далее вам будет предложено задать пароль для пользователя root для MySQL. Если вы включили валидацию паролей, вам будет показан уровень надёжности заданного вами ранее пароля root пользователя, а также вам будет предложено изменить этот пароль. Если вы не хотите менять пароль, введите N или “no”. 
        4) На все последующие вопросы просто вводите Y и нажимайте клавишу ENTER для выбора настроек по умолчанию. При этом удалятся некоторые тестовые пользователи и базы данных, будет отключена возможность удаленного доступа с учетной записью root-пользователя, и все изменения будут немедленно применены в MySQL.
     * Создайте БД, выполнив следующие команды:
        1) `$ mysql -u root -p -h localhost`
        2) `CREATE USER 'Your_name'@'localhost' IDENTIFIED BY 'some_pass';`
        3) `CREATE DATABASE admins`
        4) `GRANT ALL PRIVILEGES ON admins.* TO 'Your_name'@'localhost';`
        5) `quit;`
        6) `mysql -u Your_name -p -h localhost`
        7) `USE admins;`
        8) `CREATE TABLE users (
            id int(11) NOT NULL AUTO_INCREMENT,
            code int(11) DEFAULT NULL,
            login varchar(64) NOT NULL,
            password varchar(64) NOT NULL,
            token varchar(64) DEFAULT NULL,
            PRIMARY KEY(id)           
        );`
        9) `INSERT INTO users (code) VALUES (your_value);` - добавление уникального кода для входа администратора.
        
        ***Важно***: Необходимо исправить код подключения к базе данных под себя (файл [database.php](https://github.com/GuliMaster/kursach2.1/blob/master/database.php) в репозитории).
     * Установите PHP, выполнив следующую команду:
        1) `$ sudo apt install php libapache2-mod-php php-mysql`
     * Установите Node.js, выполнив следующие команды:
        1) `$ sudo apt install nodejs`
        2) `$ sudo apt install npm` -  В большинстве случаев вам также потребуется установить npm - менеджер пакетов для Node.js. Это позволит вам легко устанавливать модули и пакеты для Node.js.
     * Установите PM2, выполнив следующую команду:
        1) `$ sudo npm install pm2@latest -g`
     * Установите Git, выполнив следующую команду:
        1) `$ sudo apt install git`
     * Склонируйте репозиторий, выполнив следующие команды:
        1) `$ cd /var/www/`
        2) `$ git clone https://github.com/GuliMaster/kursach2.1.git`
        
        ***Важно***: Необходимо исправить все ссылки в коде под IP-адрес Вашего сервера (файлы [auth.php](https://github.com/GuliMaster/kursach2.1/blob/master/auth.php), [index.php](https://github.com/GuliMaster/kursach2.1/blob/master/index.php), [login.php](https://github.com/GuliMaster/kursach2.1/blob/master/login.php), [register.php](https://github.com/GuliMaster/kursach2.1/blob/master/register.php), [signup.php](https://github.com/GuliMaster/kursach2.1/blob/master/signup.php), [script.js](https://github.com/GuliMaster/kursach2.1/blob/master/script.js), [server.js](https://github.com/GuliMaster/kursach2.1/blob/master/server.js), [telegrambot.js](https://github.com/GuliMaster/kursach2.1/blob/master/telegrambot.js)).
     * Инициализируйте начальную страницу своего сервера:
        1) `$ cd /etc/apache2/sites-enabled/`
        2) `$ nano 000-default.conf`
        3) `Исправить: DocumentRoot /var/www/html/ (по умолчанию) -> DocumentRoot /var/www/kursach2.1`
        4) `$ sudo systemctl restart apache2`
     * Настройте автозапуск приложения:
        1) `$ pm2 start /var/www/kursach2.1/server.js`
        2) `$ pm2 start /var/www/kursach2.1/telegrambot.js`
        3) `$ pm2 startup ubuntu`
        4) `$ pm2 save`
***
        
