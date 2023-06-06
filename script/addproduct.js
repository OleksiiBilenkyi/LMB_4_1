// Обробник події для подання форми
document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Запобігти перезавантаженню сторінки

  // Отримати дані з форми
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').files[0];

  // Створити об'єкт FormData для відправки даних на сервер
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('image', image);

  // Відправити дані на сервер
  fetch('http://moviehunter/add-product', {
    method: 'POST',
    body: formData
  })
  
    .then(response => response.json())
	
    .then(result => {
		
      // Обробка відповіді від сервера
      console.log(result);
      // Очистити форму
      document.getElementById('myForm').reset();
      // Закрити модальне вікно
      document.getElementById('addWindow').style.display = 'none';
    })
    .catch(error => {
		location.reload();
      console.error('Помилка при відправці даних: ', error);
    });
});
