<?
//echo json_decode($_REQUEST['products']);
$my_file = 'product.json';
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
$data = $_REQUEST['products'];
fwrite($handle, $data);
fclose($handle);
?>