USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFOOD001APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		04/Dic/2023
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Consultas para el aplicacion Pagina Inicial(
							Notificaciones,
							Slider,
							Ubicaciones cerca
							)
	=================================================================================
	FECHA MODIFICACION: 14/Feb/2024
	MODIFICADO POR:	    Axel Aguilar A.
	Descripción:		Se añade consulta para obtener Bancos para CAPTURA
						de TARJETA
*/
CREATE PROCEDURE [dbo].[APPFOOD001APSPC1]
	@Opcion INT
	,@IdEstado INT = NULL
	,@Filtro VARCHAR(100) = NULL
	,@IdCuenta INT = NULL
	,@IdFoodHub INT = NULL
AS 
BEGIN
	--Ver NOTIFICACIONES
	IF @Opcion = 1
	BEGIN
		
			SELECT 
				A.APPFOODDAT001_IdNotificacion AS IdNotificacion
				, b.APPADMONCAT007_Icono as Icono
				, b.APPADMONCAT007_IdTipoNotificacion as IdTipoNotificacion
				, A.APPFOODDAT001_Titulo as Titulo
				, A.APPFOODDAT001_Mensaje as Mensaje
				, a.APPFOODDAT001_Leida as Leida
				, a.APPRWARDCAT002_IdRecomensaRelacionada as IdRecompensaRelacionada
				, b.APPADMONCAT007_DescripcionNotificacion as DescripcionNotificacion
				, c.APPRWARDCAT001_IdCategoriaRecomensa as IdCatRecompensa
				, c.APPRWARDCAT002_IdRecomensa as IdRecompensa
				, c.APPRWARDCAT002_NombreRecomensa as NombreRecompensa
				, c.APPRWARDCAT002_Descripcion as DescripcionRecompensa
				, A.APPFOODDAT001_Fecha as Fecha
				, CASE 
					WHEN DATEDIFF(MINUTE, APPFOODDAT001_Fecha, GETDATE()) < 60 THEN 'Hace ' + CONVERT(NVARCHAR(5), DATEDIFF(MINUTE, APPFOODDAT001_Fecha, GETDATE())) + ' minutos'
					WHEN DATEDIFF(HOUR, APPFOODDAT001_Fecha, GETDATE()) < 24 THEN 'Hoy'
					WHEN DATEDIFF(DAY, APPFOODDAT001_Fecha, GETDATE()) < 7 THEN DATENAME(WEEKDAY, APPFOODDAT001_Fecha)
					ELSE 'Hace ' + CONVERT(NVARCHAR(10), DATEDIFF(DAY, APPFOODDAT001_Fecha, GETDATE())) + ' días'
				END AS Estado
			FROM APPFOODDAT001 A
				JOIN APPADMONCAT007 B
					ON A.APPADMONCAT007_IdTipoNotificacion = B.APPADMONCAT007_IdTipoNotificacion
				LEFT JOIN APPRWARDCAT002 C
					ON A.APPRWARDCAT002_IdRecomensaRelacionada = C.APPRWARDCAT002_IdRecomensa
				WHERE A.APPFOODCAT001_IdCuenta = @IdCuenta
				ORDER BY A.APPFOODDAT001_Fecha DESC
		
			
	END
	--VISUALIZADOR DE IMAGENES
	IF @Opcion = 2
	BEGIN
		SELECT
			APPMENUCAT002_IdVisual as IdVisual,
			APPMENUCAT002_Titulo as Titulo,
			APPMENUCAT002_Subtitulo as Subtitulo,
			APPMENUCAT002_Imagen as Imagen,
			RTRIM(APPMENUCAT002_RutaRedirecciona) as RutaRedirecciona
		FROM
			APPMENUCAT002
		WHERE 
			APPMENUCAT001_IdSistema = 1
			AND APPMENUCAT002_IdUsoMenu = 1
			AND APPMENUCAT002_Activo = 1
			AND (
				(APPMENUCAT002_EsProgramado = 0)
				OR
				(
					APPMENUCAT002_EsProgramado = 1
					AND GETDATE() BETWEEN APPMENUCAT002_FechaInicioProgramado AND DATEADD(DAY, APPMENUCAT002_DiasApartirProgramado, GETDATE())
				)
			);

	END

	--Obtener los datos de las cuentas del usuario

	IF @Opcion = 9
	BEGIN
		SELECT 
			APPFOODCAT004_IdCuentaBancaria as IdCuentaBancaria
			,APPFOODCAT004_NombreTitular as NombreTitular
			,APPFOODCAT004_NumeroCuenta as NumeroCta
			,APPADMONCAT009_IdBanco as IdBanco
			,APPFOODCAT004_ProveedorTarjeta as ProveedorTarjeta
			,APPFOODCAT004_IdImagen as IdImagen
			,APPFOODCAT004_CLABE as CLABE
			,APPFOODCAT008_IdMoneda as IdMoneda
		FROM APPFOODCAT004
		WHERE APPFOODCAT001_IdCuenta = @IdCuenta
		AND APPFOODCAT004_Activo = 1
	END
	--Datos de bancos para captura de cuenta / tarjeta
	IF @Opcion = 10
	BEGIN
		SELECT 
			APPADMONCAT009_IdBanco as IdBanco
			,APPADMONCAT009_NombreBanco as NombreBanco
			,APPADMONCAT009_Acronimo as Acronimo
		FROM APPADMONCAT009
		WHERE APPADMONCAT009_Activo = 1
	END
END 

GO
