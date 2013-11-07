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
		function createCountriesHtml(){
			var query = CountryAttributeTable.where({}).take(1000);
			query.read().then(function(todoItems) {
				 $.each(todoItems, function(index,item) {
						var html='';	
							html +='<div class="col-sm-4" align="center">';
							html +='<div class="country countrySelect" data-id="'+item.id+'" data-name="'+item.name+'"><h4 class="countryButton '+item.name+'">'+item.name+'</h4></div>';
							html +='</div>';
							$('.CountryList').append(html);												
				});
			}, handleError).done(function(){
				//buttonClicks();
				$('.preLoader').hide();
			});
		}
		createCountriesHtml();
		// createHtmlForMovies
		function createHtmlForProducts(){			
			$('.preLoader').show();			
			var query = ProductMappingTable.where({}).take(1000);
			query.read().then(function(todoItems) {
				ProductMapping = todoItems;
				$.each(todoItems, function(index,item) {
					//console.log(item);
					$.each(dataAttributes, function(indexs,items) {
						if(indexs != 'country'){
							if(items == item.product_attribute){
								if(ProductIds[item.product_id]){
									ProductIds[item.product_id] = ProductIds[item.product_id]+ 1;
								}else{
									ProductIds[item.product_id] = 1;
								}
							}
						}
																			
					});
																		
				});
				
				//console.log(ProductIds);
				 
			
			}, handleError).then(function(){
					var query = CountryMappingTable.where({}).take(1000);
					query.read().then(function(todoItems) {
						CountryMapping = todoItems;
						$.each(todoItems, function(index,item) {
							//console.log(item);
							$.each(dataAttributes, function(indexs,items) {
								if(indexs == 'country'){
									if(items == item.country_attribute){
										if(ProductIds[item.product_id]){
											ProductIds[item.product_id] = ProductIds[item.product_id]+ 1;
										}else{
											ProductIds[item.product_id] = 1;
										}
									}
								}
																					
							});
																				
						});						 
					
					}, handleError).then(function(){
								var query = ProductTable.where({}).take(1000);
								query.read().then(function(todoItems) {
									productList = todoItems;
									//console.log($.param( productList ));
									createProdMatch(1);					 
								
								}, handleError).done(function(){
									$('.preLoader').hide();
									$('.prodLt').show();
									$('.leftPos2').fadeOut();
									translate('.screen-5','-220%');
									$('.screen-6').css('height','auto');
									$('.screen-6').css('overflow','auto');
									translate('.screen-6','0%');
									$("html, body").animate({ scrollTop: "0" });
									//buttonClicks();
								});
						
					});
			});
			
			
    
		}
		
		
		function createHtmlForProductsAfterChange(){
			ProductIds = {};
			$('.prodListings').html('');
				$.each(ProductMapping, function(index,item) {
					//console.log(item);
					$.each(dataAttributes, function(indexs,items) {
						if(indexs != 'country'){
							if(items == item.product_attribute){
								if(ProductIds[item.product_id]){
									ProductIds[item.product_id] = ProductIds[item.product_id]+ 1;
								}else{
									ProductIds[item.product_id] = 1;
								}
							}
						}
																			
					});
																		
				});
			
				$.each(CountryMapping, function(index,item) {
							//console.log(item);
							$.each(dataAttributes, function(indexs,items) {
								if(indexs == 'country'){
									if(items == item.country_attribute){
										if(ProductIds[item.product_id]){
											ProductIds[item.product_id] = ProductIds[item.product_id]+ 1;
										}else{
											ProductIds[item.product_id] = 1;
										}
									}
								}
																					
							});
																				
						});
						createProdMatch(0);	
						//buttonClicks();
    
		}
		
		//end createHtmlForMovies
		// event listener
		
		
		
		////
		$("html, body").animate({ scrollTop: "0" });
	
	
	
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
	
	
	
	function buttonClicks(){
		$(document.body).on('click', '.start_button', function() {
			translate('.mainBg,footer','-100%');
			$('.screen-1').css('height','auto');
			$('.screen-1').css('overflow','auto');
			translate('.screen-1','0%');
			setTimeout("$('.leftPos2').fadeIn();$('.mainBg,footer').remove();",1000);
			$("html, body").animate({ scrollTop: "0" });
		});
		$(document.body).on('click', '.showMatched', function() {
			dataAttributes['usage'] =  $('#usage').val();
			dataAttributes['usageDetail'] =   $('#usageDetial').val();
			dataAttributes['mobility'] =   $('#mobility').val();
			console.log(dataAttributes);
			createHtmlForProductsAfterChange();			
		});
		$('.formSubmit').on('click',function(){
			/**/
		});
		$(document.body).on('click', '.countrySelect', function() {
			dataAttributes['country'] = $(this).attr('data-id');
			$('.countryName').html($(this).attr('data-name'));
			translate('.screen-2','-220%');
			$('.screen-3').css('height','auto');
			$('.screen-3').css('overflow','auto');
			translate('.screen-3','0%');
			setTimeout('swapClass("st1","st2");',1000);
			$("html, body").animate({ scrollTop: "0" });
			var theNewRow = {
								id: parseInt(UserId),
								country: $(this).attr('data-name'),
								country_id: $(this).attr('data-id')										
							};
			ClientTable.update(theNewRow);
		});
		$(document.body).on('click', '.usageSelect', function() {
			dataAttributes['usage'] = $(this).attr('data-id');
			if(dataAttributes['usage'] == '4'){
				$('.workScreen').show();
				$('.playScreen').hide();
				$('.bothScreen').hide();
				var Options = '';
				Options += '<option value="7">Work Low</option>';
				Options += '<option value="8">Work High</option>';
				$('#usageDetial').html(Options);
			}
			if(dataAttributes['usage'] == '5'){
				$('.workScreen').hide();
				$('.playScreen').show();
				$('.bothScreen').hide();
				var Options = '';
				Options += '<option value="9">Play Low</option>';
				Options += ' <option value="10">Play High</option>';
				
				$('#usageDetial').html(Options);
			}
			if(dataAttributes['usage'] == '6'){
				$('.workScreen').hide();
				$('.playScreen').hide();
				$('.bothScreen').show();
				var Options = '';
				Options += ' <option value="11">Both Low</option>';
				Options += ' <option value="12">Both High</option>';
				$('#usageDetial').html(Options);
			}
			$('#usage').val(dataAttributes['usage']);
			translate('.screen-3','-220%');
			$('.screen-4').css('height','auto');
			$('.screen-4').css('overflow','auto');
			translate('.screen-4','0%');
			setTimeout('swapClass("st2","st3");',1000);
			$("html, body").animate({ scrollTop: "0" });
		});
		$(document.body).on('click', '.BkButton', function() {
			if($(this).attr('data-id') == 1){
				translate('.screen-3','220%');
				$('.screen-3').css('height','auto');
				$('.screen-3').css('overflow','auto');
				translate('.screen-2','0%');
				setTimeout('swapClass("st2","st1");',1000);
				$("html, body").animate({ scrollTop: "0" });
			}
			if($(this).attr('data-id') == 2){
				translate('.screen-4','220%');
				$('.screen-4').css('height','auto');
				$('.screen-4').css('overflow','auto');
				translate('.screen-3','0%');
				setTimeout('swapClass("st3","st2");',1000);
				$("html, body").animate({ scrollTop: "0" });
			}
			if($(this).attr('data-id') == 3){
				translate('.screen-5','220%');
				$('.screen-5').css('height','auto');
				$('.screen-5').css('overflow','auto');
				translate('.screen-4','0%');
				setTimeout('swapClass("st4","st3");',1000);
				$("html, body").animate({ scrollTop: "0" });
			}
		});
		$(document.body).on('click', '.usage_detailSelect', function() {
	
			dataAttributes['usageDetail'] = $(this).attr('data-id');
			$('#usageDetial').val(dataAttributes['usageDetail']);
			translate('.screen-4','-220%');
			$('.screen-5').css('height','auto');
			$('.screen-5').css('overflow','auto');
			translate('.screen-5','0%');
			setTimeout('swapClass("st3","st4");',1000);
			$("html, body").animate({ scrollTop: "0" });
		});
		
		$(document.body).on('click', '.mobilitySelect', function() {
		
			dataAttributes['mobility'] = $(this).attr('data-id');
			$('#mobility').val(dataAttributes['mobility']);
			createHtmlForProducts();
			//console.log(dataAttributes);
		});
		$(document.body).on('click', '.completeSelect', function() {
		
		translate('.screen-6','-220%');
		$('.screen-7').css('height','auto');
		$('.screen-7').css('overflow','auto');
		translate('.screen-7','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
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
	$(document.body).on('change', '#usage', function() {
	
			if($(this).val() == '4'){
					var Options = '';
					Options += '<option value="7">Work Low</option>';
					Options += '<option value="8">Work High</option>';
					$('#usageDetial').html(Options);
			}
			if($(this).val() == '5'){
				var Options = '';
				Options += '<option value="9">Play Low</option>';
				Options += ' <option value="10">Play High</option>';
				
				$('#usageDetial').html(Options);
			}
			if($(this).val() == '6'){
				var Options = '';
				Options += ' <option value="11">Both Low</option>';
				Options += ' <option value="12">Both High</option>';
				$('#usageDetial').html(Options);
			}
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
	
	
	//form action
	$(document.body).on('submit', '#add-item', function(event) {
	
			event.preventDefault();
			$('.preLoader').show();
			var name = $('#userName').val();
			var email = $('#userEmail').val();
			
			var theNewRow = {
				name: name,
				email: email,
				country: '',
				country_id: '',
				dated: Date(),				
			};
			ClientTable.insert(theNewRow).then(getUserInfo, handleError).then(function(){
							$('.preLoader').hide();
			});   
			
			
    });
	
	function getUserInfo(data){
			UserId = data.id;
			UserEmail =  data.email;
			$('.userName').html(data.name);
			translate('.screen-1','-220%');
			$('.screen-2').css('height','auto');
			$('.screen-2').css('overflow','auto');
			translate('.screen-2','0%');
			$("html, body").animate({ scrollTop: "0" });
	}
	
	function productDetail(id,nav){
		//console.log(id);
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
			HtmlAppend += '<div class="col-lg-6">';
			HtmlAppend += '<button class="bkMatched"></button>';
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="col-lg-6">';
			HtmlAppend += '<button  class="completeProduct"></button>';
			HtmlAppend += '</div>';
			HtmlAppend += '<div class="clearfix"></div>';
			HtmlAppend += '</div>';
			HtmlAppend += '</div>  ';
			HtmlAppend += '<div class="clearfix"></div>	';
			HtmlAppend += '<div class="col-lg-12">';
			HtmlAppend += '<div class="col-lg-6">';
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

function sendEmail(){
	// Create the email object first, then add the properties.
	$.ajax({
                  type: "GET",
                  url: "email.php",
                  data: "data="+encodeURI(JSON.stringify(ProductDataToEmail)),
                  success: function(msg){
					$('.preLoaderEmail img').hide();
                  	$('.preLoaderEmail h4').html('Email Sent');
					setTimeout("$('.preLoaderEmail').hide();$('.preLoaderEmail h4').html('Sending Email....');$('.preLoaderEmail img').show();",3000);
                  }
     });
}

