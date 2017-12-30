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
 <title>博客首页</title>
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
		<li><a href="index.php" class="first">首页</a></li>
		<li><a href="study.php">学无止境</a></li>
		<li><a href="book.php">破万卷书</a></li>
		<li><a href="masterwork.php">名篇摘录</a></li>
		<li><a href="log.php">我的日志</a></li>
		<li><a href="thoughts.php" >碎言碎语</a></li>
		<li><a href="">关于我</a></li>
		<li><a href="">相册</a></li>
		<li><a href="">留言</a></li>
	  </ul>
  </nav>
  <div id="banner">
	<div class="left">
	  <img class="big-pic" src="img/s1-big.jpg"/>
	  <ul>
		<li><img src="img/s1.jpg" /></li>
		<li><img src="img/s2.jpg" /></li>
		<li><img src="img/s3.jpg" /></li>
		<li><img src="img/s4.jpg" /></li>
		<li><img src="img/s5.jpg" /></li>
	  </ul>
	</div>
	<div class="right">
		<p><?php
			$date=date('Y-m-d');
			$sql="select * from sentence where date='{$date}'";
			$result=$pdo->query($sql);
			$value=$result->fetch(1);
			echo $value['content'];
		?><span>--<?php echo $value['author'];?></span></p>
	</div>
  </div>
  <div id="main">
    <div class="content">
	  <h2 class="h2">最新发表</h2>
	  <div class="list">
	    <ul>
		  <li>
		    <div class="pic">
			  <a href="article.html"><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="article.html">如何建立个人博客？</a></h3>
			  <p><a href=""><img src="img/head.png" width="33px" height="33px" />何祥</a>
			  <span>发表日期：2017-09-06 14:32:45</span>
			  <span>分类：前端基础</span></p>
			  <p class="main-content"><a href="article.html">　　想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，
			  通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，
			  并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立...</a></p>
			</div>
		  </li>
		  <li>
		    <div class="pic">
			  <a href=""><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="">如何建立个人博客？</a></h3>
			  <p><a href=""><img src="img/head.png" width="33px" height="33px" />何祥</a>
			  <span>发表日期：2017-09-06 14:32:45</span>
			  <span>分类：前端基础</span></p>
			  <p class="main-content"><a href="">　　想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，
			  通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，
			  并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立...</a></p>
			</div>
		  </li>
		  <li>
		    <div class="pic">
			  <a href=""><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="">如何建立个人博客？</a></h3>
			  <p><a href=""><img src="img/head.png" width="33px" height="33px" />何祥</a>
			  <span>发表日期：2017-09-06 14:32:45</span>
			  <span>分类：前端基础</span></p>
			  <p class="main-content"><a href="">　　想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，
			  通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，
			  并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立...</a></p>
			</div>
		  </li>
		  <li>
		    <div class="pic">
			  <a href=""><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="">如何建立个人博客？</a></h3>
			  <p><a href=""><img src="img/head.png" width="33px" height="33px" />何祥</a>
			  <span>发表日期：2017-09-06 14:32:45</span>
			  <span>分类：前端基础</span></p>
			  <p class="main-content"><a href="">　　想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，
			  通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，
			  并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立...</a></p>
			</div>
		  </li>
		  <li>
		    <div class="pic">
			  <a href=""><img src="img/pic1.jpg" width="175px" height="117px" /></a>
			</div>
			<div class="article">
			  <h3><a href="">如何建立个人博客？</a></h3>
			  <p><a href=""><img src="img/head.png" width="33px" height="33px" />何祥</a>
			  <span>发表日期：2017-09-06 14:32:45</span>
			  <span>分类：前端基础</span></p>
			  <p class="main-content"><a href="">　　想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，
			  通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，
			  并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立...</a></p>
			</div>
		  </li>
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

























































































































