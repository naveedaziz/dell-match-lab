<?php
$dts = urldecode($_REQUEST['data']);
$data = json_decode($dts);

?>
<style type="text/css">
/* Mobile-specific Styles */

/* Client-specific Styles */
#outlook a { padding: 0; }	/* Force Outlook to provide a "view in browser" button. */
body { width: 100% !important; }
.ReadMsgBody { width: 100%; }
.ExternalClass { width: 100%; display:block !important; } /* Force Hotmail to display emails at full width */
/* Reset Styles */
/* Add 100px so mobile switch bar doesn't cover street address. */
body { background-color: #ececec; margin: 0; padding: 0; }
img { outline: none; text-decoration: none; display: block;}
br, strong br, b br, em br, i br { line-height:100%; }
h1, h2, h3, h4, h5, h6 { line-height: 100% !important; -webkit-font-smoothing: antialiased; }
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { color: blue !important; }
h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active {	color: red !important; }
/* Preferably not the same color as the normal header link color.  There is limited support for psuedo classes in email clients, this was added just for good measure. */
h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited { color: purple !important; }
/* Preferably not the same color as the normal header link color. There is limited support for psuedo classes in email clients, this was added just for good measure. */  
table td, table tr { border-collapse: collapse; }
.yshortcuts, .yshortcuts a, .yshortcuts a:link,.yshortcuts a:visited, .yshortcuts a:hover, .yshortcuts a span {
color: black; text-decoration: none !important; border-bottom: none !important; background: none !important;
}	/* Body text color for the New Yahoo.  This example sets the font of Yahoo's Shortcuts to black. */
/* This most probably won't work in all email clients. Don't include code blocks in email. */
code {
  white-space: normal;
  word-break: break-all;
}
#background-table { background-color: #ececec; }
/* Webkit Elements */
#top-bar { border-radius:6px 6px 0px 0px; -moz-border-radius: 6px 6px 0px 0px; -webkit-border-radius:6px 6px 0px 0px; -webkit-font-smoothing: antialiased; background-color: #043948; color: #e7cba3; }
#top-bar a { font-weight: bold; color: #e7cba3; text-decoration: none;}
#footer { border-radius:0px 0px 6px 6px; -moz-border-radius: 0px 0px 6px 6px; -webkit-border-radius:0px 0px 6px 6px; -webkit-font-smoothing: antialiased; }
/* Fonts and Content */
body, td { font-family: HelveticaNeue, sans-serif; }
.header-content, .footer-content-left, .footer-content-right { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }
/* Prevent Webkit and Windows Mobile platforms from changing default font sizes on header and footer. */
.header-content { font-size: 12px; color: #e7cba3; }
.header-content a { font-weight: bold; color: #e7cba3; text-decoration: none; }
#headline p { color: #ffffff; font-family: HelveticaNeue, sans-serif; font-size: 36px; text-align: left; margin-top:0px; margin-bottom:30px; }
#headline p a { color: #ffffff; text-decoration: none; }
.article-title { font-size: 18px; line-height:24px; color: #1b82c2; font-weight:bold; margin-top:0px; margin-bottom:18px; font-family: HelveticaNeue, sans-serif; }
.article-title a { color: #1b82c2; text-decoration: none; }
.article-title.with-meta {margin-bottom: 0;}
.article-meta { font-size: 13px; line-height: 20px; color: #ccc; font-weight: bold; margin-top: 0;}
.article-content { font-size: 13px; line-height: 18px; color: #444444; margin-top: 0px; margin-bottom: 18px; font-family: HelveticaNeue, sans-serif; }
.article-content a { color: #00707b; font-weight:bold; text-decoration:none; }
.article-content img { max-width: 100% }
.article-content ol, .article-content ul { margin-top:0px; margin-bottom:18px; margin-left:19px; padding:0; }
.article-content li { font-size: 13px; line-height: 18px; color: #444444; }
.article-content li a { color: #00707b; text-decoration:underline; }
.article-content p {margin-bottom: 15px;}
.footer-content-left { font-size: 12px; line-height: 15px; color: #ffffff; margin-top: 0px; margin-bottom: 15px; }
.footer-content-left a { color: #ffffff; font-weight: bold; text-decoration: none; }
.footer-content-right { font-size: 11px; line-height: 16px; color: #ffffff; margin-top: 0px; margin-bottom: 15px; }
.footer-content-right a { color: #ffffff; font-weight: bold; text-decoration: none; }
#footer { background-color: #1b82c2; color: #ffffff; }
#footer a { color: #ffffff; text-decoration: none; font-weight: bold; }
#permission-reminder { white-space: normal; }
#street-address { color: #e7cba3; white-space: normal; }
</style>
<table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table">
	<tbody><tr>
		<td align="center" bgcolor="#ececec">
        	<table class="w640" style="margin:0 10px;" width="640" cellpadding="0" cellspacing="0" border="0">
            	<tbody><tr><td class="w640" width="640" height="20"></td></tr>
                
            	<tr>
                	<td class="w640" width="640">
                        <table id="top-bar" class="w640" width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#1b82c2" style="
    border-radius: 6px 6px 0px 0px;  -moz-border-radius: 6px 6px 0px 0px;  -webkit-border-radius: 6px 6px 0px 0px;  -webkit-font-smoothing: antialiased;  background-color: #043948;  color: #e7cba3;
">
    <tbody><tr style="
    -webkit-font-smoothing: antialiased;  color: #e7cba3;
">
        <td class="w15" width="15"></td>
        <td class="w325" width="350" valign="middle" align="left">
            <table class="w325" width="350" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr><td class="w325" width="350" height="8"></td></tr>
            </tbody></table>
            <div class="header-content" style="
    font-size: 12px;  color: #e7cba3;
"><a href="http://preview.createsend1.com/t/d-e-l-l-r/" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;
">Web Version</a><span class="hide">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; <a href="http://preview.createsend1.com/t/d-u-l-l-j/" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;
">Unsubscribe</a></span></div>
            <table class="w325" width="350" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr><td class="w325" width="350" height="8"></td></tr>
            </tbody></table>
        </td>
        <td class="w30" width="30"></td>
        <td class="w255" width="255" valign="middle" align="right">
            <table class="w255" width="255" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr><td class="w255" width="255" height="8"></td></tr>
            </tbody></table>
            <table cellpadding="0" cellspacing="0" border="0">
    <tbody><tr>
        
        <td valign="middle"><a href="http://preview.createsend1.com/t/d-fb-l-l-t/" rel="cs_facebox"><img src="http://dellmatchlab.com/email/index_files/like-glyph.png" border="0" width="8" height="14" alt="Facebook icon" =""=""></a></td>
        <td width="3"></td>
        <td valign="middle"><div class="header-content" style="
    font-size: 12px;  color: #e7cba3;
"><a href="http://preview.createsend1.com/t/d-fb-l-l-i/" rel="cs_facebox" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;  font-size: 12px;
">Facebook</a></div></td>
        
        
        <td class="w10" width="10"></td>
        <td valign="middle"><a href="http://preview.createsend1.com/t/d-tw-l-l-d/"><img src="http://dellmatchlab.com/email/index_files/tweet-glyph.png" border="0" width="17" height="13" alt="Twitter icon" =""=""></a></td>
        <td width="3"></td>
        <td valign="middle"><div class="header-content" style="
    font-size: 12px;  color: #e7cba3;
"><a href="http://preview.createsend1.com/t/d-tw-l-l-h/" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;  font-size: 12px;
">Twitter</a></div></td>
        
        
        <td class="w10" width="10"></td>
        <td valign="middle"><a href="http://client.forwardtomyfriend.com/d-puti-Preview-k" lang="en" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;
"><img src="http://dellmatchlab.com/email/index_files/forward-glyph.png" border="0" width="19" height="14" alt="Forward icon" =""=""></a></td>
        <td width="3"></td>
        <td valign="middle"><div class="header-content"><a href="http://client.forwardtomyfriend.com/d-puti-Preview-u" lang="en" style="
    font-weight: bold;  color: #e7cba3;  text-decoration: none;  font-size: 12px;
">Forward</a></div></td>
        
    </tr>
</tbody></table>
            <table class="w255" width="255" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr><td class="w255" width="255" height="8"></td></tr>
            </tbody></table>
        </td>
        <td class="w15" width="15"></td>
    </tr>
</tbody></table>
                        
                    </td>
                </tr>
                <tr>
                <td id="header" class="w640" width="640" align="center" bgcolor="#1b82c2">
    
    <table class="w640" width="640" cellpadding="0" cellspacing="0" border="0">
        <tbody><tr><td class="w30" width="30"></td><td class="w580" width="580" height="30"></td><td class="w30" width="30"></td></tr>
        <tr>
            <td class="w30" width="30"></td>
            <td class="w580" width="580">
                <div align="center"  style="
    text-align: -webkit-center;
">
                  
                    	<img src="http://dellmatchlab.com/images/logo.png" style="float:left; margin-right:12px;margin-top: -5px;">
                       <div style="float: left;
text-align: left;
width: 316px;">
                        <strong style="
    font-weight: bold;
    color: #ffffff;  font-family: HelveticaNeue, sans-serif;  font-size: 36px;  text-align: left;
">The Match Lab </strong>
<p style="padding: 0;
margin: 0;
padding-left: 8px;
color: white;
font-size: 12px;">Meet your perfect match from the Dell family of products</p>
</div>
<img src="http://dellmatchlab.com/images/logo_icon.png" style="float: left;
margin-left: -47px;
margin-top: 7px;">

                   
                </div>
                <div style="clear:both; width:100%; height:24px;"></div>
            </td>
            <td class="w30" width="30"></td>
        </tr>
    </tbody></table>
    
    
</td>
                </tr>
                
                <tr>
                 <td class="w640" width="640" height="30" bgcolor="#ffffff">
                 	<h1 style="padding-left: 27px;
margin-top: 18px;
color: #1b82c2;
font-size: 18px;

padding-bottom: 20px;">Hi <?=$data->userName;?><br />
			<span style="color: #888;
font-weight: normal;
font-size: 12px;">
                 	<p>Thank you for using The Match Lab.
                    Following products from the Dell family make a perfect match for your preferences. Please feel free to explore these or try new matches at <a href="http://dellmatchlab.com/">The Match Lab.</a><br />
                    	
                 	 <!--<br />
<strong>(Product Details)</strong><br />
                 	 This machine(s) has been selected after careful evaluation  of your purpose of use. Now you can buy it at the most competitive price tag  from the following authorized resellers near you:<br />
                 	 <br />-->
<!--<strong>(Reseller Details)</strong><br />
                 	 Here at DELL, we strive to notch up the user experience and  customer care. Your valuable feedback in this regards will be much appreciated. <br />
                 	 Happy Shopping!</p><br />-->

                    <!--<p><strong>DELL Pakistan</strong></p>-->
                  </span>  
                    </h1>

                 </td></tr>
                <tr id="simple-content-row"><td class="w640" width="640" bgcolor="#ffffff">
    <table class="w640" width="640" cellpadding="0" cellspacing="0" border="0">
        <tbody>
        	
        <tr>
            <td class="w30" width="30">
            	
           </td>
            <td class="w580" width="580">
                <repeater > 
                    <layout label="Image gallery">
                        <table class="w580" width="580" cellpadding="0" cellspacing="0" border="0">
                            <tbody><tr>
                            <? $i = 1; foreach($data->data as $key=>$values){
								
									
								?>
                                <td valign="top" style="border-right:1px solid #F4F4F4;border-left:1px solid  #F4F4F4;"  align="center">
                                    <table class="w180"  cellpadding="0" cellspacing="0" border="0" >
                                        <tbody><tr>
                                        <? $imges = json_decode($values->image);?>
                                        <? foreach($imges as $vt){
											if($vt->defaults == 'true'){ ?>
											
                                            <td class="w180" width="180"><img label="Image" class="w180" width="180" border="0" src="http://dellmatchlab.com/admin/<?=urldecode($vt->img);?>" ></td>
                                        	<? } } ?>
                                        </tr>
                                        <tr><td class="w180" width="180" height="10"></td></tr>
                                        <tr>
                                            <td class="w180" width="180">
                                            <h2 style="color: #1b82c2;font-size: 18px;"><?=$values->name;?></h2>
                                                <div align="left" class="article-content">
                                                 <p  style="color:##747474;"> <?=$values->shortDesp;?> </p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr><td class="w180" width="180" height="10"></td></tr>
                                    </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                             	<? if($i % 3 == 0){ ?>
                                	</tr>
                                    
                                    <tr>
                                
							 <? }$i++;  }?>
                             
                             
                               
                            </tr>
                        </tbody></table>
                    </layout>
                </repeater>
            </td>
            <td class="w30" width="30"></td>
        </tr>
    </tbody></table>
</td></tr>
                <tr><td class="w640" width="640" height="15" bgcolor="#ffffff"></td></tr>
                
                <tr>
                <td class="w640" width="640">
    <table id="footer" class="w640" width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#1b82c2">
        <tbody><tr><td class="w30" width="30"></td><td class="w580 h0" width="360" height="30"></td><td class="w0" width="60"></td><td class="w0" width="160"></td><td class="w30" width="30"></td></tr>
        <tr>
            <td class="w30" width="30"></td>
            <td class="w580" width="360" valign="top">
            <span class="hide">
            <p id="permission-reminder" align="left" class="footer-content-left" style="
    font-size: 12px;  line-height: 15px;  color: #ffffff;  margin-top: 0px;  margin-bottom: 15px;
"><span style="
    font-size: 12px;  line-height: 15px;  color: #ffffff;
">All rights reserved</span>.</p></span>
            <p align="left" class="footer-content-left" style="
    font-size: 12px;  line-height: 15px;  color: #ffffff;  margin-top: 0px;  margin-bottom: 15px;
"><a href="http://client.updatemyprofile.com/d-l-2AD73FFF-l-o" lang="en" style="
    color: #ffffff;  text-decoration: none;  font-weight: bold;
">Edit your subscription</a> | <a href="http://preview.createsend1.com/t/d-u-l-l-b/" style="
    color: #ffffff;  text-decoration: none;  font-weight: bold;
">Unsubscribe</a></p>
            </td>
            <td class="hide w0" width="60"></td>
            <td class="hide w0" width="160" valign="top">
            <p id="street-address" align="right" class="footer-content-right" style="
    color: #e7cba3;  white-space: normal;
"><span style="
    color: #e7cba3;  white-space: normal;
    font-size: 11px;  line-height: 16px;
">Coypright © Dell </span></p>
            </td>
            <td class="w30" width="30"></td>
        </tr>
        <tr><td class="w30" width="30"></td><td class="w580 h0" width="360" height="15"></td><td class="w0" width="60"></td><td class="w0" width="160"></td><td class="w30" width="30"></td></tr>
    </tbody></table>
</td>
                </tr>
                <tr><td class="w640" width="640" height="60"></td></tr>
            </tbody></table>
        </td>
	</tr>
</tbody></table>