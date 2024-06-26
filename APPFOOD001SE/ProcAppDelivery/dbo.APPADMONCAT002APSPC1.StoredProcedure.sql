USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT002APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMONCAT002APSPC1]
	@Opcion INT,
	@Filtro VARCHAR(50) = NULL
AS
BEGIN


	IF @Opcion = 1
	BEGIN
		SELECT 
			APPFPRODCAT001_IdTipo as IdTipo
			,APPFPRODCAT001_NombreTipo as NombreTipo
			, APPFPRODCAT001_Descripcion as Descripcion
			, APPFPRODCAT001_Foto as Foto
		FROM APPFPRODCAT001
		WHERE APPFPRODCAT001_Activo = 1
		AND APPFPRODCAT001_NombreTipo LIKE '%' + ISNULL(@Filtro,
			APPFPRODCAT001_NombreTipo
		) + '%'
	END
END




GO
