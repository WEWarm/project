<?php
		include "DBHelper.php";
		include "format.php";
		//判断当前 username 是否已存在数据表中
		$sql = format("select * from project where username='{0}' and 
		passwork='{1}'",$_POST["username"],$POST["password"]);
		
		$result = query($sql);
		//当前username不存在，执行插入操作
		if(count($result) < 1){
			echo "{state:false,message:'登录失败！'}";
		}else{
			echo "{state:true,message:'登录成功！'}";
			session_start();
			$_SESSION["login_username"] = $result[0]->username;
		}
?>