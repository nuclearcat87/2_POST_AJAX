<?php
// Разрешаем запросы из любого источника (для отладки)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Получаем данные POST в формате JSON
$data = json_decode(file_get_contents("php://input"), true);

// Простой пример валидации
if (isset($data['login']) && isset($data['password']) && isset($data['email'])) {
    $login = $data['login'];
    $password = $data['password'];
    $email = $data['email'];

    // Проверка на существующий логин
    $existingLogins = ["user1", "admin", "test"];
    if (in_array($login, $existingLogins)) {
        echo json_encode(["success" => false, "message" => "Логин уже существует!"]);
    } else {
        // В реальной ситуации здесь бы сохранили данные в базу данных
        echo json_encode(["success" => true, "message" => "Регистрация успешна!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Не все поля заполнены!"]);
}
?>