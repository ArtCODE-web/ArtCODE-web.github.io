<?session_start();
$site = $_SERVER['SERVER_NAME'];
$cookie = md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Вітаємо! Ваше замовлення прийняте!</title>
    <link rel="stylesheet" href="css/form-ok.css">
</head>
<body>
<div class="block_success"><h2 style="text-transform: uppercase;color: #CD0000;">Вітаємо! Ваше замовлення прийняте!</h2>
    
    <h3 class="success" style="margin-bottom:30px;"> Перевірте правильність введеної інформації. </h3>
    <div class="success">
        <ul class="list_info">
            <li><span>Ваше Ім'я:  </span><span id="client"><?= $_GET['name'] ?></span></li>
            <li><span>Ваш телефон: </span><span id="tel">+<?= $_GET['phone'] ?></span></li>
            <li><span>Знижка: </span><span id="saleSet"><?= $_GET['sale'] ?></span></li>
        </ul>
        <br/></div>
        <br><br>
        <p class="fail success" style="margin-top:30px;">
            Якщо ви помилилися під час заповнення форми, то, будь ласка,
            <a href="javascript: history.back(-1);" style="color:#2067d8;">заповніть заявку ще раз</a>
        </p>
        <p style="text-align: center;"> Якщо все вірно, то можете закрити цю вкладку </p>
    </div>
</body>
</html>