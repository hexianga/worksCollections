<?php
	//PDO:代表 PHP 和数据库服务之间的一个连接 
	class TalkControls{
		public static $pdo=null;
		public function __construct(){
			if($_GET['a']!='login' && !isset($_SESSION['name'])){
				header('location:index.php?a=login');
			}
			if(is_null(self::$pdo)){
				try{
					$dsn="mysql:host=127.0.0.1;dbname=chat";
					$pdo=new PDO($dsn,'root','',array(PDO::ATTR_PERSISTENT=>TRUE));
					$pdo->query("SET NAMES UTF-8");
					self::$pdo=$pdo;
				}catch(Exception $e){
					die('Connect failed');
				}
			}
		}
		
		
		public function get(){
			//每一次向客户端发送数据都先要设置头
			header('Content-Type:text/event-stream;charset=utf-8');
			header('Cache-Control:no-cache');
			//从服务器获取到数据
			$sql = 'select * from message order by time asc limit 25';
			$result = self::$pdo->query($sql);
			$rows = $result->fetchAll(PDO::FETCH_ASSOC);
			foreach($rows as $v){
				$time=date('H:i:s',$v['time']);
				echo "data:[{$time}] {$v['name']}: {$v['content']}\n";
			}
			//让数据每个1s推送一次
			echo "retry:1000";
			echo "\n\n";
			//var_dump($rows);
		}
		
		public function put(){
			//var_dump($_POST);
			$name=$_SESSION['name'];
			$content=$_POST['content'];
			$time=time();
			$sql="insert into message(name,content,time) values('{$name}','$content',{$time})";
			self::$pdo->exec($sql);
		}
		
		
		
		
		
		public function index(){
			include "show.html";
		}
		public function login(){
			if(!empty($_POST)){
				$_SESSION['name']=$_POST['name'];
				header('location:index.php');
			}
			include "login.html";
		}
	}
	session_start();
	date_default_timezone_set('PRC');
	//把方法名用一个变量来表示,从而根据参数动态调用不通的方法
	//确保每次$_GET['a']都存在
	$action=$_GET['a']=isset($_GET['a'])?$_GET['a']:'index';
	$talk = new TalkControls();
	
	$talk->$action();
?>