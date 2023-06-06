const authorizationForm = document.getElementById("authorization-form");

authorizationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = authorizationForm.username.value.trim();
  const password = authorizationForm.password.value.trim();

  // Создаем объект с данными для отправки на сервер
  const data = {
    username: username,
    password: password
  };

  // Отправляем данные на сервер с помощью Fetch API или XMLHttpRequest
  fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  // Обрабатываем результат от сервера

  // Зберегти дані авторизації в sessionStorage
  sessionStorage.setItem('user_id', result.id);
  sessionStorage.setItem('username', data.username);
  sessionStorage.setItem('role', result.role);
	location.reload();

  // Оновити сторінку після успішної авторизації
})
.catch(error => {
  // Обрабатываем ошибку
  console.error('Ошибка при отправке данных: ', error);
});

});
