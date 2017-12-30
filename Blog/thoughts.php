<?php
	header('Content-Type:text/html;charset="utf-8"');
	header('Catch-Control:no-ccatch');
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
?>
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>碎言碎语</title>
 <link rel="stylesheet" type="text/css" href="css/headerfooter.css" />
 <link rel="stylesheet" type="text/css" href="css/thoughts.css" />
</head>
<body>
  <header id="header">
	<img class="show one" src="img/个人签名.jpg" width="300px" height="80px"/>
	<p class="motto show">成功的人从来不把聚焦点放在过去，而是聚焦于现在和未来<span class="author">--安东尼·罗宾斯</span></p>
	<img class="show three" src="img/茶杯.jpg" width="129px" height="115px"/>
  </header>
  <nav id="nav">
	  <ul>
		<li><a href="index.php">首页</a></li>
		<li><a href="study.php">学无止境</a></li>
		<li><a href="book.php">破万卷书</a></li>
		<li><a href="masterwork.php">名篇摘录</a></li>
		<li><a href="log.php">我的日志</a></li>
		<li><a href="thoughts.php" class="first">碎言碎语</a></li>
		<li><a href="">关于我</a></li>
		<li><a href="">相册</a></li>
		<li><a href="">留言</a></li>
	  </ul>
  </nav>
  <div id="main">
	<ul>
		<?php
			$sql="select * from thoughts order by date desc";
			$result=$pdo->query($sql);
			while(($value=$result->fetch(1))!=false){
				echo <<<EOT
				<li>
					<div class="pic">
						<img src="img/thoughtpic.jpg" width="100px" height="100px;"/>
					</div>
					<div class="content">
						<p>{$value['content']}</p>
						<time class="time">{$value['date']}</time>
					</div>
				</li>	
EOT;
			}
		?>
	</ul>
	<div style="clear:both"></div>
  </div>
  <footer id="footer">
    <p>Made By：何祥</p>
  </footer>
  <!--兼容IE8-支持h5标签-->
  <script type="text/javascript" src="js/custom.modernizr.js"></script>  
  <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
</body>
</html>

























































































































