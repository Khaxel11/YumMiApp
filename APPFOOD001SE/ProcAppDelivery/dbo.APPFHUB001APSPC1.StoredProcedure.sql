USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFHUB001APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		27/Nov/2023
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Consultas para el aplicacion inicial (
							Registro
							Lista
							Inicio de sesion
							)
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFHUB001APSPC1]
	@Opcion INT
	,@IdEstado INT = NULL
	,@Filtro VARCHAR(100) = NULL
	,@IdCuenta INT = NULL
	,@IdFoodHub INT = NULL
AS 
BEGIN
	--Ver FOODHUBS
	IF @Opcion = 1
	BEGIN
		With Foodhubs as(
			SELECT 
			B.APPFHUBCAT001_IdHub AS IdHubCuenta
			,A.APPFHUBCAT003_IdFoodHub AS IdFoodHub
			,A.APPFHUBCAT003_ClaveFoodHub AS ClaveFoodHub
			,B.APPFHUBCAT001_Foto AS Foto
			,A.APPFHUBCAT003_NombreHub AS NombreHub
			,A.APPFHUBCAT003_Calle AS Calle
			,A.APPFHUBCAT003_EntreCalles AS EntreCalles
			,A.APPFHUBCAT003_Colonia AS Colonia
			,A.APPFHUBCAT003_Comentarios AS Comentarios
			,A.APPFHUBCAT003_Ciudad AS Ciudad
			,A.APPFHUBCAT003_Municipio AS Municipio
			,A.APPADMONCAT004_IdEstado AS IdEstado
			,D.APPADMONCAT004_Nombre AS NombreEstado
			,A.APPFHUBCAT003_Pais AS Pais
			,A.APPFHUBCAT003_CodigoPostal as CodigoPostal
			,A.APPFHUBCAT003_Numero AS Numero
			,A.APPFHUBCAT003_Calificacion AS CalificacionManual
			,A.APPFHUBCAT003_TieneServicioDomicilio AS TieneServicioDomicilio
			,A.APPFHUBCAT003_HorarioConfigurado AS HorarioConfigurado
			,A.APPFHUBCAT003_ServicioDomicilioConfigurado AS ServicioDomicilioConfigurado
			--,APPFHUBCAT003_Abierto AS Abierto
			,A.APPFHUBCAT003_Coordenadas.STAsText()  AS Coordenadas
			,A.APPFHUBCAT003_Coordenadas.Lat  AS Latitud
			,A.APPFHUBCAT003_Coordenadas.Long  AS Longitud
			,C.APPFHUBCAT002_ClaveContacto AS ClaveContacto
			,C.APPFHUBCAT002_NombreContacto + ' ' +
				C.APPFHUBCAT002_ApellidoPaterno + ' ' + 
				C.APPFHUBCAT002_ApellidoMaterno AS Contacto
			,C.APPFHUBCAT002_Telefono AS TelefonoContacto
			,E.APPFHUBDAT001_Asignado AS Asignado
			,E.APPFHUBDAT001_IdAsignado AS IdAsignado
			,CONVERT(VARCHAR(5), APPFHUBDAT002_HoraApertura, 108) AS HoraApertura
			,CONVERT(VARCHAR(5), APPFHUBDAT002_HoraCierre, 108) AS HoraCierre
			,F.APPFHUBDAT002_HorarioEspecial  EsHorarioEspecial
			,F.APPFHUBDAT002_Comentarios AS ComentariosHorario
			,CASE  
				WHEN CAST( GETDATE() AS TIME) BETWEEN APPFHUBDAT002_HoraApertura AND APPFHUBDAT002_HoraCierre THEN 1
				ELSE 0 
			END AS Abierto
			,CASE
			WHEN 
				DATEDIFF(MINUTE, GETDATE(), APPFHUBDAT002_HoraApertura) <= 10
				AND DATEDIFF(MINUTE, GETDATE(), APPFHUBDAT002_HoraApertura) >= 0
			THEN 'Abre pronto'
        
			WHEN 
				DATEDIFF(MINUTE, GETDATE(), APPFHUBDAT002_HoraCierre) <= 10
				AND DATEDIFF(MINUTE, GETDATE(), APPFHUBDAT002_HoraCierre) >= 0
			THEN 'Cierra pronto'
        
			ELSE ''
			END AS EstadoHorario
		FROM APPFHUBCAT003 A 
		JOIN APPFHUBCAT001 B ON A.APPFHUBCAT001_IdHub =  B.APPFHUBCAT001_IdHub
		JOIN APPFHUBCAT002 C ON A.APPFHUBCAT002_IdContacto = C.APPFHUBCAT002_IdContacto
		JOIN APPADMONCAT004 D ON A.APPADMONCAT004_IdEstado = D.APPADMONCAT004_IdEstado
		LEFT JOIN APPFHUBDAT001 E ON E.APPFOODCAT001_IdCuenta = @IdCuenta AND A.APPFHUBCAT003_IdFoodHub = E.APPFHUBCAT003_IdFoodHub
		LEFT JOIN APPFHUBDAT002 F ON F.APPFHUBCAT003_IdFoodHub = A.APPFHUBCAT003_IdFoodHub AND F.APPFHUBDAT002_Fecha = FORMAT(GETDATE(),'yyyyMMdd')
		WHERE A.APPADMONCAT004_IdEstado = @IdEstado
		AND CONCAT(A.APPFHUBCAT003_NombreHub,D.APPADMONCAT004_Nombre,A.APPFHUBCAT003_Pais,A.APPFHUBCAT003_Ciudad)
			LIKE '%'+ISNULL(@Filtro,
				CONCAT(A.APPFHUBCAT003_NombreHub,D.APPADMONCAT004_Nombre,A.APPFHUBCAT003_Pais,A.APPFHUBCAT003_Ciudad)
			)+'%'
		), 
		calificaciones AS
		(
			SELECT 
				B.IdFoodHub,
				SUM(APPFHUBCAT010_Calificacion) AS suma,
				COUNT(APPFHUBCAT010_Calificacion) AS Totales,
				CASE
					WHEN COUNT(APPFHUBCAT010_Calificacion) > 0
					THEN SUM(APPFHUBCAT010_Calificacion) * 1.0 / COUNT(APPFHUBCAT010_Calificacion)
					ELSE 0
				END AS PromedioCalificaciones
			FROM APPFHUBCAT010 A 
			JOIN Foodhubs B ON A.APPFHUBCAT003_IdFoodHub = B.IdFoodHub
			GROUP BY B.IdFoodHub

		)

		SELECT
			FH.*,
			suma,
			totales as CalificacionesTotales,
			PromedioCalificaciones as Calificacion
		FROM
			Foodhubs FH
		LEFT JOIN
			calificaciones C ON FH.IdFoodHub = C.IdFoodHub;
		
		
			
	END
	IF @Opcion = 2 --Obtiene los comentarios de los usuarios
	BEGIN
		SELECT 
			APPFHUBCAT010_IdCalificacion as IdCalificacion
			,B.APPUSERCAT001_IdCuenta as IdCuenta 
			,B.APPUSERCAT001_Foto as Foto
			,B.APPUSERCAT001_NombreUsuario as NombreUsuario
			,A.APPFHUBCAT010_Calificacion as Calificacion
			,A.APPFHUBCAT010_Comentarios as Comentarios
			,A.APPFHUBCAT010_Votos as Votos
			,FORMAT(A.APPFHUBCAT010_Fecha, 'dd/MM/yyyy') as FechaCalificacion
			,C.APPFHUBCAT003_NombreHub as NombreHub
			,C.APPFHUBCAT003_IdFoodHub as IdFoodHub
		FROM APPFHUBCAT010 A
		JOIN APPUSERCAT001 B ON A.APPUSERCAT001_IdCuenta = B.APPUSERCAT001_IdCuenta
		JOIN APPFHUBCAT003 C ON A.APPFHUBCAT003_IdFoodHub = C.APPFHUBCAT003_IdFoodHub
		WHERE C.APPFHUBCAT003_IdFoodHub = @IdFoodHub
		ORDER BY Votos, FechaCalificacion

	END

	IF @Opcion = 3
	BEGIN
		SELECT 
			B.APPFHUBCAT001_IdHub AS IdHubCuenta
			,A.APPFHUBCAT003_IdFoodHub AS IdFoodHub
			,A.APPFHUBCAT003_ClaveFoodHub AS ClaveFoodHub
			,B.APPFHUBCAT001_Foto AS Foto
			,A.APPFHUBCAT003_NombreHub AS NombreHub
			,A.APPFHUBCAT003_Calle AS Calle
			,A.APPFHUBCAT003_EntreCalles AS EntreCalles
			,A.APPFHUBCAT003_Colonia AS Colonia
			,A.APPFHUBCAT003_Comentarios AS Comentarios
			,A.APPFHUBCAT003_Ciudad AS Ciudad
			,A.APPFHUBCAT003_Municipio AS Municipio
			,A.APPADMONCAT004_IdEstado AS IdEstado
			,D.APPADMONCAT004_Nombre AS NombreEstado
			,A.APPFHUBCAT003_Pais AS Pais
			,A.APPFHUBCAT003_CodigoPostal as CodigoPostal
			,A.APPFHUBCAT003_Numero AS Numero
			,A.APPFHUBCAT003_Calificacion AS CalificacionManual
			,A.APPFHUBCAT003_TieneServicioDomicilio AS TieneServicioDomicilio
			,A.APPFHUBCAT003_HorarioConfigurado AS HorarioConfigurado
			,A.APPFHUBCAT003_ServicioDomicilioConfigurado AS ServicioDomicilioConfigurado
			--,APPFHUBCAT003_Abierto AS Abierto
			,A.APPFHUBCAT003_Coordenadas.STAsText()  AS Coordenadas
			,A.APPFHUBCAT003_Coordenadas.Lat  AS Latitud
			,A.APPFHUBCAT003_Coordenadas.Long  AS Longitud
			,C.APPFHUBCAT002_ClaveContacto AS ClaveContacto
			,C.APPFHUBCAT002_NombreContacto + ' ' +
				C.APPFHUBCAT002_ApellidoPaterno + ' ' + 
				C.APPFHUBCAT002_ApellidoMaterno AS Contacto
			,C.APPFHUBCAT002_Telefono AS TelefonoContacto
			,E.APPFHUBDAT001_Asignado AS Asignado
			,E.APPFHUBDAT001_IdAsignado AS IdAsignado

		FROM APPFHUBCAT003 A 
		JOIN APPFHUBCAT001 B ON A.APPFHUBCAT001_IdHub =  B.APPFHUBCAT001_IdHub
		JOIN APPFHUBCAT002 C ON A.APPFHUBCAT002_IdContacto = C.APPFHUBCAT002_IdContacto
		JOIN APPADMONCAT004 D ON A.APPADMONCAT004_IdEstado = D.APPADMONCAT004_IdEstado
		LEFT JOIN APPFHUBDAT001 E ON E.APPFOODCAT001_IdCuenta = @IdCuenta AND A.APPFHUBCAT003_IdFoodHub = E.APPFHUBCAT003_IdFoodHub
		WHERE A.APPADMONCAT004_IdEstado = @IdEstado
		ORDER BY E.APPFHUBDAT001_Asignado DESC
	END
	
END
GO
