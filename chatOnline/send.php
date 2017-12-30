<?php
	header("Content-Type:text/event-stream");
	//取消数据的缓存，确保数据是最新的
	header('Cache:no-cache');
	$num=mt_rand(0,1000);
	//发送数据   data开头，\n\n结尾
	echo "data:$num\n\n";
	//刷新输出缓冲
	ob_flush();
	flush();
?>