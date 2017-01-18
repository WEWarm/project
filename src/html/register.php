<?php
	include "DBHelper.php";
	include "format.php";
	
	//判断当前用户名是否已存在数据表中
	$usernameCheck = format("select * from project where username='{0}'",
	$_POST["username"]);
	$result = query($usernameCheck);
	//当用户名不存在 ，执行插入语句
	if(count($result)<1){
		$sql = format("insert into project(username,password,confirmpassword,Email)
		values('{0}','{1}','{2}','{3}')",$_POST["username"],$_POST["password"],
		$_POST["confirmpassword"],$_POST["Email"]);
		$excute = excute($sql);
		if($excute){
			echo "{state:true}";
		}else{
			echo "{state:false,message:'插入失败！！'}";
		}else{
			echo"{state:false,message:'username 已被注册！'}";
		}
	}
?>