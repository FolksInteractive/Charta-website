<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

require_once('phpmailer/class.phpmailer.php');

$mail = new PHPMailer();

if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    if( $_POST['toaddress'] != '' AND $_POST['contact_name'] != '' AND $_POST['contact_email'] != '' ) {

        $name = $_POST['contact_name'];
        $email = $_POST['contact_email'];
        $phoneNumber = $_POST['contact_phonenumber'];
        $vitea = $_POST['vitea'];
        $message = $_POST['message'];

        $subject = 'New Contact From Charta';        

        $toemail = $_POST['toaddress'];        

        $mail->SetFrom( $email , $name );
        $mail->AddAddress($toemail);
        $mail->Subject = $subject;

        $name = isset($name) ? "Name: $name<br><br>" : '';
        $email = isset($email) ? "Email: $email<br><br>" : '';
        $phoneNumber = isset($phoneNumber) ? "phoneNumber: $phoneNumber<br><br>" : '';
        if($vitea){
            $vitea = "vitae: $vitea<br><br>";
        }        
        $message = isset($message) ? "Message: $message<br><br>" : '';

        $referrer = $_SERVER['HTTP_REFERER'] ? '<br><br><br>This Form was submitted from: ' . $_SERVER['HTTP_REFERER'] : '';

        $body = "$name $email $message $referrer";

        $mail->MsgHTML( $body );
        $sendEmail = $mail->Send();

        if( $sendEmail == true ):
            http_response_code(200);
            echo 'We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible.';
        else:
            http_response_code(500);
            echo 'Email <strong>could not</strong> be sent due to some Unexpected Error. Please Try Again later.<br /><br /><strong>Reason:</strong><br />' . $mail->ErrorInfo . '';
        endif;
       
    } else {
        http_response_code(500);
        echo 'Please <strong>Fill up</strong> all the Fields and Try Again.';
    }
} else {
    http_response_code(500);
    echo 'An <strong>unexpected error</strong> occured. Please Try Again later.';
}

?>