<?php
$data = urldecode($_REQUEST['data']);
$dts = json_decode($data);


 include_once "lib/swift_required.php";
 /*
  * Create the body of the message (a plain-text and an HTML version).
  * $text is your plain-text email
  * $html is your html version of the email
  * If the reciever is able to view html emails then only the html
  * email will be displayed
  */ 
 ob_start();
 $text = '';
//$html = include 'http://localhost/dell-mtach-lab/email/index.php'; // (string)"World"
$html = file_get_contents('http://dellmatchlab.com/email/index.php?data='.urlencode($_REQUEST['data']));//die();
echo $html;
 // This is your From email address
 $from = array('no-reply@dellmatchlab.com' => 'Dell Match Lab');
 // Email recipients
 $to = array(
       $dts->userEmail=>$dts->userName,
 );
 // Email subject
 $subject = 'Dell Match Lab Products';

 // Login credentials
 $username = 'azure_01fb63af070614ba4d42a48755708bef@azure.com';
 $password = 'bjaoglad';

 // Setup Swift mailer parameters
 $transport = Swift_SmtpTransport::newInstance('smtp.sendgrid.net', 587);
 $transport->setUsername($username);
 $transport->setPassword($password);
 $swift = Swift_Mailer::newInstance($transport);

 // Create a message (subject)
 $message = new Swift_Message($subject);

 // attach the body of the email
 $message->setFrom($from);
 $message->setBody($html, 'text/html');
 $message->setTo($to);
 $message->addPart($text, 'text/plain');

 // send message 
 if ($recipients = $swift->send($message, $failures))
 {
     // This will let us know how many users received this message
     echo 'Message sent out to '.$recipients.' users';
 }
 // something went wrong =(
 else
 {
     echo "Something went wrong - ";
     print_r($failures);
 }
 ?>