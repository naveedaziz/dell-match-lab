var cityNameArray = new Array();
var cinemaNameArray = new Array();
var AppId = '';
var AppURL = '';
var statusProd = new Array();
statusProd[0] = "In-active";
statusProd[1] = "Active";
function GetApp(){
	/*$(document.body).on('click', '#addCatagory', function() {
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
		CatagoryTable = client.getTable('catagory');
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
		function createHtmlForCatagory(){
			var query = CatagoryTable.where({});
		  /*var query = todoItemTable.where(function(dated){
											return this.id <= dated
											},2);*/
			
			query.read().then(function(todoItems) {
				var listItems = $.map(todoItems, function(item) {
					
						var html='';
							html +='<tr class="panel panel-default" data-id="'+item.id+'">';
							html +='<td> '+item.id+'</td>';
							html +='<td> '+item.name+'</td>';
							html +='<td> '+item.short_description+'</td>';
							html +='<td> '+statusProd[item.status]+'</td>';
							html +="<td><span class='col-lg-1'><span class='glyphicon glyphicon-edit edit' data-id='"+item.id+"'  data-name='"+item.name+"' data-short_description='"+item.short_description+"'  data-status='"+item.status+"'  data-catagory_images='"+item.catagory_images+"' ></span></span><span class='col-lg-1'><span class='delete glyphicon glyphicon-remove-circle' data-id='"+item.id+"'></span></span></td>";
							html +='</tr>';
						return  $(html)														
				});
				 $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
				 $('.preLoader').hide();
			
			}, handleError);
    
		}
		createHtmlForCatagory()
		//end createHtmlForMovies
		// event listener
		
		
		$(document.body).on('click', '.edit', function() {
			$('#name').val($(this).attr('data-name'));
			$('#short_description').val($(this).attr('data-short_description'));
			$('#status').val($(this).attr('data-status'));
			var ProdImg = JSON.parse($(this).attr('data-catagory_images'));
			$('#CatagoryImages').html('');
			$.each(ProdImg,function(index,item){
				 appendImagefile(item.img,'#CatagoryImages',item.defaults,'');
			});
			$('#CatagoryId').val($(this).attr('data-id'));
			$('#myModal').modal();
		});
		
		$(document.body).on('click', '.delete', function() {
			if($(this).attr('data-id')){
			var result = confirm("You are about to delete this item, all associated data will de deleted. Click OK to continue.");
			if (result==true) {
				$('.preLoader').show();
			CatagoryTable.del({ id: $(this).attr('data-id') }).then(createHtmlForCatagory, handleError).done(function(){
				$('.preLoader').hide();
			});
			}}
		});
		$(document.body).on('click', '#addCatagory', function() {
			$('#name').html('');
			$('#short_description').val('');
			$('#status').val('');
			$('#CatagoryImages').html('');
			$('#myModal').modal();
		});
		
		$('#add-item').on('submit',function(event) {
			event.preventDefault();
			$('.preLoader').show();
			
			//var CatagoryImages = $('#CatagoryImages').val();
			var proImgs= {};
			var i = 0;
			$('#CatagoryImages').find('.thumbnail').each(function(index, element) {
				proImgs[i] = {};
                proImgs[i]['img'] = $(this).children('img').attr('src');
				proImgs[i]['defaults'] = $(this).children('.caption').children('.pull-left').children('.glyphicon-star-empty').hasClass('greenYellow');
            	i++;
			});
			var name = $('#name').val();
			var short_description = $('#short_description').val();
			var status = $('#status').val();
			var catagory_images = JSON.stringify(proImgs);
				if($('#CatagoryId').val() == ''){
						var theNewRow = {
							name: name,
							short_description: short_description,
							status: status,
							catagory_images: catagory_images				
						};
						CatagoryTable.insert(theNewRow).then(createHtmlForCatagory, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.preLoader').hide();
						});
				}else{
						var theNewRow = {
							id: parseInt($('#CatagoryId').val()),
							name: name,
							short_description: short_description,
							status: status,
							catagory_images: catagory_images	
						};
						CatagoryTable.update(theNewRow).then(createHtmlForCatagory, handleError).then(function(){
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
		$('#fileuploadCatagory').fileupload({
			url: url,
			dataType: 'json',
			done: function (e, data) {
				$.each(data.result.files, function (index, file) {
					appendImagefile(file.name,'#CatagoryImages','','upload');
					$('#progressCatagory .progress-bar').css('width','0%');
					$('#progressCatagory .progress-bar').css('width','0%');
					$('#progressCatagory').hide();
				});
			},
			progressall: function (e, data) {
				$('#progressCatagory').show();
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progressCatagory .progress-bar').css(
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
	}
		
}

