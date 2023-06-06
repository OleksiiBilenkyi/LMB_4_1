// Отримання посилання на заголовок
var header = document.querySelector('header'); // Замініть 'header' на селектор вашого заголовку

// Отримання ul елемента в заголовку
var ulElement = header.querySelector('ul'); // Замініть 'ul' на селектор вашого ul елемента

// Створення нового елемента li
var liElement = document.createElement('li');

// Перевірка наявності сесії
if (!sessionStorage.getItem('user_id')) {//Не авторизований

  // Створення нового елемента a
  var aElement = document.createElement('a');
  aElement.setAttribute('onclick', "document.getElementById('id_login').style.display='block'");

  // Створення елемента img
  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', 'resources/userico.svg');

  // Додавання елемента img до елемента a
  aElement.appendChild(imgElement);

  // Додавання елемента a до елемента li
  liElement.appendChild(aElement);

  // Додавання елемента li до DOM-дерева
  ulElement.appendChild(liElement);

} else {//Авторизований
  const username = getSessionValue('username');
  const role = getSessionValue('role');
  
  if (role === 'admin') {
    // Додаткові дії для ролі "admin"
	var adminheader = document.querySelector('header'); // Замініть 'header' на селектор вашого заголовку
	
	var adminulElement = adminheader.querySelector('ul'); // Замініть 'ul' на селектор вашого ul елемента
	
	var adminliElement = document.createElement('li');
    
		  // Створення нового елемента a
	 var aElement = document.createElement('a');
		
	aElement.setAttribute('onclick', "document.getElementById('addWindow').style.display = 'block'");

	aElement.textContent = "Керувати";

	  // Додавання елемента a до елемента li
	adminliElement.appendChild(aElement);

	  // Додавання елемента li до DOM-дерева
	adminulElement.appendChild(adminliElement);
  
  }
	  // Створення нового елемента a
  var aElement = document.createElement('a');
	  
  aElement.setAttribute('onclick', "document.getElementById('menuModal').style.display = 'block'");

  aElement.textContent = username;

  // Додавання елемента a до елемента li
  liElement.appendChild(aElement);

  // Додавання елемента li до DOM-дерева
  ulElement.appendChild(liElement);
}


function getSessionValue(name) {
  return sessionStorage.getItem(name);
}

function SessionClear() {
  sessionStorage.clear();
}

function showAdminOptions() {
  // Додаткові дії для ролі "admin"
  // TODO: Виконати потрібні дії для ролі "admin"
  console.log("Ви увійшли як адміністратор");
}
