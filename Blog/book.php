<?php
	header('Content-Type:text/html;charset="utf-8"');
	header('Catch-Control:no-catch');
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
 <title>破万卷书</title>
 <link rel="stylesheet" type="text/css" href="css/column.css" />
 <link rel="stylesheet" type="text/css" href="css/headerfooter.css" />
 <link rel="stylesheet" type="text/css" href="css/index.css"/>
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
		<li><a href="book.php" class="first">破万卷书</a></li>
		<li><a href="masterwork.php">名篇摘录</a></li>
		<li><a href="log.php">我的日志</a></li>
		<li><a href="thoughts.php">碎言碎语</a></li>
		<li><a href="">关于我</a></li>
		<li><a href="">相册</a></li>
		<li><a href="">留言</a></li>
	  </ul>
  </nav>
  <div id="main">
    <div class="content">
	  <h2 class="h2">最新发表</h2>
	  <div class="list">
	    <ul>
		<?php
		$sql="select * from book order by date desc";
		$result=$pdo->query($sql);
		while(($value=$result->fetch(1))!=false){
			echo <<<EOT
			<li>
		    <div class="pic">
			  <a href="article.php?table=book&id={$value['id']}"><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="article.php?table=book&id={$value['id']}">{$value['title']}</a></h3>
			  <p><a href="article.php?table=book&id={$value['id']}"><img src="img/head.png" width="33px" height="33px" />{$value['author']}</a>
			  <span>发表日期：{$value['date']}</span></p>
			  <p class="main-content"><a href="article.php?table=book&id={$value['id']}">　　{$value['content']}</a></p>
			</div>
		  </li>
EOT;
		}
		?>
		</ul>
	  </div>
	</div>
	<div class="slide">
	  <h2 class="h2">站内搜索</h2>
	  <div class="search">
	    <form action="#" method="post">
		  <label class="placeholder" id="ladel" for="key">请输入你需要的内容</label>
		  <input type="text" name="key" id="key" class="search-value" value=""/>
		  <input type="submit" class="search-btn" value=""/>
		</form>
	  </div>
	  <div class="column">
		<ul>
		  <li><a href="">名篇摘录</a></li>
		  <li><a href="">名篇摘录</a></li>
		  <li><a href="">名篇摘录</a></li>
		  <li><a href="">名篇摘录</a></li>
		</ul>
	  </div>
	  <div class="hot-click">
	    <h3>点击排行</h3>
		<div class="title">
		  <ul>
		 	<li><a href=""><span></span>大气绿色装修类企业网站</a></li>
			<li><a href="">大气绿色装修类企业网站</a></li>
			<li><a href="">大气绿色装修类企业网站</a></li>
			<li><a href="">大气绿色装修类企业网站</a></li>
			<li><a href="">大气绿色装修类企业网站</a></li>
			<li><a href="">大气绿色装修类企业网站模板</a></li>
			<li><a href="">大气绿色装修类企业网站模板</a></li>
		  </ul>
		  <ol>
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
			<li>6</li>
			<li>7</li>
		  </ol>
		</div>
	  </div>
	</div>
	<div style="clear:both"></div>
  </div>
  <footer id="footer">
    <p>Made By：何祥</p>
  </footer>
  <!--兼容IE8-支持h5标签-->
  <script type="text/javascript" src="js/custom.modernizr.js"></script>  
  <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
  <script type="text/javascript" src="js/index.js"></script>
</body>
</html>



















































































































































































































