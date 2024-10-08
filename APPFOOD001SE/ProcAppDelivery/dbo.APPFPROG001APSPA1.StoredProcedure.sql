USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROG001APSPA1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		23/03/2024 
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Programación de un producto a una o varias fechas al mismo tiempo
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROG001APSPA1]
	@Opcion INT
	,@IdProgramacion INT = NULL
	,@IdProducto INT = NULL
	,@IdFoodHub INT = NULL
	,@Descripcion VARCHAR(200) = NULL
	,@NotificacionesActivadas BIT = NULL
	,@IdCuenta INT = NULL
	,@TipoProgramacion CHAR(1) = NULL
	,@Programacion APPFPROGDAT002TD001 READONLY
AS 
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DECLARE @Mensaje VARCHAR(MAX), @RowCount INT, @Correcto BIT
			--===================================EMPIEZAN ACCIONES===================================
			
			INSERT INTO APPFPROGDAT001
			(APPFPRODCAT005_IdProducto,			APPFHUBCAT003_IdFoodHub,		APPFPROGDAT001_Descripcion,			APPFPROGDAT001_NotificacionesActivas,
			APPFPROGDAT001_Activo,				APPFPROGDAT001_FechaInsert,		APPFPROGDAT001_UsuarioInsert)
			VALUES(
			@IdProducto,						@IdFoodHub,						@Descripcion,						@NotificacionesActivadas,
			1,									GETDATE(),						@IdCuenta
			)

			 SET @IdProgramacion = @@IDENTITY
			 SET @RowCount = @@ROWCOUNT

			 IF @RowCount <= 0 BEGIN GOTO ERROR END


			MERGE APPFPROGDAT002 AS destino -- <--- tabla principal a afectar
					USING @Programacion AS origen --<-- tabla temporal
					ON (destino.APPFPROGDAT002_IdFechaProgramada = origen.IdFechaProgramada) --- relacion que tiene que cumplir

				   /* WHEN MATCHED AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN --- si encuentra relacion entonces significa que existe en ambos lados (actualizar)
						UPDATE
						SET 
							APPFPRODCAT007_FechaUpdate = GETDATE(),
							APPFPRODCAT007_UsuarioUpdate = @Usuario*/

					WHEN NOT MATCHED BY TARGET AND (origen.IdFechaProgramada = 0 ) THEN --- si no existe relacion entonces signfiica que es nuevo
						INSERT (
						APPFPROGDAT001_IdProgramacion,		APPFPROGDAT002_Fecha,		APPFPROGDAT002_Cantidad, 
						APPFPROGDAT002_Interesados,			APPFPROGDAT002_Confirmado,	APPFPROGDAT002_NotificacionesEnviadas,
						APPFPROGDAT002_TipoProgramacion,	APPFPROGDAT002_FechaInsert,
						APPFPROGDAT002_Activo)
						VALUES (
						@IdProgramacion,					origen.Fecha,				origen.Cantidad,
						0,									0,			0,
						origen.TipoProgramacion,					GETDATE(),
						1)
    
					WHEN NOT MATCHED BY SOURCE AND destino.APPFPROGDAT001_IdProgramacion = @IdProgramacion THEN ---< si existe actualmente, pero se elimina de la lista pasa a estatus 0
					UPDATE SET 
					APPFPROGDAT002_Activo = 0, APPFPROGDAT002_FechaDelete = GETDATE();

					SET @RowCount = @@ROWCOUNT
					IF @RowCount > 0
					BEGIN
						SET @Mensaje = 'OK'
						SET @Correcto = 1
					END
					ELSE
					BEGIN
						SET @Mensaje = 'No se ha afectado ningun registro de la programación'
						SET @Correcto = 0
						GOTO Error
					END

			

			Error: 
			SELECT @Mensaje as Message, @Correcto as Correct, @RowCount as Value


			--===================================TERMINAN OPCIONES===================================
			
			COMMIT TRAN
		END TRY

		BEGIN CATCH
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;

			SELECT @Mensaje = ERROR_MESSAGE() + ' - Número de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(20)) + ' - Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(20))

			
			SELECT 2 AS IdAlerta, @Mensaje  AS Message, CAST(0 AS BIT) AS Correct
			

		END CATCH

		
	
END


GO
