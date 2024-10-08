USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMON001APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMON001APSPC1]
	@Opcion INT,
	@NombreUsuario VARCHAR(50) = NULL,
	@Password AS NVARCHAR(64) = NULL
AS
BEGIN

	IF @Opcion = 1
	BEGIN
		DECLARE @HashPassword AS VARBINARY(64); 

		SET @Password = CONVERT(VARBINARY(64), @Password, 2);

		SELECT @HashPassword = CONVERT(VARBINARY(64), APPADMONCAT010_Password, 2) 
		FROM APPADMONCAT010
		WHERE APPADMONCAT010_NombreUsuario = @NombreUsuario;

		IF @HashPassword IS NOT NULL AND @HashPassword = @Password
		BEGIN
			
			SELECT 1 AS IsLogged,
				APPADMONCAT010_IdEmpleado AS IdEmpleado,
				APPADMONCAT010_NombreUsuario AS UserName,
				APPADMONCAT010_Correo AS Email,
				APPADMONCAT010_Foto AS Picture
			FROM APPADMONCAT010
			WHERE APPADMONCAT010_NombreUsuario = @NombreUsuario;
		END
		ELSE
		BEGIN
			SELECT 0 AS IsLogged;
		END
	END
END

GO
