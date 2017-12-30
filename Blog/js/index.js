	//Chrome输入框的placeholder效果
	$('#key').bind('input',function(){
		$('#ladel').css("display", "none");
	});
	//IE输入框的placeholder效果
	/*$('#key').focus(function(){
		$('#ladel').css("display", "none");
	});*/
	$('#key').blur(function(){
		if($('#key').val()!=""){
			$('#ladel').css("display", "none");
		}else{
			$('#ladel').css("display", "block");
		}
	});