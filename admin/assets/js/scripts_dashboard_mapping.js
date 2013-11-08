var cityNameArray = new Array();
var cinemaNameArray = new Array();
var AppId = '';
var AppURL = '';
var prodAttr = {};
var Catagories = {};
var CountryMaps = {};
var CountryMapsData = {};
var productMaps = {};
var uncounts = 0;
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
		CountryAttributeTable = client.getTable('country_attributes');
		CountryMapping = client.getTable('country_mapping');
		CatagoryTable = client.getTable('catagory');
		ClientsTable = client.getTable('clients');
		ClientsMatchTable = client.getTable('client_match');
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
			
			
			
			
			var queryMap = ClientsTable.where({}).take(1000);
			queryMap.read().then(function(ClientsTable) {
				
				 $.each(ClientsTable, function(index,item) {
					 if(item.country_id != ''){
						 if(CountryMaps[item.country_id]){
							CountryMaps[item.country_id]['count'] = CountryMaps[item.country_id]['count'] +1;						
						 }else{
							CountryMaps[item.country_id] = {};
							CountryMaps[item.country_id]['count'] = 1;
							CountryMaps[item.country_id]['country'] = item.country;
						 }
					 }else{
					 	uncounts =  uncounts+1;
					 }
				 });
				
				 
			}, handleError).done(function(){
					var queryMap = ClientsMatchTable.where({}).take(1000);
						queryMap.read().then(function(ClientsMatchTable) {
							 $.each(ClientsMatchTable, function(index,item) {
								 var DataAttributes = JSON.parse(item.data_attributes);
								 var DataProductAttributes = JSON.parse(item.product_ids);
								 if(CountryMapsData[DataAttributes.country]){
									CountryMapsData[DataAttributes.country]['count'] = CountryMapsData[DataAttributes.country]['count'] +1;
										$.each(DataProductAttributes,function(idx,itx){
												if(itx == 4){
													if(productMaps[DataAttributes.country+'|'+idx]){
														productMaps[DataAttributes.country+'|'+idx] = productMaps[DataAttributes.country+'|'+idx] + 1;
													}else{
														productMaps[DataAttributes.country+'|'+idx] = 1;
													}
												}
										});
									
								 }else{
									CountryMapsData[DataAttributes.country] = {};
									CountryMapsData[DataAttributes.country]['count'] = 1;
									$.each(DataProductAttributes,function(idx,itx){
												if(itx == 4){
													if(productMaps[DataAttributes.country+'|'+idx]){
														productMaps[DataAttributes.country+'|'+idx] = productMaps[DataAttributes.country+'|'+idx] + 1;
													}else{
														productMaps[DataAttributes.country+'|'+idx] = 1;
													}
												}
										});
								 }
							 });
							 
						}, handleError).done(function(){
							CreateCountryHtml();
							console.log(productMaps);
							
						});
			});
			//return true;
			var query = CountryAttributeTable.where({status:'1'}).take(1000);
			
		  /*var query = todoItemTable.where(function(dated){
											return this.id <= dated
											},2);*/
			
			query.read().then(function(todoItems) {
				 $.each(todoItems, function(index,item) {
								prodAttr[item.id] = {};
								prodAttr[item.id]['name'] = item.name;
						//console.log(prodAttr);
				 });
				 
			}, handleError).done(function(){
				var query = CatagoryTable.where({status:'1'}).take(1000);
					query.read().then(function(todoItems) {
					 $.each(todoItems, function(index,item) {
						 Catagories[item.id] = {};
						 Catagories[item.id]['name'] = item.name;
						 Catagories[item.id]['products'] = {};
					 });
					 
				}, handleError).done(function(){
					//console.log(Catagories);
						var query = ProductTable.where({status:'1'}).orderBy('catagory').take(1000);;
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
		function CreateCountryHtml(){
			console.log(CountryMaps);
			console.log(CountryMapsData);
			//console.log(prodAttr);
			var tableHtml = '';
			var RowMain = '';
			var RowSub = '';
			tableHtml += '<thead>';  
			
			RowMain += '<tr class="rowMain">'; 
			RowMain += '<th rowspan="1" >Countries</th>';
			RowMain += '<th rowspan="1" >Total Users</th>';
			RowMain += '<th rowspan="1" >Users Completed Match</th>';
			RowMain += '<th rowspan="1" >Match Counts</th>';
			
			RowMain += '</tr>';
			
			tableHtml += RowMain;
			tableHtml += '</thead>';
			tableHtml += '<tbody>';
			 var lengths = 0;
			 console.log(CountryMapsData);
			$.each(CountryMaps,function(ind,itms){
					if(itms != ''){
						var CountryName = itms['country'];
						var userTotal = itms['count'];
						if(CountryMapsData[ind]){
							var SubTotal = CountryMapsData[ind]['count'];
						}else{
							var SubTotal = 0;
						}
						
						tableHtml += '<tr class="girdList">';
						tableHtml += '<td><h3>'+CountryName+'</h3></td>';
						tableHtml += '<td><h3>'+parseInt(parseInt(userTotal)+parseInt(uncounts))+'</h3></td>';
						tableHtml += '<td><h3>'+userTotal+'</h3></td>';
						tableHtml += '<td><h3>'+SubTotal+'</h3></td>';
						tableHtml += '</tr>';
					}
				});
               
			
			 tableHtml += '</tbody>';
			 $('#tableCountry').html(tableHtml);
			 //$('.preLoader').hide();
			//console.log(tableHtml);
		
			
		}
		function BuildTable(){
			//console.log(prodAttr);
			var tableHtml = '';
			var RowMain = '';
			var RowSub = '';
			tableHtml += '<thead>';           
			$.each(prodAttr, function(indexs,item) {
				var lengths = 0;
                RowMain += '<th rowspan="1"  colspan="'+lengths+'" >'+item.name+'</th>';
			});
			 tableHtml += '<tr class="rowMain">';
			 tableHtml += '<th rowspan="1"  colspan="1" >Product</th>';
			 tableHtml += RowMain;
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
									if(item != ''){
										if(productMaps[indexs+'|'+ind]){
											tableHtml += '<td data-col="'+indexs+'"  data-row="'+ind+'"><h3>'+productMaps[indexs+'|'+ind]+'</h3></td>';
										}else{
											tableHtml += '<td data-col="'+indexs+'"  data-row="'+ind+'"><h3>0</h3></td>';
										}
									}
								
							});
						
						tableHtml += '</tr>';
						spanTops = '';
						
					}
				});
               
			}); 
			 tableHtml += '</tbody>';
			 $('#tableProducts').html(tableHtml);
			 $('.preLoader').hide();
			console.log(tableHtml);
		}
		$(document.body).on('click','.MapMe',function() {
			$('.preLoader').show();
			var prodAttr = $(this).attr('data-col');
			var prodID = $(this).attr('data-row');
			if($(this).html() == ''){
				$(this).html('<span class="glyphicon glyphicon-ok"></span>');
				var theNewRow = {
							product_id: prodID,
							country_attribute: prodAttr,
																				
						};
						CountryMapping.insert(theNewRow).done(function(){
							$('.preLoader').hide();
						});
						
			}else{
				$(this).html('');
					var query = CountryMapping.where({product_id: prodID, country_attribute: prodAttr}).take(1000);;
					query.read().then(function(todoItems) {
						 $.each(todoItems, function(index,item) {
								CountryMapping.del({id:item.id});
						 });
					}, handleError).done(function(){
						$('.preLoader').hide();
					});
				
			}
		});
		
		
		// end event listener
	
		
		
}
