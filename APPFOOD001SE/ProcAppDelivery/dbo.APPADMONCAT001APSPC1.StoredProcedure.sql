USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT001APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMONCAT001APSPC1]
	@Opcion INT,
	@Filtro VARCHAR(50) = NULL
AS
BEGIN

	IF @Opcion = 1
	BEGIN
		SELECT 
			APPADMONCAT001_IdCargo as IdCargo
			,APPADMONCAT001_ClaveCargo as ClaveCargo
			, APPADMONCAT001_NombreCargo as NombreCargo
		FROM APPADMONCAT001
		WHERE APPADMONCAT001_Activo = 1
		AND CONCAT(APPADMONCAT001_ClaveCargo, APPADMONCAT001_NombreCargo) LIKE '%' + ISNULL(@Filtro,
			CONCAT(APPADMONCAT001_ClaveCargo, APPADMONCAT001_NombreCargo)
		) + '%'
	END
END




GO
