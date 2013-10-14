var cityNameArray = new Array();
var cinemaNameArray = new Array();
var AppId = '';
var AppURL = '';
var statusProd = new Array();
statusProd[0] = "In-active";
statusProd[1] = "Active";
function GetApp(){
	/*$(document.body).on('click', '#addProduct', function() {
			//$('#cityName').html('');
			//$('#cityId').val('');
			$('#myModal').modal();
		});
	return true;*/
	$.getJSON('../app.json', function(data) {
		AppId = data.id;
		AppURL = data.url;
		StartApp();
	});
}
function StartApp(){	
	var client = new WindowsAzure.MobileServiceClient(AppURL, AppId),
		ProductTable = client.getTable('product');
		if(localStorage.getItem('userId')){
			client.currentUser = {};
			client.currentUser.userId = localStorage.getItem('userId');
			client.currentUser.mobileServiceAuthenticationToken = localStorage.getItem('mobileServiceAuthenticationToken');
			$('.adminName').html(localStorage.getItem('userName'));
		}else{
			top.location.href = 'login.html';
		}
		
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
		function createHtmlForProduct(){
			var query = ProductTable.where({});
		  /*var query = todoItemTable.where(function(dated){
											return this.id <= dated
											},2);*/
			
			query.read().then(function(todoItems) {
				var listItems = $.map(todoItems, function(item) {
					
						var html='';
							html +='<tr class="panel panel-default" data-id="'+item.id+'">';
							html +='<td> '+item.id+'</td>';
							html +='<td> '+item.catagory+'</td>';
							html +='<td> '+item.name+'</td>';
							html +='<td> '+item.start_price+'</td>';
							html +='<td> '+statusProd[item.status]+'</td>';							
							html +="<td><span class='col-lg-1'><span class='glyphicon glyphicon-edit edit' data-id='"+item.id+"' data-catagory='"+item.catagory+"' data-name='"+item.name+"' data-short_description='"+item.short_description+"' data-start_price='"+item.start_price+"' data-video_url='"+item.video_url+"' data-status='"+item.status+"' data-product_specifications='"+item.product_specifications+"' data-product_images='"+item.product_images+"' data-Product_3dimages='"+item.product_3dimages+"'></span></span><span class='col-lg-1'><span class='delete glyphicon glyphicon-remove-circle' data-id='"+item.id+"'></span></span></td>";
							html +='</tr>';
							console.log(item.product_specifications);
						return  $(html)														
				});
				 $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
				 $('.preLoader').hide();
			
			}, handleError);
    
		}
		createHtmlForProduct()
		//end createHtmlForMovies
		// event listener
		
		
		$(document.body).on('click', '.edit', function() {
			$('#cityId').val($(this).attr('data-id'));
			$('#cityName').val($(this).attr('data-name'));
			$('#catagory').val($(this).attr('data-catagory'));
			$('#name').val($(this).attr('data-name'));
			$('#short_description').val($(this).attr('data-short_description'));
			$('#start_price').val($(this).attr('data-start_price'));
			$('#video_url').val($(this).attr('data-video_url'));
			$('#status').val($(this).attr('data-status'));
			$('#tablesSpec .panel-body').html('');
			var ProdImg = JSON.parse($(this).attr('data-product_images'));
			$('#ProductImages').html('');
			$.each(ProdImg,function(index,item){
				 appendImagefile(item.img,'#ProductImages',item.defaults,'');
			});
			var Prod3dImg = JSON.parse($(this).attr('data-product_3dimages'));
			$('#3dImages').html('');
			$.each(Prod3dImg,function(index,item){
				 appendImagefile(item.img,'#3dImages','','');
			});
			var ProdSpecification = JSON.parse($(this).attr('data-product_specifications'));
			$.each(ProdSpecification,function(index,item){
				 createOtherSpec(item.label,item.value);
			});
			/*$('#product_images = JSON.stringify(proImgs);
			$('#product_specifications = JSON.stringify(Specification);
			$('#product_3dimages = JSON.stringify(ThreeDImgs);*/
			
			
			$('#productId').val($(this).attr('data-id'));
			$('#myModal').modal();
		});
		
		$(document.body).on('click', '.delete', function() {
			if($(this).attr('data-id')){
			var result = confirm("You are about to delete this item, all associated data will de deleted. Click OK to continue.");
			if (result==true) {
				$('.preLoader').show();
			ProductTable.del({ id: $(this).attr('data-id') }).then(createHtmlForProduct, handleError).done(function(){
				$('.preLoader').hide();
			});
			}}
		});
		$(document.body).on('click', '#addProduct', function() {
			$('#cityName').html('');
			$('#cityId').val('');
			$('#myModal').modal();
		});
		
		$('#add-item').on('submit',function(event) {
			event.preventDefault();
			$('.preLoader').show();
			
			//var ProductImages = $('#ProductImages').val();
			var proImgs= {};
			var i = 0;
			$('#ProductImages').find('.thumbnail').each(function(index, element) {
				proImgs[i] = {};
                proImgs[i]['img'] = $(this).children('img').attr('src');
				proImgs[i]['defaults'] = $(this).children('.caption').children('.pull-left').children('.glyphicon-star-empty').hasClass('greenYellow');
            	i++;
			});
			var ThreeDImgs= {};
			var i = 0;
			$('#3dImages').find('.thumbnail').each(function(index, element) {
                ThreeDImgs[i] = {};
                ThreeDImgs[i]['img'] = $(this).children('img').attr('src');
				//ThreeDImgs[i]['default'] = $(this).children('.caption').children('.pull-left').children('.glyphicon-star-empty').hasClass('.greenYellow');
            	i++;
            });
			//var specification = $('#specification').val();
			var Specification= {};
			var i = 0;
			$('#tablesSpec .panel-body').find('.form-group').each(function(index, element) {
                Specification[i] = {};
                Specification[i]['label'] = $(this).children('.specificationLabel').html();
				Specification[i]['value'] = $(this).children('.col-lg-9').children('.specification').val();
				//ThreeDImgs[i]['default'] = $(this).children('.caption').children('.pull-left').children('.glyphicon-star-empty').hasClass('.greenYellow');
            	i++;
            });
			//console.log(proImgs);
			//console.log(ThreeDImgs);
			//console.log(Specification);
			//return true;
			//var tdImages = $('#3dImages').val();
			var catagory = $('#catagory').val();
			var name = $('#name').val();
			var short_description = $('#short_description').val();
			var start_price = $('#start_price').val();
			var video_url = $('#video_url').val();
			var status = $('#status').val();
			var product_images = JSON.stringify(proImgs);
			var product_specifications = JSON.stringify(Specification);
			var product_3dimages = JSON.stringify(ThreeDImgs);
			console.log(Specification);
			console.log(product_specifications);
				if($('#productId').val() == ''){
						var theNewRow = {
							catagory: catagory,
							name: name,
							short_description: short_description,
							start_price: start_price,
							video_url: video_url,
							status: status,
							product_images: product_images,
							product_specifications: product_specifications,
							product_3dimages: product_3dimages													
						};
						ProductTable.insert(theNewRow).then(createHtmlForProduct, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.preLoader').hide();
						});
				}else{
						var theNewRow = {
							id: parseInt($('#productId').val()),
							catagory: catagory,
							name: name,
							short_description: short_description,
							start_price: start_price,
							video_url: video_url,
							status: status,
							product_images: product_images,
							product_specifications: product_specifications,
							product_3dimages: product_3dimages	
						};
						ProductTable.update(theNewRow).then(createHtmlForProduct, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.preLoader').hide();
						});
				}							
		
    });
	function appendImagefile(file,place,defaults,source){
		var imageHtml = '';
					 imageHtml += '<div class="col-lg-3">';
                     imageHtml += '<div class="thumbnail">';
					 if(source == 'upload'){
                    	 imageHtml += '<img class="img-responsive" src="server/php/files/'+file+'" alt="">';
					 }else{
						 imageHtml += '<img class="img-responsive" src="'+file+'" alt="">';

					 }
                     imageHtml += '<div class="caption">';
                     imageHtml += '<div class="pull-right hidden-sm"> ';
                     imageHtml += '<span class="glyphicon glyphicon-trash delImage"></span>';
                     imageHtml += '</div>';
                     imageHtml += '<div class="pull-left hidden-sm"> ';
					 if(defaults != '' && defaults == 'true'){
                    	 imageHtml += '<span class="glyphicon glyphicon-star-empty default greenYellow"></span>';
					 }else{
					 	imageHtml += '<span class="glyphicon glyphicon-star-empty default"></span>';
					 }
                     imageHtml += '</div>';
                     imageHtml += '<div class="clearfix"></div>';
                     imageHtml += '</div>';
                     imageHtml += '</div>';
                     imageHtml += '</div>';
					 $(place).append(imageHtml);
					 refreshClick();
	}
	$(function () {
		'use strict';
		// Change this to the location of your server-side upload handler:
		var url = 'server/php/';
		$('#fileupload3d').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$.each(data.result.files, function (index, file) {
					appendImagefile(file.name,'#3dImages','','upload');
					$('#progress3d .progress-bar').css('width','0%');
					$('#progress3d .progress-bar').css('width','0%');
					$('#progress3d').hide();
				});
			},
			progressall: function (e, data) {
				$('#progress3d').show();
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress3d .progress-bar').css(
					'width',
					progress + '%'
				);
			}
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
			
			
		$('#fileuploadProduct').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$.each(data.result.files, function (index, file) {
					appendImagefile(file.name,'#ProductImages','','upload');
					$('#progressProduct .progress-bar').css('width','0%');
					$('#progressProduct .progress-bar').css('width','0%');
					$('#progressProduct').hide();
				});
			},
			progressall: function (e, data) {
				$('#progressProduct').show();
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progressProduct .progress-bar').css(
					'width',
					progress + '%'
				);
			}
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
			
			$("#3dImages").sortable();
			
			
			/*$('#3dImages .glyphicon-star-empty').on('click',function(){
				
			});*/
			refreshClick();
			$('.addOtherSpec').on('click',function(){
				createOtherSpec('','');
			});
			
	});
	function createOtherSpec(label,value){
		var html = '';
		if(label == ''){
				html += '<div  class="form-group has-success"><label for="inputEmail" class="col-lg-3 specificationLabel control-label" contenteditable="true">Click to edit</label>';
		}else{
				html += '<div  class="form-group has-success"><label for="inputEmail" class="col-lg-3 specificationLabel control-label" contenteditable="true">'+label+'</label>';
		}
				html += '<div class="col-lg-9">';
		if(value == ''){
                html += '<input type="text" class="form-control specification">';
		}else{
                html += '<input type="text" value="'+value+'" class="form-control specification">';
		}
				html += '<i class="glyphicon glyphicon-trash delSpec"></i>';
                html += '</div></div>';
				$('#tablesSpec').children('.panel-body').append(html);
				//$(html).insertBefore('#tablesSpec .panel-body .well');
				refreshClick();
	}
		// end event listener
	function refreshClick(){
		$('.delImage').on('click',function(){
				//alert(1);
				$(this).parent().parent().parent().parent().remove();
		});
		$('.default').on('click',function(){
				//alert(1);
				$('.default').removeClass('greenYellow');
				$(this).addClass('greenYellow');
		});
		$('.delSpec').on('click',function(){
				//alert(1);
				$(this).parent().parent().remove();
		});
		$('.control-label').on('click',function(){
				if($(this).text() == 'Click to edit'){
					$(this).text('');
				}
		});
	}
		
}

