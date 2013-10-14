var cityNameArray = new Array();
var cinemaNameArray = new Array();
var AppId = '';
var AppURL = '';
var prodAttr = {};
var Catagories = {};
var productMaps = {};
function GetApp(){
	//return true;
	$.getJSON('../app.json', function(data) {
		AppId = data.id;
		AppURL = data.url;
		StartApp();
	});
}
function StartApp(){	
	var client = new WindowsAzure.MobileServiceClient(AppURL, AppId),
		ProductTable = client.getTable('product');
		ProductAttributeTable = client.getTable('product_attributes');
		ProductMapping = client.getTable('product_mapping');
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
		function createHtmlForTable(){
			//alert('');
			var queryMap = ProductMapping.where({});
			queryMap.read().then(function(ProductMapping) {
				 $.each(ProductMapping, function(index,item) {
					 productMaps[item.product_attribute+'|'+item.product_id] = 1;
				 });
				 
			}, handleError).done(function(){
				console.log(productMaps);
			});
			
			var query = ProductAttributeTable.where({status:'1'}).orderBy('parent');
			
		  /*var query = todoItemTable.where(function(dated){
											return this.id <= dated
											},2);*/
			
			query.read().then(function(todoItems) {
				 $.each(todoItems, function(index,item) {
						if(item.parent == 0){
								prodAttr[item.id] = {};
								prodAttr[item.id]['name'] = item.name;
								prodAttr[item.id]['childs'] = {};
								
						}else{
							prodAttr[item.parent]['childs'][item.id] = item.name;
						}
						//console.log(prodAttr);
				 });
				 
			}, handleError).done(function(){
				var query = CatagoryTable.where({status:'1'});
					query.read().then(function(todoItems) {
					 $.each(todoItems, function(index,item) {
						 Catagories[item.id] = {};
						 Catagories[item.id]['name'] = item.name;
						 Catagories[item.id]['products'] = {};
					 });
					 
				}, handleError).done(function(){
					//console.log(Catagories);
						var query = ProductTable.where({status:'1'}).orderBy('catagory');
							query.read().then(function(todoItems) {
							 $.each(todoItems, function(index,item) {
								 Catagories[item.catagory]['products'][item.id] = item.name;
							 });
							 
						}, handleError).done(function(){
								console.log(prodAttr);
								console.log(Catagories);
								BuildTable();
						});
					
						
				});
					
			});
    
		}
		createHtmlForTable();
		//end createHtmlForMovies
		// event listener
		
		function BuildTable(){
			//console.log(prodAttr);
			var tableHtml = '';
			var RowMain = '';
			var RowSub = '';
			tableHtml += '<thead>';           
			$.each(prodAttr, function(indexs,item) {
				var lengths = 0;
				$.each(item.childs,function(ind,itm){
					if(itm != ''){
						RowSub += '<th rowspan="1"  colspan="1" >'+itm+'</th>';
						lengths++;
					}
				});
                RowMain += '<th rowspan="1"  colspan="'+lengths+'" >'+item.name+'</th>';
			});
			 tableHtml += '<tr class="rowMain">';
			 tableHtml += '<th rowspan="1"  colspan="1" >Product</th>';
			 tableHtml += RowMain;
			 tableHtml += '</tr>';
			 tableHtml += '<tr class="rowSub">';
			 tableHtml += '<th rowspan="1"  colspan="1" >Variables</th>';
			 tableHtml += RowSub;
			 tableHtml += '</tr>'; 
			 tableHtml += '</thead>';
			 tableHtml += '<tbody>';
			 
			 console.log(tableHtml);
			 var spanTops = '';
			 $.each(Catagories, function(indexs,item) {
				 	 spanTops += '<span class="label label-info pull-left">';
                  	 spanTops += item.name;
                     spanTops += '</span>';
				 
				 var lengths = 0;
				 $.each(item.products,function(ind,itms){
					if(itms != ''){
						if(spanTops != ''){
							tableHtml += '<tr class="girdList topBorder">';
						}else{
							tableHtml += '<tr class="girdList">';
						}
						tableHtml += '<td>'+spanTops+'<h3>'+itms+'</h3></td>';
						
						$.each(prodAttr, function(indexs,item) {
								$.each(item.childs,function(indx,itm){
									if(itm != ''){
										console.log(indx+'|'+ind);
										if(productMaps[indx+'|'+ind]){
											tableHtml += '<td data-col="'+indx+'"  data-row="'+ind+'"><span class="glyphicon glyphicon-ok"></span></td>';
										}else{
											tableHtml += '<td data-col="'+indx+'"  data-row="'+ind+'" class="MapMe"></td>';
										}
									}
								});
							});
						
						tableHtml += '</tr>';
						spanTops = '';
						
					}
				});
               
			}); 
			 tableHtml += '</tbody>';
			 $('.table-striped').html(tableHtml);
			 $('.preLoader').hide();
			console.log(tableHtml);
		}
		$(document.body).on('click', '.edit', function() {
			$('#cityId').val($(this).attr('data-id'));
			$('#cityName').val($(this).attr('data-name'));
			$('#myModal').modal();
		});
		$(document.body).on('click','.MapMe',function() {
			$('.preLoader').show();
			var prodAttr = $(this).attr('data-col');
			var prodID = $(this).attr('data-row');
			if($(this).html() == ''){
				$(this).html('<span class="glyphicon glyphicon-ok"></span>');
				var theNewRow = {
							product_id: prodID,
							product_attribute: prodAttr,
																				
						};
						ProductMapping.insert(theNewRow).done(function(){
							$('.preLoader').hide();
						});
						
			}else{
				$(this).html('');
					var query = ProductMapping.where({product_id: prodID, product_attribute: prodAttr});
					query.read().then(function(todoItems) {
						 $.each(todoItems, function(index,item) {
								ProductMapping.del({id:item.id});
						 });
					}, handleError).done(function(){
						$('.preLoader').hide();
					});
				
			}
		});
		
		$(document.body).on('click', '.close', function() {
			if($(this).attr('data-id')){
			var result = confirm("You are about to delete this item, all associated data will de deleted. Click OK to continue.");
			if (result==true) {
				$('.loader').show();
			CityTable.del({ id: $(this).attr('data-id') }).then(createHtmlForTable, handleError).done(function(){
				$('.loader').hide();
			});
			}}
		});
		$(document.body).on('click', '#addCity', function() {
			$('#cityName').html('');
			$('#cityId').val('');
			$('#myModal').modal();
		});
		
		$('#add-item').on('click',function() {
			$('.loader').show();
			var cityName = $('#cityName').val();
			if(cityName == ''){
				alert('Please enter Cinema Name');
			}else{
				if($('#cityId').val() == ''){
						var theNewRow = {
							city: cityName													
						};
						CityTable.insert(theNewRow).then(createHtmlForTable, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.loader').hide();
						});
				}else{
						var theNewRow = {
							id: parseInt($('#cityId').val()),
							city: cityName	
						};
						CityTable.update(theNewRow).then(createHtmlForTable, handleError).then(function(){
							$('#myModal').modal('hide');
							$('.loader').hide();
						});
				}
												
		}
    });
		// end event listener
	
		
		
}
