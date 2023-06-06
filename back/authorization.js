const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const session = require('express-session');

// Функция для хеширования пароля с использованием SHA-256
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounts'
});

// Установка соединения с базой данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }
  console.log('Успешное подключение к базе данных');
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настройка хранения сессий
app.use(session({
  secret: 'your-secret-key', // Секретный ключ для подписи сессии
  resave: false,
  saveUninitialized: true
}));

// Маршрут для проверки логина и пароля
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = hashPassword(password); // Хеширование пароля
	
  // Выполнение запроса к базе данных
  const query = `SELECT id , role  FROM accounts WHERE username = '${username}' AND password = '${hashedPassword}'`;
  console.log(query);
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса: ', error);
      res.status(500).json({ error: 'Ошибка выполнения запроса' });
      return;
    }
	
	

    // Проверка результатов запроса
    if (results.length > 0) {
      // Сохранение идентификатора пользователя в сессии
      req.session.userId = results[0].id;
      res.json({ message: 'Успешный вход', id : results[0].id , role : results[0].role});
    } else {
      res.status(401).json({ error: 'Неправильный логин или пароль' });
    }
  });
});

// Пример маршрута, требующего аутентификации
app.get('/protected', (req, res) => {
  // Проверка, авторизован ли пользователь
  if (req.session.userId) {
    res.send('Доступ разрешен');
  } else {
    res.status(401).send('Необходима аутентификация');
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
