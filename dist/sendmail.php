<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

require_once('phpmailer/class.phpmailer.php');

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->SetFrom("website@charta.ca", "Charta.ca");
$mail->AddAddress("ychartier@charta.ca");

if( $_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action'])) {
    if($_GET['action'] == 'career')
        sendCareer();

    if($_GET['action'] == 'contact')
        sendContact();
} else {
    http_response_code(500);
    echo 'unexpected-error';
}

function sendCareer(){
    global $mail;

    $formData = getFormData();

    if(!validateFormData($formData)){
        http_response_code(500);
        echo 'required-fields-missing';
        return;
    }

    $file = $_FILES['csv_file'];
    if(!validateFile($file)){
        http_response_code(500);
        echo 'invalid-file-pdf';
        return;
    }

    $mail->addAttachment($file['tmp_name'], $file['name']);

    $subject = "Charta.ca - Vous avez reçu une nouvelle candidature.";
    $body = buildBody($formData);
    
    sendMail($subject, $body);
}

function sendContact(){
    global $mail;

    $formData = getFormData();

    if(!validateFormData($formData)){
        http_response_code(500);
        echo 'required-fields-missing';
        return;
    }

    if(!validateContact($formData['contact'])){
        http_response_code(500);
        echo 'invalid-contact';
        return;
    }
    
    $mail->addAddress($formData['contact']."@charta.ca");

    $subject = "Charta.ca - Vous avez reçu un nouveau message.";
    $body = buildBody($formData);

    sendMail($subject, $body);
}

function buildBody($formData){
    $body = "";
    $body .= isset($formData['name']) ? "Nom : ".$formData['name']."<br><br>" : '';
    $body .= isset($formData['email']) ? "Email : ".$formData['email']."<br><br>" : '';
    $body .= isset($formData['phone'])  ? "Téléphone : ".$formData['phone']."<br><br>" : '';       
    $body .= isset($formData['message']) ? "Message : ".$formData['message']."<br><br>" : '';
    $body .= $_SERVER['HTTP_REFERER'] ? '<br><br><br>Envoyé à partir de : ' . $_SERVER['HTTP_REFERER'] : '';

    return $body;
}

function sendMail($subject, $body){
    global $mail;
    
    $mail->Subject = $subject;
    $mail->IsHTML(true); 
    $mail->Body = $body;

    if( $mail->Send() ):
        http_response_code(200);
        echo 'success';
    else:
        http_response_code(500);
        echo 'failed';
    endif;
}

function getFormData(){
    $formData = array();
    $formData['contact'] = isset($_POST['toaddress']) ? $_POST['toaddress'] : null;
    $formData['name'] = $_POST['contact_name'];
    $formData['email'] = $_POST['contact_email'];
    $formData['phone'] = $_POST['contact_phonenumber'];
    $formData['message'] = $_POST['message'];

    return $formData;
}

function validateFormData($formData){
    return !empty($formData['name']) && !empty($formData['email']) && !empty($formData['phone']) && !empty($formData['message']);
}

function validateContact($value){
    return in_array($value, array('info', 'secretariat', 'comptabilite'));
}

function validateFile($file){
    return $file['type'] == 'application/pdf';
}
?>