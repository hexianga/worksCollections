<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script src="https://cdn.bootcss.com/jquery/1.12.0/jquery.js"></script>
	<title>Document</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		.rule_btn{
			display: block;
			width: 156px;
			height: 80px;
			margin: 0 auto;
			background: -webkit-linear-gradient(#fff, #000);
			background: -o-linear-gradient(#fff, #000);
			background: linear-gradient(#fff, #000);
		}
		.rule_btn:hover{
			cursor: pointer;
			background: -webkit-linear-gradient(#fff, #000);
			background: -o-linear-gradient(#fff, #000);
			background: linear-gradient(#fff, #000);
		}
		.modal_rule_win{
			display: none;
			position: fixed;
			top: 0;
			flex: 1;
			justify-content: center;
			width: 100%;
			height: 100%;
			min-width: 1180px;
			background-color: rgba(0,0,0,0.5);
		}
		.rule_detail{
			position: relative;
			align-self: center;
			width: 400px;
			height: 416px;
			border-radius: 10px;
			background-color: #fff;
			border: 1px solid #ccc;
		}
		.rule_title{
			margin-top: 40px;
			margin-left: 160px;
			margin-bottom: 10px;
		  	font-size: 20px;
		  	color: #333333;
		}
		.rule_content{
			margin: 10px 63px;
			font-size: 16px;
			color: #606062;
			line-height: 32px;
			letter-spacing: 1px;
		}
		.close_btn{
			position: absolute;
			top: 0px;		
			right: -44px;
			width: 34px;
			height: 34px;
			border: 1px solid #fff;
			border-radius: 50%;
			color: #fff;
			text-align: center;
		}
		.close_btn:hover{
			cursor: pointer;
		}
		.close_btn>p{
			font-size: 18px;
			margin-top: 5px;
		}
	</style>
</head>
<body>

	<button class="rule_btn" id="rule">点我弹出模态框</button>

	<div class="modal_rule_win">
		<div class="rule_detail">
			<h3 class="rule_title">活动规则</h3>
			<p class="rule_content">
			   金樽清酒斗十千，玉盘珍羞直万钱<br />
			   停杯投箸不能食，拔剑四顾心茫然。<br />
			   欲渡黄河冰塞川，将登太行雪满山。<br />
			   闲来垂钓碧溪上，忽复乘舟梦日边。<br />
			   行路难！行路难！多岐路，今安在。<br />
			   长风破浪会有时，直挂云帆济沧海<br />
			</p>
			<div class="close_btn"><p>X</p></div>
		</div>
	</div>
	<script type="text/javascript">
		$(function(){
			
			$('.rule_btn').click(function(){
				$('.modal_rule_win').css({'display':'flex'});
			})
			$('.close_btn').click(function(){
				$('.modal_rule_win').css({'display':'none'	});
		})
		})
	</script>
</body>
</html>
