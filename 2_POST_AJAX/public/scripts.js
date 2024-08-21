document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registrationForm");
    const loginInput = document.querySelector("#login");
    const passwordInput = document.querySelector("#password");
    const emailInput = document.querySelector("#email");
    const messageBox = document.querySelector("#message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        const email = emailInput.value.trim();

        // Проверка на пустые значения
        if (!login || !password || !email) {
            messageBox.textContent = "Все поля обязательны для заполнения.";
            messageBox.style.color = "red";
            return;
        }

        // Формируем JSON для отправки
        const requestData = {
            login: login,
            password: password,
            email: email
        };

        // Отправляем данные на сервер через AJAX POST запрос
        fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageBox.textContent = "Регистрация прошла успешно!";
                messageBox.style.color = "green";
            } else {
                messageBox.textContent = "Ошибка регистрации: " + data.message;
                messageBox.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            messageBox.textContent = "Произошла ошибка при отправке данных. Попробуйте снова.";
            messageBox.style.color = "red";
        });
    });
});