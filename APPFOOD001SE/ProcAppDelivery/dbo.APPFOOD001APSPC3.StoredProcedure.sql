USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFOOD001APSPC3]    Script Date: 13/01/2024 12:11:37 p. m. ******/
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
CREATE PROCEDURE [dbo].[APPFOOD001APSPC3]
	@Opcion INT
	,@NombreUsuario VARCHAR(10) = NULL
	,@IdCuenta INT = NULL
	,@Password VARCHAR(64) = NULL
	,@Id INT = NULL
AS 
BEGIN
	--VERIFICA QUE NO EXISTA UN NOMBRE DE USUARIO IGUAL
	IF @Opcion = 0
	BEGIN
		DECLARE @Login BIT = 0, @Registro BIT = 0
		IF EXISTS(SELECT 
			1
		FROM APPFOODCAT001 A
		WHERE APPFOODCAT001_NombreUsuario = @NombreUsuario --'ADMIN'
		AND 
		APPFOODCAT001_Password = HASHBYTES('SHA2_256', @Password/*'123'*/)
		)
		BEGIN
			SET @Login = 1
		END

		IF @Login = 1
		BEGIN
			

			SELECT 1 as IsLoged
			, APPFOODCAT001_IdCuenta as IdCuenta
			, APPFOODCAT001_NombreUsuario as UserName
			, APPFOODCAT001_Correo as Email
			, APPFOODCAT001_Foto as Picture
			, (SELECT COUNT(APPFOODCAT001_IdCuenta) FROM APPFOODCAT002 X WHERE X.APPFOODCAT001_IdCuenta = A.APPFOODCAT001_IdCuenta) as Value
			FROM APPFOODCAT001 A
			WHERE APPFOODCAT001_NombreUsuario = @NombreUsuario --'ADMIN'
			AND 
			APPFOODCAT001_Password = HASHBYTES('SHA2_256', @Password/*'123'*/)
		END
		ELSE
		BEGIN
			SELECT 0 AS IsLoged
		END

	END
	IF @Opcion = 1
	BEGIN
		IF EXISTS(SELECT APPFOODCAT001_NombreUsuario FROM APPFOODCAT001 WHERE APPFOODCAT001_NombreUsuario = @NombreUsuario)
		BEGIN
			SELECT 'Nombre de usuario no disponible.' as Message, 0 as Correct, '' as Value
		END
		ELSE
		BEGIN
			SELECT 1 as Correct, 1 as Value
		END
	END
	--Datos por ID de Cuenta cuando el usuario se registre exitosamente
	IF @Opcion = 2
	BEGIN
		SELECT 
			APPFOODCAT001_IdCuenta as IdCuenta
			, APPFOODCAT001_NombreUsuario as UserName
			, APPFOODCAT001_Correo as Email
			, APPFOODCAT001_Foto as Picture
		FROM APPFOODCAT001 WHERE APPFOODCAT001_IdCuenta = @IdCuenta
	END

	IF @Opcion = 3
	BEGIN
		SELECT 
			APPFOODCAT002_IdCocinero as IdCocinero
			,a.APPFOODCAT002_Nombre as NombreCocinero
			,APPFOODCAT002_ApellidoPaterno as ApellidoPaterno
			,APPFOODCAT002_ApellidoMaterno as ApellidoMaterno
			,dbo.INITCAP(APPFOODCAT002_Nombre + ' ' + APPFOODCAT002_ApellidoPaterno + ' ' + APPFOODCAT002_ApellidoMaterno) as NombreCompleto
			,APPFOODCAT002_Genero as Genero
			,APPFOODCAT002_RedesSocialesConfiguradas as RedesSocialesConfig
			,APPFOODCAT002_FoodHubConfigurado as HubConfigurado
			,APPFOODCAT002_DatosBancariosConfigurado as BancoConfig
			,APPFOODCAT003_IdEstablecimiento as IdEstablecimiento
			,APPFOODCAT003_ClaveEstablecimiento as CveEstablecimiento
			,APPFOODCAT003_NombreEstablecimiento as NombreEstablecimiento
			,APPFOODCAT003_TipoNegocio as TipoNegocio
			,APPFOODCAT003_NumeroTelefonico as NumTelefono
			,APPFOODCAT003_Calle as Calle
			,APPFOODCAT003_EntreCalles as EntreCalles
			,APPFOODCAT003_Comentarios as Comentarios
			,APPFOODCAT003_Colonia as Colonia
			,APPFOODCAT003_Ciudad as Ciudad
			,APPADMONCAT005_IdEstado as IdEstado
			,APPFOODCAT003_Pais as Pais
			,APPFOODCAT003_CodigoPostal as CP
			,APPFOODCAT003_Numero as Numero
			,APPFOODCAT003_TipoVehiculo as TipoVehiculo
			,APPFOODCAT003_Calificacion as Calificacion
		FROM 
		APPFOODCAT002 A 
		JOIN APPFOODCAT003 B 
			ON A.APPFOODCAT001_IdCuenta = B.APPFOODCAT001_IdCuenta
		WHERE A.APPFOODCAT001_IdCuenta = @IdCuenta
		AND A.APPFOODCAT002_Activo = 1
		AND B.APPFOODCAT003_Activo = 1
	END
	--Listado de Paises
	IF @Opcion = 6
	BEGIN
		SELECT 
			APPADMONCAT003_IdPais AS IdPais
			,APPADMONCAT003_Pais as NombrePais
			, APPADMONCAT003_Abreviacion as Abreviacion
		FROM APPADMONCAT003

		
	END

	--Listado de Estados
	IF @Opcion = 7
	BEGIN
		SELECT 
			APPADMONCAT004_IdEstado AS IdEstado,
			APPADMONCAT004_Clave as Clave,
			APPADMONCAT004_Nombre AS Nombre,
			APPADMONCAT004_Abreviacion AS Abr,
			APPADMONCAT003_IdPais
		FROM APPADMONCAT004
		WHERE APPADMONCAT004_Activo = 1
		AND APPADMONCAT003_IdPais =  @Id
	END
	--Listado Municipios
	IF @Opcion = 8
	BEGIN
		SELECT 
			APPADMONCAT005_IdMunicipio AS IdMunicipio
			, APPADMONCAT004_IdEstado AS IdEstado
			, APPADMONCAT005_ClaveLocalidad as ClaveLocalidad
			, APPADMONCAT005_Nombre as Nombre
			, APPADMONCAT005_Longitud as Longitud
			, APPADMONCAT005_Latitud as Latitud
		FROM APPADMONCAT005 
		WHERE APPADMONCAT004_IdEstado = @Id
		ORDER BY APPADMONCAT005_Nombre
		
	END
	
END

GO
