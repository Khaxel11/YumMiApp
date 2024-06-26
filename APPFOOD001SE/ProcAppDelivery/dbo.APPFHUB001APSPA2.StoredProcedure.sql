USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFHUB001APSPA2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		03/Enero/2024
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Asignación de FoodHubs a Cocinero
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFHUB001APSPA2]
	@Opcion INT
	,@IdCuenta INT = NULL
	,@IdFoodHub INT = NULL
	,@Predeterminado BIT = NULL
	,@IdAsignado INT = NULL
AS 
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DECLARE @Mensaje VARCHAR(MAX)
			--===================================EMPIEZAN ACCIONES===================================
			--ASIGNAR UN FOODHUB
		
			IF @Opcion = 1
			BEGIN
				--Si ya estaba asignado, reactivar
				IF EXISTS(SELECT APPFHUBCAT003_IdFoodHub FROM APPFHUBDAT001 WHERE APPFOODCAT001_IdCuenta = @IdCuenta AND APPFHUBCAT003_IdFoodHub = @IdFoodHub AND APPFHUBDAT001_Activo = 0)
				BEGIN
					UPDATE APPFHUBDAT001
						SET APPFHUBDAT001_Activo = 1
						, APPFHUBDAT001_Asignado = 1
						, APPFHUBDAT001_FechaUpdate = GETDATE()
						WHERE APPFHUBDAT001_IdAsignado = @IdAsignado
					SET @Mensaje = 'Reactivado'
				
				END
				ELSE
				BEGIN
					INSERT INTO APPFHUBDAT001
					(
						APPFOODCAT001_IdCuenta,		APPFHUBCAT003_IdFoodHub,	APPFHUBDAT001_Predeterminado,
						APPFHUBDAT001_Asignado,		APPFHUBDAT001_Activo,		APPFHUBDAT001_FechaInsert

					)
					VALUES(
						@IdCuenta,					@IdFoodHub,					@Predeterminado, 
						1 ,							1,							GETDATE()
					)
					SET @Mensaje = 'Asignado'
				END
				
				SELECT @Mensaje AS Mensaje, 1 as Result, 1 as IdAlerta
			END

			--QUITA LA ASIGNACIÓN DE UN FOODHUB
			IF @Opcion = 2
			BEGIN
				UPDATE APPFHUBDAT001
						SET APPFHUBDAT001_Activo = 0
						, APPFHUBDAT001_Asignado = 0
						, APPFHUBDAT001_FechaDelete = GETDATE()
						WHERE APPFHUBDAT001_IdAsignado = @IdAsignado
					SET @Mensaje = 'Eliminado'
					SELECT @Mensaje AS Mensaje, 1 as Result, 1 as IdAlerta
			END


			--===================================TERMINAN OPCIONES===================================
			
			COMMIT TRAN
		END TRY

		BEGIN CATCH
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;

			SELECT @Mensaje = ERROR_MESSAGE() + ' - Número de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(20)) + ' - Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(20))

			
			SELECT 2 AS IdAlerta, @Mensaje  AS Mensaje, CAST(0 AS BIT) AS Result
			

		END CATCH

		
	
END


GO
