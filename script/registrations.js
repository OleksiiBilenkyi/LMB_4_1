const registrationForm = document.getElementById("registration-form");
const emailRegex = /^\S+@\S+\.\S+$/;

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = registrationForm.username.value.trim();
  const email = registrationForm.email.value.trim();
  const password = registrationForm.password.value.trim();
  const confirm_password = registrationForm.password_repeat.value.trim();

  if (username.length < 6) {
    alert("Нікнейм повинен містити принаймні 6 символи");
    return;
  }

  if (password.length < 8) {
    alert("Пароль повинен містити принаймні 8 символів");
    return;
  }

  if (password !== confirm_password) {
    alert("Паролі не співпадають");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Невірний формат електронної пошти");
    return;
  }
  
  const data = { username, email, password };
  
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/registers.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
		const response = JSON.parse(xhr.responseText);
		alert(response.message);
        registrationForm.reset();
      } else {
        alert(response.message);
      }
    }
  };
  xhr.send(JSON.stringify(data));
});
