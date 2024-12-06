<?php
	include ("conexion.php");

	$query = "SELECT * FROM usuario WHERE estado = 1 ORDER BY idusuario desc;";
	$resultado = mysqli_query($conexion, $query);
	
	if( !$resultado )
		die("ERRO AO EXECUTAR A CONSULTA!");
	else{
		$array["data"] = [];
		while ( $data = mysqli_fetch_assoc($resultado)){
			$array["data"][] = $data; 
		}
		echo json_encode($array);
	}

mysqli_free_result( $resultado );
mysqli_close( $conexion );