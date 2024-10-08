USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT004APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMONCAT004APSPC1]
	@Opcion INT,
	@Filtro VARCHAR(50) = NULL
AS
BEGIN

	IF @Opcion = 1
	BEGIN
		SELECT 
			APPMENUCAT001_IdSistema as IdSistema
			,APPMENUCAT001_NomenclaturaSistema as Nomenclatura
			, APPMENUCAT001_Sistema as Sistema
			, APPMENUCAT001_Descripcion as Descripcion
		FROM APPMENUCAT001
		WHERE APPMENUCAT001_Activo = 1
		AND CONCAT(APPMENUCAT001_NomenclaturaSistema, APPMENUCAT001_Sistema) LIKE '%' + ISNULL(@Filtro,
			CONCAT(APPMENUCAT001_NomenclaturaSistema, APPMENUCAT001_Sistema)
		) + '%'
	END
END
GO
