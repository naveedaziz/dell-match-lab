<? 
$my_file = 'admin/product.json';
$handle = fopen($my_file, 'r');
$data = fread($handle,filesize($my_file));
$productInfo = json_decode($data, true);
$id= '';
$name= '';
$image = '';
$shortDesp = '';
foreach($productInfo as $index=>$val){
	if($val['id'] == $_REQUEST['id']){
		$id = $val['id'];
		$name= $val['name'];
		$image = $val['image'];
		$shortDesp = $val['descp'];
	};
};


?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  
  <!-- FB Meta Tags -->
<meta property="fb:app_id" content="365073203627947" />
<meta property="og:title" content="<?=$name;?>" />

<meta property="og:url" content="http://dellmatchlab.com/product_detail?id=<?=$id;?>" />
<meta property="og:image" content="<?=$image;?>" />
<meta property="og:description" content="<?=$shortDesp;?>" />
<meta property="og:site_name" content="Dell Match Lab" />




  <title>Dell Match Lab || <?=$name;?></title>
   <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />

<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="css/demo-styles.css" />
  <link rel="icon" href="favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
  <script src="js/modernizr-1.5.min.js"></script>
  

</head>


<body class="bgGradient" onLoad="GetApp();">
            <div class="row">
 		<header>
 <div class="container">
 <div class="row">
 <div class="col-lg-12">
         <div class="col-lg-5">
                        <a href="index.html"><img src="images/logo.png" class="logo">
                         <h4 class="header_title">The Match Lab</h4>
                         <img src="images/logo_icon.png" class="logoIcon"></a>
          </div>
  <div class="col-lg-7">
  	<h4  class="header_sub_heading">Meet your perfect match from the Dell family of products</h4>
  </div>
  </div>
  </div>
  </div>
 </header>
 	</div>
 	
  
    <div class="container marginTop leftPos noMargin-padding screen-7">
               <div class="clearfix">
               </div>
            <div class="row prodListingsAll">
            </div>
            <div class="clearfix clearProdBottom"></div>
            </div>     
            
    <div class="container marginTop leftPos noMargin-padding  screen-8">
            <div class="row">
               
               <div class="productDetail" ></div>  
             <div class="clearfix"></div>
                  
            </div>
            </div>           
            
            
  <div class="clearfix"></div>
	<div align="center" class="preLoader preloadClass">
 		 <img src="images/preload.gif">
  </div>
  
<!--====================================end demo wrapper================================================-->
  <script src="js/jquery-2.0.3.min.js"></script>
  <script src="admin/assets/js/bootstrap.min.js"></script>
  <script src='admin/assets/js/MobileServices.Web-1.0.0.min.js'></script>
  <script src="js/scripts_product_detail.js"></script>

</body>
</html>
