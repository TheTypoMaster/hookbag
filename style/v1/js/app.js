$(function(){
	$('#side').height($(window).height());
	$('.hb.selection.dropdown')
	.dropdown()
	;	
	$('.hb.checkbox')
	.checkbox()
	;
	$('.hb.tabular .item')
	.tab({
		context : '#hb',
		history : false
	})
	;
});