!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}(),$(function(){$(".nav").height($(window).height()-$("#header").height()),$("[data-toggle=offcanvas]").click(function(){var a=$($(this).attr("data-target")),b=$(a).parent();$(this).hasClass("slideLeft")?($(this).toggleClass("close"),b.toggleClass("slideLeft").next().toggleClass("slideLeft")):(b.toggleClass("subNav"),console.log(b))}),$(".hb.selection.dropdown").dropdown(),$(".hb.accordion").accordion(),$(".hb.checkbox").checkbox(),$("#tab1>.item").tab({history:!1,onTabLoad:function(){$(".hb.tab").eq(0).addClass("active")}}),$("#size>.item").click(function(){var a=$(this).attr("data-tab");$(this).addClass("active").siblings().removeClass("active"),$(".hb.tab").each(function(){$(this).attr("data-tab")==a&&$(this).addClass("active").siblings().removeClass("active")})})});