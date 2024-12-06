CREATE DATABASE prova;

USE prova;

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `apellidos` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `dni` varchar(8) COLLATE latin1_spanish_ci NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` VALUES (1,'Angelo','Uriol','48125800',true),(2,'Petter','Ríos','49051200',true),(3,'Jorge','Ríos','22526385',true),(4,'Amelia','Abarca','25123653',true),(5,'Geovanny','Ríos','47859612',true),(6,'Benita','Ávila','15234871',true),(7,'William','Duran','47806512',true),(8,'Jaider','Miranda','47582389',false),(9,'Daniel','Vereau','47862532',false),(10,'Alex','Montoya','42856510',false),(11,'Lino','Flores','42850365',false),(12,'Alejandra','Abarca','49856321',true),(13,'Yoshi','Takeuchi','45126355',true),(14,'Jonathan','Ganoza','45982012',false),(15,'Daniel','Abarca','14851204',true),(16,'Almendra','Abarca','53127854',true),(17,'Luis','Cordova','50125896',false),(18,'David','Rojas','45891201',false),(19,'Kevin','Ávila','48521369',false),(20,'Violeta','Abarca','27416589',true),(21,'Marco','Cordova','46851298',true),(22,'Carlos','Ávalos','26859103',true);
UNLOCK TABLES;
