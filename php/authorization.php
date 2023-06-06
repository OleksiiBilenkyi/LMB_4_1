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
$password = $data['password'];
  
// Хешування пароля
$hashed_password = hash('sha256', $password);
  
// Запит до бази даних для перевірки авторизації
$sql = "SELECT * FROM `accounts` WHERE username = '$username' AND password = '$hashed_password';";
$result = $conn->query($sql);

// Перевірка результату запиту
if ($result->num_rows == 1) {
	// Авторизація успішна
	$row = $result->fetch_assoc();
	$user_id = $row['id'];
	
	 // Зберегти ідентифікатор користувача у файлі cookie
	setcookie('user_id', $user_id, time() + 86400, '/');
	setcookie('username', $username, time() + 86400, '/');
	
	$response = array('success' => true, 'message' => 'Успішна авторизація');
	echo json_encode($response);

} else {
    // Авторизація неуспішна
	$response = array('success' => false, 'message' => 'Ошибка авторизації ' . mysqli_error($conn));
      echo json_encode($response);
    // Виконайте необхідні дії у разі невдалої авторизації
}

// Закриття підключення до бази даних
$conn->close();
?>





