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
		ProductAttributeTable = client.getTable('product_attributes');
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
		function createHtmlForProductAttribute(){
			var query = ProductAttributeTable.where({});
		  /*var query = todoItemTable.where(function(dated){
											return this.id <= dated
											},2);*/
			
			query.read().then(function(todoItems) {
				var productParents = '<option value="0">No Parent</option>';
				var productArray = {};
				productArray[0] = 'No Parent';
				var listItemsList = $.map(todoItems, function(item) {
					if(item.parent == 0){
							productParents += '<option value="'+item.id+'">'+item.name+'</option>';
					}
							productArray[item.id] = item.name;
					
							//return  $(html)														
				});
				$('#parent').html(productParents);
				var listItems = $.map(todoItems, function(item) {
						var html='';
							html +='<tr class="panel panel-default" data-id="'+item.id+'">';
							
							html +='<td> '+item.name+'</td>';
							html +='<td> '+productArray[item.parent]+'</td>';
							html +='<td> '+statusProd[item.status]+'</td>';
							html +="<td><span class='col-lg-1'><span class='glyphicon glyphicon-edit edit' data-id='"+item.id+"' data-name='"+item.name+"' data-parent='"+item.parent+"' data-status='"+item.status+"' ></span></span><span class='col-lg-1'><span class='delete glyphicon glyphicon-remove-circle' data-id='"+item.id+"'></span></span></td>";
							html +='</tr>';
						return  $(html)														
				});
				 $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
				 $('.preLoader').hide();
			
			}, handleError);
    
		}
		createHtmlForProductAttribute()
		//end createHtmlForMovies
		// event listener
		
		
		$(document.body).on('click', '.edit', function() {
			$('#productAttId').val($(this).attr('data-id'));
			$('#name').val($(this).attr('data-name'));
			$('#parent').val($(this).attr('data-parent'));
			$('#status').val($(this).attr('data-status'));
			$('#myModal').modal();
		});
		
		$(document.body).on('click', '.delete', function() {
			if($(this).attr('data-id')){
			var result = confirm("You are about to delete this item, all associated data will de deleted. Click OK to continue.");
			if (result==true) {
				$('.preLoader').show();
			ProductAttributeTable.del({ id: $(this).attr('data-id') }).then(createHtmlForProductAttribute, handleError).done(function(){
				$('.preLoader').hide();
			});
			}}
		});
		$(document.body).on('click', '#addAttributes', function() {
			$('#productAttId').val('');
			$('#name').val('');
			$('#parent').val('');
			$('#status').val('');
			$('#myModal').modal();
		});
		
		$('#add-item').on('submit',function(event) {
			event.preventDefault();
			$('.preLoader').show();
			var name = $('#name').val();
			var parent = $('#parent').val();
			var status = $('#status').val();
			if($('#productAttId').val() == ''){
						var theNewRow = {
							name: name,
							parent: parent,
							status: status																			
						};
						ProductAttributeTable.insert(theNewRow).then(createHtmlForProductAttribute, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.preLoader').hide();
						});
				}else{
						var theNewRow = {
							id: parseInt($('#productAttId').val()),
							name: name,
							parent: parent,
							status: status		
						};
						ProductAttributeTable.update(theNewRow).then(createHtmlForProductAttribute, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.preLoader').hide();
						});
				}							
		
    });
	
		
}

