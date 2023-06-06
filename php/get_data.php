<?php

// Підключення до бази даних
$host = "localhost"; // адреса сервера, на якому знаходиться база даних
$username = "root"; // ім'я користувача бази даних
$password = ""; // пароль користувача бази даних
$dbname = "product"; // назва бази даних

$conn = mysqli_connect($host, $username, $password, $dbname);

// Перевірка підключення до бази даних
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Запит до бази даних на отримання даних
$sql = "SELECT img, name, description, price FROM product"; // table_name - назва вашої таблиці

$result = mysqli_query($conn, $sql);

// Створення масиву даних з результатів запиту
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
}

// Відправлення результату у форматі JSON
header('Content-Type: application/json');
echo json_encode($data);

// Закриття з'єднання з базою даних
mysqli_close($conn);

?>
