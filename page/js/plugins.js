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
    //cookies
    jQuery.cookie = function(name, value, options) { 
      if (typeof value != 'undefined') { 
        options = options || {}; 
        if (value === null) { 
          value = ''; 
          options = $.extend({}, options); 
          options.expires = -1; 
        } 
        var expires = ''; 
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
                  var date; 
                  if (typeof options.expires == 'number') { 
                            date = new Date(); 
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 
                  } else { 
                            date = options.expires; 
                  } 
                  expires = '; expires=' + date.toUTCString(); 
        } 
        var path = options.path ? '; path=' + (options.path) : ''; 
        var domain = options.domain ? '; domain=' + (options.domain) : ''; 
        var secure = options.secure ? '; secure' : ''; 
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
      } else { 
        var cookieValue = null; 
        if (document.cookie && document.cookie != '') { 
          var cookies = document.cookie.split(';'); 
          for (var i = 0; i < cookies.length; i++) { 
            var cookie = jQuery.trim(cookies[i]); 
            if (cookie.substring(0, name.length + 1) == (name + '=')) { 
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
              break; 
            } 
          } 
        } 
        return cookieValue; 
      } 
    }; 
    $('.menu.slideLeft .open').click(function(){ 
         $.cookie('side', 'close',{expires: 7});                          
      console.log($.cookie('side')); 
    });
    $('.menu.slideLeft .close').click(function(){ 
         $.cookie('side', null);  
      console.log($.cookie('side')); 
    }); 

    //side
    $('.nav')
    .height($(window).height())
    ;
    if($.cookie('side')=='close'){
      $('#side').addClass('slideLeft').next().toggleClass('slideLeft');
    }
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
});