<?php
	$server = "localhost";
    $user = "seu_usuario";
    $password = "sua_senha";
    $bd = "prova";

	$conexion = mysqli_connect($server, $user, $password, $bd);
	if (!$conexion){ 
		die('ERRO NA CONEXÃO: ' . mysqli_connect_errno());	
	}
?>

