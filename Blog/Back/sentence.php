<?php
	//header('Content-Type:text/html');
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
	if(!empty($_POST)){
		$date=date('Y-m-d');
		$sql="insert into sentence(content,author,date) values('{$_POST['content']}','{$_POST['author']}','{$date}')";
		$pdo->exec($sql) or die(print_r($pdo->errorInfo(), true));
	}
	
?>
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>每日一语</title>
 <style>
	html{
		height:100%;
		background:linear-gradient(to bottom,#819eea,#565872);
	}
	form{
		position:relative;
		width:500px;
		height:500px;
		margin:30px auto;
		padding-top:30px;
	}
	#contentlabel{
		position:absolute;
		top:30px;
		left:50px;
	}
	#content{
		box-sizing:border-box;
		position:absolute;
		top:30px;
		left:130px;
		font-size:18px;
		width:334px;
		height:120px;
		padding-top:10px;
		padding-left:10px;
	}
	#authorlabel{
		position:absolute;
		top:160px;
		left:80px;
	}
	#author{
		box-sizing:border-box;
		position:absolute;
		top:160px;
		left:130px;
		width:334px;
		font-size:18px;
		padding-left:10px;
	}
	#submit{
		position:absolute;
		top:195px;
		left:130px;
		outline:none;
		width:200px;
		height:40px;
		line-height:40px;
		text-align:center;
		font-size:22px;
		letter-spacing:2em;
		padding-left:55px;
	}
 </style>
</head>
<body>
	<form action="" method="post">
		<label for="content" id="contentlabel">每日一句 :</label>
		<textarea type="text" name="content" id="content" ></textarea>
		<label for="author" id="authorlabel">作者 :</label>
		<input type="text" name="author" id="author"/>
		<input type="submit" value="提交" id="submit"/>
	</form>
</body>
</html>