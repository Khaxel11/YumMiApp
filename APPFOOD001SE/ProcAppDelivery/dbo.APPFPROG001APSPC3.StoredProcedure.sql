USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROG001APSPC3]    Script Date: 04/04/2024 03:21:15 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		02/04/2024 
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Acciones varias de la programación de un producto
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROG001APSPC3]
	@Opcion INT
	,@IdProgramacion INT = NULL
	,@IdProducto INT = NULL
	,@IdFoodHub INT = NULL
	,@IdCuenta INT = NULL
	,@Fecha VARCHAR(20) = NULL
	,@IdFechaProgramada INT = NULL
AS 
BEGIN
	--CONFIRMAR LA PREPARACION DE UN PEDIDO EN UNA FECHA
	IF @Opcion = 1
	BEGIN
		UPDATE APPFPROGDAT002
		SET APPFPROGDAT002_Confirmado = 1
		WHERE APPFPROGDAT002_IdFechaProgramada = @IdFechaProgramada
		AND APPFPROGDAT001_IdProgramacion = @IdProgramacion

		IF @@ROWCOUNT > 0
		BEGIN
			SELECT 'Fecha Confirmada' as Message, 1 as Correct, 1 as Icon
		END
		ELSE 
		BEGIN
			SELECT 'Hubo un error al confirmar la fecha' as Message, 0 as Correct, 2 as Icon
		END
	END
		
END



GO
