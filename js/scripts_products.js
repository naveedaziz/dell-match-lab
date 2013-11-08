var AppId = '';
var AppURL = '';
var UserId = 0;
var dataAttributes = {};
var ProductIds = {};
var counter = 1;
var productList = {};
var ProductMapping = {};
var CountryMapping = {};
var ClickedItem = '';
var ProductDataToEmail = {};
var UserEmail = '';
$('.ContentImg').css('min-height',$(window).height() / 1.67+'px');
function GetApp(){
	
	/*$(document.body).on('click', '#addCatagory', function() {
			//$('#cityName').html('');
			//$('#cityId').val('');
			$('#myModal').modal();
		});
	return true;*/
	$.getJSON('app.json', function(data) {
		AppId = data.id;
		AppURL = data.url;
		StartApp();
	});
}
function swapClass(hide,show){
		$('.'+hide).addClass('hideMe');
		$('.'+show).removeClass('hideMe');
	}
function StartApp(){
	var client = new WindowsAzure.MobileServiceClient(AppURL, AppId),
		ClientTable = client.getTable('clients');
		ProductTable = client.getTable('product');
		ProductMappingTable = client.getTable('product_mapping');
		CountryMappingTable = client.getTable('country_mapping');
		ClientMatchTable = client.getTable('client_match');
		CountryAttributeTable = client.getTable('country_attributes');
		
		
		// handle error
		function handleError(error) {
			if(error.message.indexOf('authentication') > 0){
				top.location.href = 'login.html';
			}else if(error.message.indexOf('connection') > 0){
				alert('Internet Connection failure, Please check your internet connection and then reload the page');
			}else{
				var text = error + (error.request+' : Please try again later.');
				alert(text);
			}
			//$('#errorlog').append($('<li>').text(text));
		}
		//end handle error
		
		// get city function
		
		
		//end get city function
	
		// createHtmlForMovies
		function createHtmlForProducts(){			
			$('.preLoader').show();		
								var query = ProductTable.where({}).take(1000);
								query.read().then(function(todoItems) {
									productList = todoItems;
									//console.log($.param( productList ));
									createProdMatch(1);					 
								
								}, handleError).done(function(){
									$('.preLoader').hide();
										var locations  = window.location.href;
										locations = locations.split('?id=');
										if(locations[1]){
											var prodId = locations[1];
										}else{
											var prodId = '';
										}
									if(prodId != ''){
										productDetail(prodId,2);
									}else{
										$('.screen-7').css('height','auto');
										$('.screen-7').css('overflow','auto');
										translate('.screen-7','0%');
										$("html, body").animate({ scrollTop: "0" });
									}
									//buttonClicks();
								});
		}
	function createProdMatch(dts){
		console.log(ProductIds);
		ProductDataToEmail = {};
		ProductDataToEmail['userName'] = $('.userName').html();
		ProductDataToEmail['userEmail'] = UserEmail;
		ProductDataToEmail['data']= {};
		$.each(productList, function(index,item) {
										//console.log(item);
										$.each(ProductIds, function(indexs,items) {
												if(items == 4 && indexs == item.id){
													ProductDataToEmail['data'][item.id] = {};
													ProductDataToEmail['data'][item.id]['name'] = item.name;
													ProductDataToEmail['data'][item.id]['shortDesp'] = item.short_description;
													ProductDataToEmail['data'][item.id]['image'] = item.product_images;
													
													var appendHtml = '';
													appendHtml += '<div class="col-sm-4">';
													appendHtml += '<div class="col-sm-12">';
													appendHtml += '<div class="bubble"  data-id="'+item.id+'">';
													appendHtml += '<h3>'+item.name+'</h3>';
													var disp = item.short_description;
													appendHtml += '<p>'+disp.substr(0,300)+'...</p>';
													//appendHtml += '<p>'+item.short_description+'</p>';
													appendHtml += '<button class="more_list"  data-id="'+item.id+'"></button>';
													appendHtml += '<div class="clearfix"></div>';
													appendHtml += '</div>';
													appendHtml += '</div> ';
													appendHtml += '<div class="col-sm-12">';
													var prodImage = JSON.parse(item.product_images);
													$.each(prodImage,function(id,itm){
														if(itm.defaults == true){
															appendHtml += '<img src="admin/'+itm.img+'"  data-id="'+item.id+'" width="100%;" class="prodImg">';
														}
													});
													appendHtml += '</div> ';
													appendHtml += '</div>';
													//console.log(appendHtml);
													$('.prodListings').append(appendHtml);
													
												}
										});
										if(dts == 1){
													var appendHtml = '';
													appendHtml += '<div class="col-lg-4">';
													appendHtml += '<div class="col-sm-12 prodThumb">';
													appendHtml += '<div class="col-lg-12">';
													var prodImage = JSON.parse(item.product_images);
													$.each(prodImage,function(id,itm){
														if(itm.defaults == true){
															appendHtml += '<img src="admin/'+itm.img+'"  data-id="'+item.id+'" width="100%;" class="prodImgInner">';
														}
													});
													appendHtml += '</div> ';
													appendHtml += '<div class="col-lg-12 prodDisp">';
													appendHtml += '<h1 data-id="'+item.id+'">'+item.name+'</h1>';
													var disp = item.short_description;
													appendHtml += '<p>'+disp.substr(0,300)+'...</p>';
													//appendHtml += '<p>'+item.short_description+'</p>';
													appendHtml += '<button class="more"  data-id="'+item.id+'"></button>';
													appendHtml += '<div class="clearfix"></div>';
													appendHtml += '</div> ';
													appendHtml += '</div>';
													appendHtml += '</div>';
													if(counter%3 == 0 && counter != 1){
														appendHtml += '<div class="clearProd"></div>';
													}
													$('.prodListingsAll').append(appendHtml);
													counter++;
										}
										
																							
									});
			
				
				var theNewRow = {
						data_attributes: JSON.stringify(dataAttributes),
						product_ids: JSON.stringify(ProductIds),
						user_id: UserId				
					};
					ClientMatchTable.insert(theNewRow);
					console.log($.param(ProductDataToEmail));
	}
	createHtmlForProducts();
	buttonClicks();	
	function translate(item,val){
		if(val == '0%'){
			$(item).css('height','auto');
			$(item).css('overflow','auto');
			$(item).css('display','block');
			$(item).removeClass('noMargin-padding');
			$(item).addClass('marginBottom');
		}
		if(val == '0%'){
			setTimeout(function(){
				$(item).css('-webkit-transform','translateX('+val+')');
				$(item).css('-ms-transform','translateX('+val+')');
				$(item).css('transform','translateX('+val+')');
			},700);
		}else{
				$(item).css('-webkit-transform','translateX('+val+')');
				$(item).css('-ms-transform','translateX('+val+')');
				$(item).css('transform','translateX('+val+')');
		}
		
		//console.log(val);
		if(val == '-220%' || val == '220%'){
			ClickedItem = item;
			setTimeout("$(ClickedItem).css('height','0');$(ClickedItem).css('overflow','hidden');$(ClickedItem).css('display','none');$(ClickedItem).addClass('noMargin-padding');$(ClickedItem).removeClass('marginBottom');",1000);
		}
	}	
	
	function buttonClicks(){
	$(document.body).on('click', '.backProducts', function() {
	
		translate('.screen-6','0%');
		translate('.screen-7','220%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$(document.body).on('click', '.prodImg', function() {
	
		productDetail($(this).attr('data-id'),1);
	});
	$(document.body).on('click', '.prodImgInner', function() {
		
		productDetail($(this).attr('data-id'),3);
	});
	$(document.body).on('click', '.more', function() {
	
		productDetail($(this).attr('data-id'),2);
	});
	$(document.body).on('click', '.more_list', function() {
	
		productDetail($(this).attr('data-id'),1);
	});
	$(document.body).on('click', '.bkMatched', function() {

		translate('.screen-6','0%');
		translate('.screen-8','220%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$(document.body).on('click', '.completeProduct', function() {

		translate('.screen-8','-220%');
		$('.screen-7').css('height','auto');
		$('.screen-7').css('overflow','auto');
		$('.screen-7').css('-webkit-transform','translateX(0%)');
		translate('.screen-7','0%');
		$("html, body").animate({ scrollTop: "0" });
		
	});
	$(document.body).on('click', '.sliderImgThumb', function() {
	
		$('.sliderImg').attr('src',$(this).attr('src'));		
	});
	$(document.body).on('click', '.emailMatches', function() {
			$('.preLoaderEmail').show();
			sendEmail();		
		});
	
	}
	
	
	function productDetail(id,nav){
	console.log(id);
		console.log(nav);
		$.each(productList,function(index,item){
			//console.log(item);
			if(item.id == id){
				var HtmlAppend = '';
			HtmlAppend += '<div class="col-lg-12 itemContainer">';
			HtmlAppend += '<div class="col-lg-6">';
			HtmlAppend += '<div class="col-lg-12">';
			var prodImage = JSON.parse(item.product_images);
			$.each(prodImage,function(id,itm){
				if(itm.defaults == true){
					HtmlAppend += '<img src="admin/'+itm.img+'"  data-id="'+item.id+'" width="100%;" class="sliderImg">';
				}
			});
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="col-lg-12">';
			var prodImage = JSON.parse(item.product_images);
			$.each(prodImage,function(id,itm){
				if(itm.defaults == true){
					HtmlAppend += '<img src="admin/'+itm.img+'" class="sliderImgThumb">';
				}
			});
			var prodImage = JSON.parse(item.product_images);
			$.each(prodImage,function(id,itm){
				if(itm.defaults != true){
					HtmlAppend += '<img src="admin/'+itm.img+'" class="sliderImgThumb">';
				}
			});
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			HtmlAppend += '</div> ';
			HtmlAppend += '<div class="col-lg-6 colorBlue ">';
			HtmlAppend += '<div class="col-lg-12">';
			HtmlAppend += '<h1>'+item.name+'</h1>';
			HtmlAppend += '<p>'+item.short_description+'</p>';
			HtmlAppend += '</div>';
		/*	HtmlAppend += '<div class="col-lg-4">';
			HtmlAppend += '<h4 class="price">$'+item.start_price+'</h4>';
			HtmlAppend += '</div>';*/
			/*HtmlAppend += '<div class="col-lg-12" align="right">';
			HtmlAppend += '<div class="fb">';
			HtmlAppend += '<p class="shareText">Share this product with your friends</p>>';
			HtmlAppend += '<div class="col-lg-4"><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdell-match-lab.azurewebsites.net%2Ffrontend%2F&amp;width&amp;height=21&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;send=false&amp;appId=645025702216038" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe></div>';
			HtmlAppend += '<div class="col-lg-4"><iframe allowtransparency="true" frameborder="0" scrolling="no"  src="https://platform.twitter.com/widgets/tweet_button.html" style="width:130px; height:20px;"></iframe></div>'	;
			HtmlAppend += '</div>';
			HtmlAppend += '</div>';*/
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '<div class="col-lg-12 borderTop">';
			HtmlAppend += '<div class="col-lg-12">';
			HtmlAppend += '<button  class="completeProduct"></button>';
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			HtmlAppend += '</div>  ';
			HtmlAppend += '<div class="clearfix"></div>	';
			HtmlAppend += '<div class="col-lg-12">';
			HtmlAppend += '<div class="col-lg-12">';
			HtmlAppend += '<h1 class="subHeading">Features</h1>';
			HtmlAppend += '<ul class="noPadding listing">';
			var ct = 1;
			var prdSpec = JSON.parse(item.product_specifications);
			$.each(prdSpec,function(ind,itm){
				if(ct % 2 == 0){
					var color = '';
				}else{
					var color = 'colored';
				}
				HtmlAppend += '<li class="'+color+'">';
				HtmlAppend += '<div class="col-sm-4">'+itm.label+'</div>';
				HtmlAppend += '<div class="col-sm-8">'+itm.value+'</div>';
				HtmlAppend += '<div class="clearfix"></div>';
				HtmlAppend += '</li>';
				ct++;
			});	
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</ul>';
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="col-lg-6">';
			/*HtmlAppend += '<iframe src="../frontend/js/slider.html" frameborder="0" allowtransparency="true"></iframe>';*/
			HtmlAppend += '</div> ';
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			$('.productDetail').html(HtmlAppend);
			if(nav == 2){
				translate('.screen-7','-220%');
				$('.screen-8').css('height','auto');
				$('.screen-8').css('overflow','auto');
				translate('.screen-8','0%');
				$("html, body").animate({ scrollTop: "0" });
			}else if(nav == 1){
				translate('.screen-6','-220%');
				$('.screen-8').css('height','auto');
				$('.screen-8').css('overflow','auto');
				translate('.screen-8','0%');
				$("html, body").animate({ scrollTop: "0" });
			}else{
				translate('.screen-7','-220%');
				$('.screen-8').css('height','auto');
				$('.screen-8').css('overflow','auto');
				translate('.screen-8','0%');
				$("html, body").animate({ scrollTop: "0" });
			}
			// buttonClicks();		
			}
		});
		
	}
	
		
}


