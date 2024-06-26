USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFOOD001APSPA2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		27/Nov/2023
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Pruebas de app movil
						Registro de Usuario COCINERO
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFOOD001APSPA2]
	@Opcion INT
	, @Usuario CHAR(6) = NULL
	--DATOS DEL COCINERO
	, @IdUsuario		INT			= NULL
	, @NombreCocinero	VARCHAR(50) = NULL
	, @ApellidoPaterno	VARCHAR(50) = NULL
	, @ApellidoMaterno	VARCHAR(50) = NULL
	, @Genero			CHAR(1)		= NULL
	, @FechaNacimiento  VARCHAR(15) = NULL
	, @ConRedesSociales BIT			= NULL
	, @ConVehiculo		BIT			= NULL
	--DATOS DE REDES SOCIALES
	, @APPFOODCAT006TD001 as APPFOODCAT006TD001 READONLY
	--DATOS DE SESION 
	, @NombreUsuario	VARCHAR(10) = NULL
	, @Password			VARCHAR(64) = NULL
	, @Correo			VARCHAR(100) = NULL
	, @Foto				IMAGE		 = NULL
	--DATOS DEL ESTABLECIMIENTO
	, @NombreEstablecimiento VARCHAR(100) = NULL
	, @TipoNegocio      CHAR(1)		 = NULL
	, @NumeroTel        VARCHAR(15)  = NULL
	, @Calle			VARCHAR(100) = NULL
	, @EntreCalles		VARCHAR(150) = NULL
	, @Comentarios		VARCHAR(200) = NULL
	, @Colonia			VARCHAR(100) = NULL
	, @Ciudad			VARCHAR(100) = NULL
	, @Municipio		VARCHAR(100) = NULL
	, @IdEstado			INT			 = NULL
	, @Pais				CHAR(2)		 = NULL
	, @CodigoPostal		CHAR(5)		 = NULL
	, @Numero			CHAR(6)		 = NULL
	, @ServicioDomicilio BIT		 = NULL
	--DATOS DE VEHICULO
	, @TipoVehiculo     VARCHAR(20)  = NULL
	, @DescripcionVeh	VARCHAR(50)	 = NULL
	--, @Marca			VARCHAR(20)  = NULL
	--, @Modelo			VARCHAR(20)  = NULL
	--, @Placas			VARCHAR(20)  = NULL
	--, @Color			VARCHAR(20)  = NULL
	--, @Anio				CHAR(4)		= NULL
	, @NombreTitular	VARCHAR(200) = NULL
	, @IdBanco			INT			 = NULL
	, @ProveedorTarjeta VARCHAR(10)  = NULL
	, @IdImagen			INT			 = NULL
	, @CLABE			VARCHAR(50)  = NULL
	, @NumeroCta		VARCHAR(50) = NULL
	, @IdTarjeta		INT			= NULL
AS 
BEGIN
	--REGISTRO DE NUEVA CUENTA DE UN COCINERO
	DECLARE @IdCocinero INT,
				@IdCuenta   INT,
				@ClaveEstablecimiento CHAR(6),
				@IdEstablecimiento INT,
				@Mensaje VARCHAR(MAX),
				@Correcto BIT;

	IF @Opcion = 1
	BEGIN
		IF EXISTS(SELECT APPFOODCAT001_NombreUsuario FROM APPFOODCAT001 WHERE APPFOODCAT001_NombreUsuario = @NombreUsuario)
		BEGIN
			SET @Mensaje = 'Lo sentimos, el nombre de usuario ya está en uso. Por favor, elige otro nombre de usuario.'
			SET @Correcto = 0
			SELECT @Mensaje as Message, @Correcto as Correct, '' as Value
		END
		ELSE IF EXISTS(SELECT APPFOODCAT001_Correo FROM APPFOODCAT001 WHERE APPFOODCAT001_Correo = @Correo)
		BEGIN
			SET @Mensaje = 'Lo sentimos, el correo no esta disponible.'
			SET @Correcto = 0
			SELECT @Mensaje as Message, @Correcto as Correct, '' as Value
		END
		ELSE 
		BEGIN
			DECLARE @Contra VARBINARY(MAX);
			SET @Contra = HASHBYTES('SHA2_256', @Password);

			INSERT INTO APPFOODCAT001
			(APPFOODCAT001_NombreUsuario,		APPFOODCAT001_Password,						APPFOODCAT001_Correo,
			APPFOODCAT001_Foto,					APPFOODCAT001_Activo,						APPFOODCAT001_FechaInsert)
			VALUES(
			@NombreUsuario,						@Contra,									@Correo,
			NULL,								1,											GETDATE()
			)
			SET @IdCuenta = @@IDENTITY
			SELECT 'Registro Exitoso' as Message, 1 as Correct, @IdCuenta as Value
		END
		

			
			
	END

	--CAPTURA DE DATOS PERSONALES Y DE ESTABLECIMIENTO
	IF @Opcion = 2
	BEGIN
	BEGIN TRY
	BEGIN TRAN
		--Variables de ID
		
		--Actualiza datos de foto
		IF @Foto IS NOT NULL 
		BEGIN
			UPDATE APPFOODCAT001
			SET APPFOODCAT001_Foto = @Foto
			WHERE APPFOODCAT001_IdCuenta = @IdUsuario
		END
		
		--Inserta datos del cocinero
		INSERT INTO APPFOODCAT002
		(
		APPFOODCAT001_IdCuenta,
		APPFOODCAT002_Nombre,				APPFOODCAT002_ApellidoPaterno,				APPFOODCAT002_ApellidoMaterno,
		APPFOODCAT002_Genero,				APPFOODCAT002_FechaNacimiento,				APPFOODCAT002_RedesSocialesConfiguradas,
		APPFOODCAT002_FoodHubConfigurado,	APPFOODCAT002_DatosBancariosConfigurado,	APPFOODCAT002_Activo,
		APPFOODCAT002_FechaInsert)
		VALUES(
		@IdUsuario,
		@NombreCocinero,					@ApellidoPaterno,							@ApellidoMaterno,
		@Genero,							@FechaNacimiento,							@ConRedesSociales,
		@ConVehiculo,						0,											1,					
		GETDATE()
		)

		SET @IdCocinero = @@IDENTITY

		SET @ClaveEstablecimiento = FORMAT( IDENT_CURRENT('APPFOODCAT003'),'000000')
	

		--DATOS DEL ESTABLECIMIENTO
		INSERT INTO APPFOODCAT003
		(
			APPFOODCAT001_IdCuenta,		APPFOODCAT003_ClaveEstablecimiento,			APPFOODCAT003_NombreEstablecimiento,
			APPFOODCAT003_TipoNegocio,	APPFOODCAT003_NumeroTelefonico,				APPFOODCAT003_Calle,
			APPFOODCAT003_EntreCalles,	APPFOODCAT003_Comentarios,					APPFOODCAT003_Colonia,
			APPFOODCAT003_Ciudad,		APPFOODCAT003_Municipio,					APPADMONCAT005_IdEstado,
			APPFOODCAT003_Pais,			APPFOODCAT003_CodigoPostal,					APPFOODCAT003_Numero,
			APPFOODCAT003_ServicioDomicilio,	APPFOODCAT003_TipoVehiculo,			APPFOODCAT003_DescripcionVehiculo,
			APPFOODCAT003_Activo,				APPFOODCAT003_FechaInsert
		)
		VALUES(
			@IdUsuario,					@ClaveEstablecimiento,						@NombreEstablecimiento,
			@TipoNegocio,				@NumeroTel,									@Calle,
			@EntreCalles,				@Comentarios,								@Colonia,
			@Ciudad,					@Municipio,									@IdEstado,
			@Pais,						@CodigoPostal,								CAST(@Numero AS VARCHAR(5)),
			@ServicioDomicilio,			@TipoVehiculo,								@DescripcionVeh,
			1,							GETDATE()
		)
		
		SET @IdEstablecimiento = @@IDENTITY
		--Si cuenta con redes sociales
		IF @ConRedesSociales = 1
		BEGIN
			INSERT INTO APPFOODCAT006
			(APPFOODCAT001_IdCuenta,				APPFOODCAT006_NombreRedSocial,		APPFOODCAT006_NombreNumeroUsuario,
			APPFOODCAT006_URL,						APPFOODCAT006_Comentarios,			APPFOODCAT006_Activo,				APPFOODCAT006_FechaInsert)
			SELECT 
				@IdUsuario,							NombreRedSocial,					NombreNumeroUsuario,
				URL,								Comentarios,						1,									GETDATE()
			FROM @APPFOODCAT006TD001
		END
		--Se cancela el registro del vehiculo
		----Si cuenta con vehiculo
		--IF @ConVehiculo = 1
		--BEGIN
		--	INSERT INTO APPFOODCAT007
		--	( 
		--	APPFOODCAT007_Descripcion,
		--	APPFOODCAT003_IdEstablecimiento,			APPFOODCAT007_TipoVehiculo,				APPFOODCAT007_Marca,
		--	APPFOODCAT007_Modelo,						APPFOODCAT007_Placas,					APPFOODCAT007_Color,
		--	APPFOODCAT007_Anio,							APPFOODCAT007_Activo,					APPFOODCAT007_FechaInsert
		--	)
		--	VALUES(
		--	@DescripcionVeh,
		--	@IdEstablecimiento,							@TipoVehiculo,							@Marca,
		--	@Modelo,									@Placas,								@Color,
		--	@Anio,										1,										GETDATE()
		--	)
		--END

			SELECT '<head><title>Registro Exitoso</title><style>body{font-family:Arial,sans-serif;text-align:center;background-color:#f4f4f4;margin:0;padding:20px;}.message-container{background-color:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);padding:20px;max-width:400px;margin:0 auto;}h1{color:#4CAF50;}p{color:#333;}.contact-link{color:#007BFF;text-decoration:none;font-weight:bold;}</style></head><body><div class="message-container"><h1>¡Registro Exitoso!</h1><p>Has sido registrado como cocinero en nuestra plataforma. Ahora puedes empezar a gestionar tu establecimiento y ofrecer deliciosas opciones a tus próximos clientes.</p></div></body>'
			--<p>¡Bienvenido a nuestra comunidad gastronómica! Si tienes alguna pregunta o necesitas asistencia, no dudes en <a href="#" class="contact-link">ponerte en contacto</a> con nuestro equipo de soporte.</p>
			as Message, 1 AS Correct

		COMMIT TRAN
		--TERMINA TRANSACCION
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		SELECT ERROR_MESSAGE() + '  No. de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + '  Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(10)) AS Message
	END CATCH

	END

	
	--Guarda los datos bancarios de un usuario
	IF @Opcion = 5
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				
				IF NOT EXISTS(SELECT 1 FROM APPFOODCAT004 WHERE APPFOODCAT004_NumeroCuenta = @NumeroCta)
				BEGIN
					IF EXISTS(SELECT 1 FROM APPFOODCAT004 WHERE APPFOODCAT004_NumeroCuenta = @NumeroCta AND APPFOODCAT001_IdCuenta = @IdUsuario)
					BEGIN
						UPDATE APPFOODCAT004
						SET APPFOODCAT004_Activo = 1
							,APPFOODCAT004_FechaUpdate = GETDATE()
						WHERE APPFOODCAT004_NumeroCuenta = @NumeroCta AND APPFOODCAT001_IdCuenta = @IdUsuario
						AND APPFOODCAT004_Activo = 0
					END

					ELSE
					BEGIN
						INSERT INTO APPFOODCAT004
							(
								APPFOODCAT001_IdCuenta
								, APPFOODCAT004_NombreTitular
								, APPFOODCAT004_NumeroCuenta
								, APPADMONCAT009_IdBanco
								, APPFOODCAT004_ProveedorTarjeta
								, APPFOODCAT004_IdImagen
								, APPFOODCAT004_CLABE
								, APPFOODCAT008_IdMoneda
								, APPFOODCAT004_FechaInsert
								, APPFOODCAT004_Activo
							)
							VALUES(
							 @IdUsuario
							, @NombreTitular
							, @NumeroCta
							, @IdBanco
							, @ProveedorTarjeta
							, @IdImagen
							, @CLABE
							, 1
							, GETDATE()
							, 1)
					END
					SELECT 'Cuenta registrada Correctamente' as Message, 1 as Correct
				END
				ELSE
				BEGIN
					SELECT 'Cuenta invalida' as Message, 0 as Correct
				END
				COMMIT TRAN
				--TERMINA TRANSACCION
			END TRY
			BEGIN CATCH
				ROLLBACK TRAN
				SELECT ERROR_MESSAGE() + '  No. de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + '  Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(10)) AS Message
			END CATCH
	END

	IF @Opcion = 6
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				
				UPDATE APPFOODCAT004
					SET APPFOODCAT004_Activo = 0
						, APPFOODCAT004_FechaDelete = GETDATE()
				WHERE APPFOODCAT001_IdCuenta = @IdUsuario
				AND APPFOODCAT004_NumeroCuenta = @NumeroCta
				AND APPFOODCAT004_Activo = 1
				AND APPFOODCAT004_IdCuentaBancaria = @IdTarjeta

				SELECT 'Se ha eliminado la tarjeta relacionada a la cuenta correctamente', 1 as Correct
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
			SELECT ERROR_MESSAGE() + '  No. de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + '  Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(10)) AS Message

		END CATCH
	END
END
GO
