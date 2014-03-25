$(document).ready(function() {
  //navbar-toggle
  if($('.un-hideNav').length>0){
    $('.navbar-toggle').show();
  }
  //icon
  if($('#un-item').length>0){
    $('.un-sideShow').children().eq(0).toggleClass('icon-arrow-left3 icon-arrow-right3');
  }
  if($('#un-grid').length>0){
    $('.un-sideShow').hide();
  }

  //offcanvas
  $('[data-toggle=offcanvas]').click(function(){
    var side=$($(this).attr('data-target')).parent(),sideElm=$($(this).attr('data-target')),len=side.children().index(sideElm.find('.left'));
    if($(this).hasClass('navbar-toggle')){
      side.children().toggleClass('left');
    }else if($(this).hasClass('un-sideShow')){
      side.children().toggleClass('active');
      $(this).children().eq(0).toggleClass('icon-arrow-left3 icon-arrow-right3');
    }else{
      side.children().toggleClass('active left');
    }
  });
  if($(window).width()<1024){
    $('.un-side').removeClass('active');
    $('.un-main').removeClass('active');
  }

  //un-side
  $('.un-sideLeft0').height($(window).height());
  $(window).resize(function(){
    $('.un-sideLeft0').height($(window).height());
  });
});
