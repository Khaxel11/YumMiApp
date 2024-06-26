USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROD001APSPC3]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		04/Dic/2023
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Consultas para la vista de Productos(
							)
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROD001APSPC3]
	@Opcion INT,
	@IdCuenta INT = NULL,
	@IdTipo INT = NULL,
	@IdTipoAlimentacion INT = NULL,
	@IdCategoria INT = NULL,
	@IdProducto INT = NULL
AS 
BEGIN
	SET @IdTipo = CASE WHEN @IdTipo = 0 THEN NULL ELSE @IdTipo END
	SET @IdTipoAlimentacion = CASE WHEN @IdTipoAlimentacion = 0 THEN NULL ELSE @IdTipoAlimentacion END
	SET @IdCategoria = CASE WHEN @IdCategoria = 0 THEN NULL ELSE @IdCategoria END
	--VER MIS PLATILLOS
	IF @Opcion = 1
	BEGIN
			WITH Categorias AS (
			SELECT
				A.APPFPRODCAT005_IdProducto as IdProducto,
				MIN(A.APPFPRODCAT003_IdCategoria) as IdCategoria
					FROM APPFPRODCAT009 A
					WHERE A.APPFPRODCAT003_IdCategoria = ISNULL(@IdCategoria, A.APPFPRODCAT003_IdCategoria)
					GROUP BY A.APPFPRODCAT005_IdProducto
			)

		SELECT 
			A.APPFPRODCAT005_IdProducto as IdProducto,
			A.APPFOODCAT001_IdCuenta as IdCuenta,
			A.APPFPRODCAT005_Nombre as NombreProducto,
			A.APPFPRODCAT005_Foto as Foto,
			A.APPFPRODCAT005_Descripcion as Descripcion,
			B.APPFPRODCAT001_IdTipo as IdTipo,
			B.APPFPRODCAT001_NombreTipo as NombreTipo,
			C.APPFPRODCAT002_IdTipoAlimentacion,
			C.APPFPRODCAT002_TipoAlimentacion as TipoAlimentacion,
			A.APPFPRODCAT005_Disponibilidad as Disponibilidad,
			A.APPFPRODCAT005_PreciosConfigurados as PreciosConfigurados,
			A.APPFPRODCAT005_Promocion as Promocion,
			A.APPFPRODCAT005_EtiquetaEspecial as EtiquetaEspecial,
			A.APPFPRODCAT005_Etiqueta as Etiqueta,
			A.APPFPRODCAT005_Popularidad as Popularidad,
			D.IdCategoria -- Usar la CTE de Categorias
		FROM APPFPRODCAT005 A 
		JOIN APPFPRODCAT001 B ON A.APPFPRODCAT001_IdTipo = B.APPFPRODCAT001_IdTipo
		JOIN APPFPRODCAT002 C ON A.APPFPRODCAT002_IdTipoAlimentacion = C.APPFPRODCAT002_IdTipoAlimentacion
		JOIN Categorias D ON A.APPFPRODCAT005_IdProducto = D.IdProducto
		WHERE A.APPFOODCAT001_IdCuenta = @IdCuenta
		AND B.APPFPRODCAT001_IdTipo = ISNULL(@IdTipo, B.APPFPRODCAT001_IdTipo)
		AND C.APPFPRODCAT002_IdTipoAlimentacion = ISNULL(@IdTipoAlimentacion, C.APPFPRODCAT002_IdTipoAlimentacion)
		/*AND A.APPFPRODCAT005_Activo = 1
		AND B.APPFPRODCAT001_Activo = 1
		AND C.APPFPRODCAT002_Activo = 1
		*/
		/*

			SELECT 
				A.APPFPRODCAT005_IdProducto as IdProducto,
				A.APPFOODCAT001_IdCuenta as IdCuenta,
				A.APPFPRODCAT005_Nombre as Nombre,
				A.APPFPRODCAT005_Foto as Foto,
				A.APPFPRODCAT005_Descripcion as Descripcion,
				B.APPFPRODCAT001_IdTipo as IdTipo,
				B.APPFPRODCAT001_NombreTipo as NombreTipo,
				C.APPFPRODCAT002_IdTipoAlimentacion,
				C.APPFPRODCAT002_TipoAlimentacion as TipoAlimentacion,
				A.APPFPRODCAT005_Disponibilidad as Disponibilidad,
				A.APPFPRODCAT005_PreciosConfigurados as PreciosConfigurados,
				A.APPFPRODCAT005_Promocion as Promocion,
				A.APPFPRODCAT005_EtiquetaEspecial as EtiquetaEspecial,
				A.APPFPRODCAT005_Etiqueta as Etiqueta,
				A.APPFPRODCAT005_Popularidad as Popularidad,
				D.APPFPRODCAT003_IdCategoria 
			FROM APPFPRODCAT005 A 
			JOIN APPFPRODCAT001 B ON A.APPFPRODCAT001_IdTipo = B.APPFPRODCAT001_IdTipo
			JOIN APPFPRODCAT002 C ON A.APPFPRODCAT002_IdTipoAlimentacion = C.APPFPRODCAT002_IdTipoAlimentacion
			LEFT JOIN APPFPRODCAT009 D ON A.APPFPRODCAT005_IdProducto = D.APPFPRODCAT005_IdProducto
			WHERE A.APPFOODCAT001_IdCuenta = @IdCuenta
			AND B.APPFPRODCAT001_IdTipo = ISNULL(@IdTipo, B.APPFPRODCAT001_IdTipo)
			AND C.APPFPRODCAT002_IdTipoAlimentacion = ISNULL(@IdTipoAlimentacion, C.APPFPRODCAT002_IdTipoAlimentacion)

		*/

	END

	IF @Opcion = 2
	BEGIN
		SELECT 
			b.APPFPRODCAT004_IdIngrediente as Id 
			, b.APPFPRODCAT004_Ingrediente as Nombre
			, B.APPFPRODCAT004_Foto as Foto
		FROM APPFPRODCAT007 A
		JOIN APPFPRODCAT004 B 
		ON A.APPFPRODCAT004_IdIngrediente = B.APPFPRODCAT004_IdIngrediente
		WHERE A.APPFPRODCAT005_IdProducto = @IdProducto
		AND APPFPRODCAT007_Activo = 1

		SELECT 
			B.APPFPRODCAT003_IdCategoria as Id
			, B.APPFPRODCAT003_Categoria as Nombre
			, B.APPFPRODCAT003_Foto as Foto
		FROM APPFPRODCAT009 A
		JOIN APPFPRODCAT003 B 
		ON A.APPFPRODCAT003_IdCategoria = B.APPFPRODCAT003_IdCategoria
		WHERE A.APPFPRODCAT005_IdProducto = @IdProducto
		AND APPFPRODCAT009_Activo = 1

		/*SELECT 
			APPFPRODCAT006_IdPrecios as IdPrecios
			, APPFPRODCAT005_IdProducto as IdProducto
			, APPFPRODCAT006_PrecioUnidad as PrecioUnidad
			, APPFPRODCAT006_CantidadMinima as CantidadMinima
			, APPFPRODCAT006_CantidadMaxima as CantidadMaxima
		FROM 
		APPFPRODCAT006
		WHERE APPFPRODCAT005_IdProducto = @IdProducto
		AND APPFPRODCAT006_Activo = 1*/

		SELECT 
			APPFPRODCAT006_IdPrecios as IdPrecio
			, APPFPRODCAT006_PrecioUnidad as PrecioUnidad
			, APPFPRODCAT006_CantidadMinima as CantidadMinima
			, APPFPRODCAT006_CantidadMaxima as CantidadMaxima
		FROM APPFPRODCAT006
		WHERE APPFPRODCAT005_IdProducto = @IdProducto
		AND APPFPRODCAT006_Activo = 1
		ORDER BY APPFPRODCAT006_IdPrecios, APPFPRODCAT006_PrecioUnidad DESC

	END

	--Solo los productos
	IF @Opcion = 3
	BEGIN
		SELECT 
			APPFPRODCAT005_IdProducto as IdProducto
			,APPFPRODCAT005_Nombre as NombreProducto
			,APPFPRODCAT005_Foto as Picture
		FROM
		APPFPRODCAT005
		WHERE APPFOODCAT001_IdCuenta = @IdCuenta
		AND APPFPRODCAT005_Activo = 1
	END
END
GO
