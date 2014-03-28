$(function(){
	//side
	$('.nav')
	.height($(window).height())
	;

	$('[data-toggle=offcanvas]')
	.click(function(){
    var side=$($(this).attr('data-target')).parent(),sideElm=$($(this).attr('data-target')),len=side.find('#nav').children().index(sideElm.find('.left'));
    if($(this).hasClass('slideLeft')){
      side.toggleClass('slideLeft').next().toggleClass('slideLeft');
    }else{
      side.toggleClass('subNav');
      console.log(side);
    }
	})
	;

	//select
	$('.hb.selection.dropdown')
	.dropdown()
	;	
	//checkbox
	$('.hb.checkbox')
	.checkbox()
	;
	//tabs
	$('#tab1>.item')
	.tab({
		history:false,
		onTabLoad:function(){
			$('.hb.tab').eq(0).addClass('active');
		}
	});
	$('#size>.item').click(function(){
		var dataTab=$(this).attr('data-tab');
		$(this).addClass('active').siblings().removeClass('active');
		$('.hb.tab').each(function(){
			if($(this).attr('data-tab')==dataTab){
				$(this).addClass('active').siblings().removeClass('active');
			}
		});
	});
});