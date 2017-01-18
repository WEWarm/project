<?php
//初始化连接对象方法
	function connect(){
		$servername = "project";
		$username = "root";
		$password = "root";
		$dbname = "project";
		
		//初始化连接，返回一个连接对像（包含所连接数据库的信息）
		$con = mysqli_connect($servername,$username,$password,$dbname);
		//获取连接对象的错误信息
		if(mysqli_connect_error($con)){
			echo "连接 MySQL失败: ".mysqli_connect_error();
			return null;
		}
		return $con;
	}
	
	//执行查询数据方法
	function query($sql){
		//初始化连接
		$con = connect();
		//执行sql脚本(数据脚本) 返回一个结果集(对象)
		$result = mysqli_query($con,$sql);
		//定义一个数组
		$jsonData = array();
		if($result){
			//在结果集中获取对象(逐行获取)
			while($obj = mysqli_fech_object($result))
			{
				$jsonData[] = $obj;
			}
			//将对象转换成json格式的字符并打印出来
			//JSON.stringify()
			
			//释放结果集
			mysqli_free_result($result);
		}
		//关闭连接
		mysqli_close($con);
		return $jsonData;
	}
	
	//执行逻辑语句
	function excute($sql){
		//初始化连接
		$conn = connect();
		//执行sql脚本
		$result = mysqli_query($conn,$sql);
		//关闭连接
		mysqli_close($conn);
		return $result;
	}
	
	//查询语句 只是呈现结果，不改变数据
	$sql = "SELECT * FROM project;";
	query($sql);
?>