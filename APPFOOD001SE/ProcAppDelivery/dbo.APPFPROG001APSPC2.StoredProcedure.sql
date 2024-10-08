USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROG001APSPC2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		23/03/2024 
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Vista de la programación de un producto
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROG001APSPC2]
	@Opcion INT
	,@IdProgramacion INT = NULL
	,@IdProducto INT = NULL
	,@IdFoodHub INT = NULL
	,@IdCuenta INT = NULL
	,@Fecha VARCHAR(20) = NULL
	,@Clasificacion INT = NULL
	,@IdLugar INT = NULL
	,@IdCategoria INT = NULL
	,@IdTipoAlimentacion INT = NULL
AS 
BEGIN
	IF @Opcion = 1
	BEGIN
		DECLARE @CategoriasProd AS TABLE
		(	
			IdProducto INT
		)
		IF @IdCategoria IS NOT NULL
		BEGIN
			INSERT INTO @CategoriasProd
			SELECT APPFPRODCAT005_IdProducto FROM APPFPRODCAT009
			WHERE APPFPRODCAT003_IdCategoria = @IdCategoria
			AND APPFPRODCAT005_IdProducto = ISNULL(@IdProducto, APPFPRODCAT005_IdProducto)
		END
		ELSE
		BEGIN
			INSERT INTO @CategoriasProd
			SELECT APPFPRODCAT005_IdProducto FROM APPFPRODCAT009
			WHERE APPFPRODCAT005_IdProducto = ISNULL(@IdProducto, APPFPRODCAT005_IdProducto)
		END

		SELECT 
		IdFechaProgramada
		,Fecha
		,Cantidad
		,Interesados
		,Confirmado
		,NotificacionesEnviadas
		,TipoProgramacion
		,Activo
		,FechaProgramada
		,PrecioActual
		,IdProgramacion
		,Descripcion
		,NotificacionesActivas
		,IdProducto
		,NombreProducto
		,FotoProducto
		,FotoFoodHub
		,DescripcionProducto
		,IdTipo
		,IdTipoAlimentacion
		,IdFoodHub
		,ClaveFoodHub
		,IdHub
		,IdContacto
		,NombreFoodHub
		,Calle
		,EntreCalles
		,Colonia
		,ComentariosFoodHub
		,CiudadFoodHub
		,Municipio
		,IdEstado
		,NombreEstado
		,Pais
		,CP
		,NumeroFoodHub
		,Calificacion
		,IdCuenta
		,DATEDIFF(DAY, GETDATE(), Fecha ) as DiasPorConfirmar
		,IdMunicipio
		FROM FechasProgramadas
		WHERE IdCuenta = @IdCuenta
		 AND Fecha >= DATEADD(month, DATEDIFF(month, 0, @Fecha), 0)
		AND Fecha <= EOMONTH(@Fecha)
		--FILTROS OPCIONALES
		AND IdFoodHub = ISNULL(@IdFoodHub, IdFoodHub)
		AND IdMunicipio = ISNULL(@IdLugar, IdMunicipio)
		AND IdProducto IN (SELECT IdProducto FROM @CategoriasProd)
		AND IdTipoAlimentacion = ISNULL(@IdTipoAlimentacion, IdTipoAlimentacion)
		AND IdTipo = ISNULL(@Clasificacion, IdTipo)
		ORDER BY Fecha
	END
		
END



GO
