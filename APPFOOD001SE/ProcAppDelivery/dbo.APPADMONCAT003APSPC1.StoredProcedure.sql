USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPADMONCAT003APSPC1]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[APPADMONCAT003APSPC1]
	@Opcion INT,
	@Filtro VARCHAR(50) = NULL,
	@IdTipoUsuario INT = NULL
AS
BEGIN

	IF @Opcion = 1
	BEGIN
		SELECT 
			APPADMONCAT007_IdTipoNotificacion as IdTipoNotificacion
			,APPADMONCAT007_DescripcionNotificacion as Descripcion
			, Tipos.APPADMONCAT006_IdTipoUsuario as IdTipoUsuario
			, TiposUsuarios.APPADMONCAT006_TipoUsuario as TipoUsuario
			, APPADMONCAT007_Icono as Icono
		FROM APPADMONCAT007 Tipos
		JOIN APPADMONCAT006 TiposUsuarios 
			ON Tipos.APPADMONCAT006_IdTipoUsuario = TiposUsuarios.APPADMONCAT006_IdTipoUsuario
		WHERE APPADMONCAT007_Activo = 1
		AND APPADMONCAT007_DescripcionNotificacion LIKE '%' + ISNULL(@Filtro,
			APPADMONCAT007_DescripcionNotificacion
		) + '%'
		AND TiposUsuarios.APPADMONCAT006_IdTipoUsuario = ISNULL(@IdTipoUsuario,TiposUsuarios.APPADMONCAT006_IdTipoUsuario )
	END

	IF @Opcion = 2 
	BEGIN
		SELECT 
			APPADMONCAT006_IdTipoUsuario as IdTipoUsuario,
			APPADMONCAT006_TipoUsuario as TipoUsuario,
			APPADMONCAT006_Descripcion as Descripcion
		FROM APPADMONCAT006
		WHERE APPADMONCAT006_Activo = 1

	END


END




GO
