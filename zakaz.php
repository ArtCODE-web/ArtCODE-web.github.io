<?php
session_start();

$FROM = $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
$name = stripslashes(htmlspecialchars($_POST['name']));
$phone = stripslashes(htmlspecialchars($_POST['phone']));
$saleSet = stripslashes(htmlspecialchars($_POST['saleSet']));

$ip = $_SERVER['REMOTE_ADDR'];
$subid = $_POST['subid'];
$subid1 = $_POST['subid1'];

$data = array(
    'phone' => $phone,
    'email' => $email,
    'site' => $_SERVER['HTTP_HOST'],
    'subid' => $subid,
    'sale' => $saleSet,
    'subid1' => $subid1, 'ip' => $ip
);

$success_url = "//{$FROM}/form-ok.php?name=$name&phone=$phone&sale=$saleSet";
header('Location: ' . $success_url);
echo '<h1 style="color:green;">Поздравляем! Ваш заказ принят!</h1>';
exit;

?>