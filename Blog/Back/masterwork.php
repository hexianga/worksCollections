<?php
	header('Content-Type:text/html');
	date_default_timezone_set('PRC');
	$dsn='mysql:dbname=blog;host=127.0.0.1';
	$username='root';
	$password='';
	try{
		$pdo=new PDO($dsn,$username,$password);
		$pdo->query('set names utf-8');
	}catch(PDOException $e){
		die('Connection Failed:'.$e->getMessage());
	}
	$date=date('Y-m-d h:i:s');
	if(!empty($_POST)){
		$sql="insert into masterwork(title,content,author,class,date) values('{$_POST['title']}',
		'{$_POST['content']}','{$_POST['author']}','{$_POST['class']}','{$date}')";
		$pdo->exec($sql) or die(print_r($pdo->errorInfo(), true));
	}

?>
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>名篇摘录</title>
 <style>
	html{
		height:100%;
		background:linear-gradient(to bottom,#819eea,#565872);
	}
	
	form .label{
		display:inline-block;
		width:100px;
		height:60px;
		font-size:18px;
		text-align:right;
		vertical-align:top;
	}
	form input[type=text],#class{
		width:300px;
		font-size:17px;
		padding:5px;
	}
	#content{
		height:380px;
		width:600px;
		font-size:18px;
		padding:10px;
	}
	#submit{
		outline:none;
		width:200px;
		height:40px;
		line-height:40px;
		text-align:center;
		font-size:22px;
		letter-spacing:2em;
		padding-left:55px;
		margin-left:110px;
	}
 </style>
</head>
<body>
	<form action="#" method="post">
		<section>
			<label for="title" class="label">标题 :</label>
			<input type="text" name="title" id="title"/>
		</section>
		<section>
			<label for="content" id="contentlabel" class="label">名篇 :</label>
			<textarea type="text" name="content" id="content" ></textarea>
		</section>
		<section class="select">
			<label for="class" class="label">名篇分类 :</label>
			<select name="class" id="class">
				<option value="0">请选择</option>
				<option value="1">诗歌</option>
				<option value="2">散文</option>
				<option value="3">小说</option>
				<option value="4">古文</option>
			</select>
		</section>
		<section>
			<label for="author" id="authorlabel" class="label">作者 :</label>
			<input type="text" name="author" id="author"/>
		</section>
		<section>
		<input type="submit" value="提交" id="submit"/>
		</section>
	</form>
</body>
</html>