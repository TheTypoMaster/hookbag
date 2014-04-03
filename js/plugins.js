// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

$(function(){

    //side
    $('#header .launch').click(function(){
        $('#side.side.left').toggleClass('open').siblings().toggleClass('open');
    });
    $('.nav')
    .height($(window).height()-$('#header').height())
    ;
    $('[data-toggle=offcanvas]')
    .click(function(){
    var sideElm=$($(this).attr('data-target')),side=$(sideElm).parent();
    if($(this).hasClass('slideLeft')){
      $(this).toggleClass('close');
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
    //accordion
    $('.hb.accordion')
      .accordion()
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
    //photo
    //$('#photo').popeye();

});