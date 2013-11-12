$(function(){
	checkHeader();
	
	//nav	
   var $menu = $(".ug-nav-hover");
	$menu.menuAim({
		activate: activateSubmenu,
		deactivate: deactivateSubmenu
	});
	function activateSubmenu(row) {
		var $row = $(row),
			submenuId = $row.data("submenuId"),
			$submenu = $("#" + submenuId),
			height = $menu.outerHeight(),
			width = $menu.outerWidth();
		// Show the submenu
		$submenu.css({
			display: "block",
			top: -1,
			left: width - 3,  // main should overlay submenu
			height: height // padding for main dropdown's arrow
		});

		$row.find("a").addClass("maintainHover");
	}

	function deactivateSubmenu(row) {
		var $row = $(row),
			submenuId = $row.data("submenuId"),
			$submenu = $("#" + submenuId);

		$submenu.css("display", "none");
		$row.find("a").removeClass("maintainHover");
	}
	$(".ug-nav-hover li").click(function(e) {
		e.stopPropagation();
	});

	$(document).click(function() {
		$(".popover").css("display", "none");
		$("a.maintainHover").removeClass("maintainHover");
	});

	function checkHeader(){
		
		//node-side-affix
		$('#ug-side-affix').width($('#ug-side-affix').width());
		if(targ=='node'){
			var offsetTop=$('#ug-side-affix').offset().top;
			$('#ug-side-affix').attr('data-offset-top',offsetTop);
		}
		
		//item-affix
		if(targ=='item'){
			var offsetTop=$('#ug-itemAffix').offset().top;
			$('#ug-itemAffix').attr('data-offset-top',offsetTop);
		}
		
		//index-nav
		if(targ=='index'){
			$('#ug-navBtn').attr('data-toggle','').parent().addClass('open');
		}
		
		//search-all-text
		checkSearch();

	}
	//search-all-text
	function checkSearch(){
		var txt=$('.ug-searchAll select').find("option:selected").text()	
		$('.ug-searchTxt').text(txt);
	}
	$('.ug-searchAll select').change(function(){
		checkSearch();
	});	
});
