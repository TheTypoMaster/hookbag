$(function(){
	if($('#ug-qtyNum').val()>0) {
		var qtyDel=$('#ug-qtyDel');
		var qtyNum=$('#ug-qtyNum');
		var qtyValue=qtyNum.val();
		var qtyAdd=$('#ug-qtyAdd');
		qtyNum.change(function(){
			qtyValue=qtyNum.val();
			if(!qtyValue){
				qtyNum.val('1');
				qtyValue=1;
			}
		});
		qtyDel.click(function(){
			if(qtyValue>1){
				qtyNum.val(-1+qtyValue--);
				console.log('1');
			}
		});
		qtyAdd.click(function(){
			if(999>qtyValue>=1){
				qtyNum.val(1+qtyValue++);
			}
		});
	}
});
