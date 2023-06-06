const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

// Налаштування папки для завантаження зображень
const storage = multer.diskStorage({
  destination: 'C:/OSPanel/domains/LMB4/resources/productImg',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

console.log(upload);


// Параметри підключення до бази даних
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'product',
  password: ''
});

// Маршрут для обробки запиту на додавання товару
app.post('/add-product', upload.single('image'), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const imagePath = req.file.path;

  // Виконати додавання товару в базу даних
  connection.query(
    'INSERT INTO product (name, description, price, img) VALUES (?, ?, ?, ?)',
    [name, description, price, imagePath],
    (error, results) => {
      if (error) {
        console.error('Помилка при додаванні товару: ', error);
        res.status(500).json({ message: 'Помилка при додаванні товару' });
      } else {
        console.log('Товар успішно додано');
        res.status(200).json({ message: 'Товар успішно додано' });
      }
    }
  );
});

// Маршрут для рестарту сервера
app.get('/restart', (req, res) => {
  process.exit(0); // Завершити процес сервера
});


// Запуск сервера
app.listen(1488, () => {
  console.log('Сервер запущено на порті 1488');
});
