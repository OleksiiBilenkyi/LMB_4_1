var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var responseData = JSON.parse(this.responseText);
    var table = document.querySelector('.item-container');

    // Завантажуємо аудіофайл
    var audio = new Audio('/resources/speach.wav');

    function renderItems(items) {
      table.innerHTML = ''; // Очищаємо таблицю перед відображенням нових елементів

      items.forEach(function(item) {
        var newItem = document.createElement('div');
        newItem.setAttribute('class', 'item');

        var imgCell = document.createElement('img');
        var nameCell = document.createElement('h3');
        var priceCell = document.createElement('p');
        var buyButton = document.createElement('button');

        imgCell.src = item.img.substring(item.img.indexOf('resources'));
        nameCell.innerText = item.name;
        priceCell.innerText = item.price;
        buyButton.innerText = 'Купити';

        buyButton.addEventListener('click', function() {
          // Відтворюємо звуковий ефект
          audio.play();

          alert('Ця функція тимчасово не працює');
        });

        newItem.appendChild(imgCell);
        newItem.appendChild(nameCell);
        newItem.appendChild(priceCell);
        newItem.appendChild(buyButton);

        table.appendChild(newItem);
      });
    }

    renderItems(responseData); // Відображення всіх елементів по завантаженню сторінки

    var searchInput = document.querySelector('.search-container input[name="search"]');
    var searchButton = document.querySelector('.search-container button[type="submit"]');

    searchButton.addEventListener('click', function() {
      var searchText = searchInput.value.toLowerCase();
      var filteredItems = responseData.filter(function(item) {
        return (
          item.name.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.price.toString().includes(searchText)
        );
      });
      renderItems(filteredItems);
    });
  }
};

xhttp.open('GET', 'php/get_data.php', true);
xhttp.send();
