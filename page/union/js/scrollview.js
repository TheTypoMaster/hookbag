$(function() {
  var $blocks = $('.animated');
  var $window = $(window);
	checkElem();
	function checkElem(){
    $blocks.each(function(){
      if($(this).hasClass('viewed')) 
        return;
        
      isScrolledIntoView($(this));
    });
  }
  $window.on('scroll',checkElem );
});
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  
  if((elemTop <= docViewBottom) && (elemTop >= docViewTop)) {
    // once an element is visible exchange the classes
    $(elem).removeClass('notViewed').addClass('viewed');
    console.log(elemTop+'-'+elemBottom);
    var animElemsLeft = $('.animated.notViewed').length;
    if(animElemsLeft == 0){
      // with no animated elements left debind the scroll event
      $(window).off('scroll');
    }
  }
}