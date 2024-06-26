USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROD001APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		04/Dic/2023
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Consultas para la captura de un nuevo producto(
							)
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROD001APSPC1]
	@Opcion INT,
	@IdTipoAlimentacion INT = NULL
	
AS 
BEGIN
	--Ver Tipos
	IF @Opcion = 1
	BEGIN
		SELECT 
			APPFPRODCAT001_IdTipo as IdTipo
			,APPFPRODCAT001_NombreTipo as NombreTipo
			,APPFPRODCAT001_Descripcion as Descripcion
			,APPFPRODCAT001_Foto as Foto
		FROM APPFPRODCAT001
		
		SELECT 
			APPFPRODCAT002_IdTipoAlimentacion as IdTipoAlimentacion
			,APPFPRODCAT002_TipoAlimentacion as TipoAlimentacion
			,APPFPRODCAT002_Descripcion as Descripcion
		FROM APPFPRODCAT002
		
		SELECT APPFPRODCAT003_IdCategoria as IdCategoria
		, APPFPRODCAT003_Categoria as Categoria
		, APPFPRODCAT003_Descripcion as Descripcion
		, APPFPRODCAT003_Foto as Foto
		FROM APPFPRODCAT003
	END
	
	IF @Opcion = 2
	BEGIN
		WITH Ingredientes as 
		(SELECT
			A.APPFPRODCAT004_IdIngrediente as IdIngrediente,
			A.APPFPRODCAT004_Ingrediente as Ingrediente,
			A.APPFPRODCAT004_Descripcion as Descripcion
		FROM APPFPRODCAT004 A
		LEFT JOIN APPFPRODCAT008 B ON A.APPFPRODCAT004_IdIngrediente = B.APPFPRODCAT004_IdIngrediente
		WHERE A.APPFPRODCAT004_IdIngrediente NOT IN (
			SELECT x.APPFPRODCAT004_IdIngrediente FROM APPFPRODCAT008 X WHERE X.APPFPRODCAT002_IdTipoAlimentacion = @IdTipoAlimentacion
		) OR B.APPFPRODCAT002_IdTipoAlimentacion IS NULL
		GROUP BY
			A.APPFPRODCAT004_IdIngrediente,
			A.APPFPRODCAT004_Ingrediente,
			A.APPFPRODCAT004_Descripcion
			), Imagenes as 
			(
				SELECT APPFPRODCAT004_IdIngrediente, APPFPRODCAT004_Foto
				FROM APPFPRODCAT004
			)

			SELECT *, APPFPRODCAT004_Foto as Foto FROM Ingredientes A
			JOIN Imagenes B ON A.IdIngrediente = b.APPFPRODCAT004_IdIngrediente
			
	END
	--Filtros para catalogo
	IF @Opcion = 3
	BEGIN
		SELECT 
			ROW_NUMBER() OVER (ORDER BY APPADMONCAT008_IdRegistro) as Id,
			APPADMONCAT008_Nombre as Nombre
		FROM APPADMONCAT008 WHERE APPADMONCAT008_IdUso = 1
		AND APPADMONCAT008_Activo = 1
	END
END
GO
