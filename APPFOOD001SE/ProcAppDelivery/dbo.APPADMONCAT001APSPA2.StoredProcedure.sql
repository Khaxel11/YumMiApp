USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT001APSPA2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMONCAT001APSPA2]
	@Opcion INT,
	@ClaveCargo VARCHAR(10) = NULL,
	@NombreCargo VARCHAR(50) = NULL,
	@Usuario VARCHAR(6) = NULL,
	@IdCargo INT = NULL

	
AS
BEGIN
	DECLARE @Mensaje VARCHAR(100)
	, @Correcto BIT
	, @Icon TINYINT
	-- 1 SUCCESS, 2 ERROR , 3 : WARNING
	--INSERTAR NUEVO CARGO
	IF @Opcion = 1
	BEGIN
		
		IF EXISTS(SELECT APPADMONCAT001_ClaveCargo FROM APPADMONCAT001 WHERE APPADMONCAT001_ClaveCargo = @ClaveCargo
			AND APPADMONCAT001_Activo = 0)
		BEGIN
			UPDATE APPADMONCAT001
			SET APPADMONCAT001_Activo = 1,
			APPADMONCAT001_FechaUpdate = GETDATE()
			WHERE APPADMONCAT001_ClaveCargo = @ClaveCargo

			SET @Mensaje = 'Registro nuevamente activado'
			SET @Correcto = 1
			SET @Icon = 1
		END
		ELSE IF EXISTS(SELECT APPADMONCAT001_ClaveCargo FROM APPADMONCAT001 WHERE APPADMONCAT001_ClaveCargo = @ClaveCargo
			AND APPADMONCAT001_Activo = 1)
			BEGIN
				SET @Mensaje = 'Ya existe un registro con la misma clave'
				SET @Correcto = 1
				SET @Icon = 3
			END
		ELSE 
		BEGIN
			INSERT INTO APPADMONCAT001
			(APPADMONCAT001_ClaveCargo,
			APPADMONCAT001_NombreCargo,
			APPADMONCAT001_Activo,
			APPADMONCAT001_FechaInsert,
			APPADMONCAT001_UsuarioInsert
			)
			VALUES(
				@ClaveCargo,
				@NombreCargo,
				1,
				GETDATE(),
				@Usuario
			)

			SET @Mensaje = '¡Cargo insertado correctamente!'
			SET @Correcto = 1
			SET @Icon = 1
		END

		SELECT @Mensaje as Mensaje, @Correcto as Correcto, @Icon as Icon
		
	END
	
	IF @Opcion = 2
	BEGIN
		UPDATE APPADMONCAT001
		SET APPADMONCAT001_NombreCargo = @NombreCargo,
			APPADMONCAT001_FechaUpdate = GETDATE(),
			APPADMONCAT001_UsuarioUpdate = @Usuario
		WHERE APPADMONCAT001_IdCargo = @IdCargo
		
		SELECT 'Actualizado correctamente' as Mensaje, 1 as Correcto, 1 as Icon
	END

	IF @Opcion = 3
	BEGIN
		UPDATE APPADMONCAT001
		SET APPADMONCAT001_Activo = 0,
			APPADMONCAT001_FechaDelete = GETDATE(),
			APPADMONCAT001_UsuarioDelete = @Usuario
		WHERE APPADMONCAT001_IdCargo = @IdCargo

		SELECT 'Eliminado correctamente' as Mensaje, 1 as Correcto, 1 as Icon
	END
END




GO
