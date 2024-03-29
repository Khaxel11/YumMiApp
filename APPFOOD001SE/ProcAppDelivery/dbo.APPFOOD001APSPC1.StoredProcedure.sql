USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFOOD001APSPC1]    Script Date: 13/01/2024 12:11:37 p. m. ******/
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
	
END
GO
