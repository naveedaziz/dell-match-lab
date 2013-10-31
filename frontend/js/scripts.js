(function(){
	$("html, body").animate({ scrollTop: "0" });
	$('.start_button').on('click',function(){
		translate('.mainBg,footer','-100%');
		$('.screen-1').css('height','auto');
		$('.screen-1').css('overflow','auto');
		translate('.screen-1','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.formSubmit').on('click',function(){
		translate('.screen-1','-120%');
		$('.screen-2').css('height','auto');
		$('.screen-2').css('overflow','auto');
		translate('.screen-2','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.counterSelect').on('click',function(){
		translate('.screen-2','-120%');
		$('.screen-3').css('height','auto');
		$('.screen-3').css('overflow','auto');
		translate('.screen-3','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.usageSelect').on('click',function(){
		translate('.screen-3','-120%');
		$('.screen-4').css('height','auto');
		$('.screen-4').css('overflow','auto');
		translate('.screen-4','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.usage_detailSelect').on('click',function(){
		translate('.screen-4','-120%');
		$('.screen-5').css('height','auto');
		$('.screen-5').css('overflow','auto');
		translate('.screen-5','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.mobilitySelect').on('click',function(){
		translate('.screen-5','-120%');
		$('.screen-6').css('height','auto');
		$('.screen-6').css('overflow','auto');
		translate('.screen-6','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.completeSelect').on('click',function(){
		translate('.screen-6','-120%');
		$('.screen-7').css('height','auto');
		$('.screen-7').css('overflow','auto');
		translate('.screen-7','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.backProducts').on('click',function(){
		translate('.screen-6','0%');
		translate('.screen-7','120%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.prodImg,.more').on('click',function(){
		translate('.screen-6','-120%');
		$('.screen-8').css('height','auto');
		$('.screen-8').css('overflow','auto');
		translate('.screen-8','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.more').on('click',function(){
		translate('.screen-7','-120%');
		$('.screen-8').css('height','auto');
		$('.screen-8').css('overflow','auto');
		translate('.screen-8','0%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.bkMatched').on('click',function(){
		translate('.screen-6','0%');
		translate('.screen-8','120%');
		$("html, body").animate({ scrollTop: "0" });
	});
	$('.completeProduct').on('click',function(){
		translate('.screen-8','-120%');
		$('.screen-7').css('height','auto');
		$('.screen-7').css('overflow','auto');
		$('.screen-7').css('-webkit-transform','translateX(0%)');
		translate('.screen-7','0%');
		$("html, body").animate({ scrollTop: "0" });
		
	});
	
	function translate(item,val){
		$(item).css('-webkit-transform','translateX('+val+')');
		$(item).css('-ms-transform','translateX('+val+')');
		$(item).css('transform','translateX('+val+')');
	}
	
	
	
	
	
})();
