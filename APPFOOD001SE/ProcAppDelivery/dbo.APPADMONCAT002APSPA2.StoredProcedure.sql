USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT002APSPA2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
	FECHA CREACION:		24/02/2024
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Registro de nuevos tipos de productos
						
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPADMONCAT002APSPA2]
	@Opcion INT,
	@IdTipo INT = NULL,
	@NombreTipo VARCHAR(50) = NULL,
	@Descripcion VARCHAR(120) = NULL,
	@Foto VARCHAR(MAX) = NULL,
	@Usuario VARCHAR(6) = NULL
AS
BEGIN
	--Usamos try para validar que no sucedan errores
	BEGIN TRY
		--Comenzamos una transaccion para que en caso de que ocurra un error revierta los cambios
		BEGIN TRAN
	
		--Metemos todas las opciones dentro de la transacción para evitar estar haciendo uno por uno
--============================================================================================================================
			/*****************************************
			*****************GUARDAR******************
			*****************************************/
			IF @Opcion = 1
			BEGIN
				INSERT INTO APPFPRODCAT001
				(APPFPRODCAT001_NombreTipo,		APPFPRODCAT001_Descripcion,		APPFPRODCAT001_Foto,
				APPFPRODCAT001_Activo,			APPFPRODCAT001_FechaInsert)
				VALUES(
				@NombreTipo,					@Descripcion,					@Foto,
				1,								GETDATE()
				)
				

				--USAR @@ROWCOUNT funciona para saber si hubo filas afectadas en el ULTIMO proceso

				--Si hubo filas afectadas mayores a cero, hubo una afectación en el ultimo proceso
				IF @@ROWCOUNT > 0
				BEGIN
					SELECT '¡Tipo de Producto Guardado Correctamente!' as Mensaje, 1 as Correcto, 1 as Icon --Success
				END
				ELSE
				--Si no hubo afectaciones
				BEGIN
					SELECT 'Ocurrio un error' as Mensaje, 1 as Correcto, 0 as Correcto, 2 as Icon --Danger
				END
			END

			/*****************************************
			*****************EDITAR******************
			*****************************************/
			IF @Opcion = 2
			BEGIN
				UPDATE APPFPRODCAT001
				SET APPFPRODCAT001_NombreTipo = @NombreTipo
					,APPFPRODCAT001_Descripcion = @Descripcion
					,APPFPRODCAT001_Foto = @Foto
					, APPFPRODCAT001_FechaUpdate = GETDATE()
				WHERE APPFPRODCAT001_IdTipo = @IdTipo

				SELECT '¡Tipo de Producto Actualizado Correctamente!' as Mensaje, 1 as Correcto, 1 as Icon --Success

			END

			/*****************************************
			*****************ELIMINAR*****************
			*****************************************/
			IF @Opcion = 3
			BEGIN
				UPDATE APPFPRODCAT001
				SET 
					APPFPRODCAT001_Activo = 0
					, APPFPRODCAT001_FechaDelete = GETDATE()
				WHERE APPFPRODCAT001_IdTipo = @IdTipo

				SELECT '¡Tipo de Producto Eliminado Correctamente!' as Mensaje, 1 as Correcto, 1 as Icon --Success
			END
		--Si nada pasa en el proceso de acciones y todo es correcto
		--Guardamos la transacción y los cambios realizados en los registros
		COMMIT TRAN
--============================================================================================================================
		--TERMINA TRANSACCION

	--Termina y cierra el try
	END TRY
	--Si ocurre un error al momento de ejecución iniciamos el catch
	BEGIN CATCH
		--Cancelamos la transacción usando rollback
		ROLLBACK TRAN
		--Regresamos en un objeto los valores de mensaje
		SELECT ERROR_MESSAGE() + '  No. de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + '  Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(10)) AS Mensaje, 0 AS Correcto, 2 as Icon --Danger
	--Termina Catch
	END CATCH
END



GO
