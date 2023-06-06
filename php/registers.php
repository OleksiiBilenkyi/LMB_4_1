<?php

// Параметри підключення до бази даних
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "accounts";

// Створення з'єднання з базою даних
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Перевірка з'єднання
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Отримання рядка JSON з тіла запиту
$json_data = file_get_contents('php://input');

// Розпакування рядка JSON
$data = json_decode($json_data, true);

// Отримання значень полів з розпакованих даних
$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
  
// Хешування пароля
$hashed_password = hash('sha256', $password);
  
// Перевірка, чи є користувач з таким же ім'ям користувача або електронною поштою
$sql_check = "SELECT * FROM accounts WHERE username='$username' OR email='$email'";
$result = mysqli_query($conn, $sql_check);

if (mysqli_num_rows($result) > 0) {
    // Якщо користувач з таким ім'ям користувача або електронною поштою вже існує, поверніть помилку
    $response = array('success' => false, 'message' => 'Registration failed: Username or email already exists');
    echo json_encode($response);
} else {
    // Якщо користувача з таким ім'ям користувача або електронною поштою не існує, то додайте запис в таблицю accounts
    $sql = "INSERT INTO `accounts` (`id`, `username`, `email`, `password`) VALUES (NULL, '$username', '$email', '$hashed_password')";
  
    if (mysqli_query($conn, $sql)) {
      $response = array('success' => true, 'message' => 'Registration successful');
      echo json_encode($response);
    } else {
      $response = array('success' => false, 'message' => 'Registration failed: ' . mysqli_error($conn));
      echo json_encode($response);
    }
}
?>
