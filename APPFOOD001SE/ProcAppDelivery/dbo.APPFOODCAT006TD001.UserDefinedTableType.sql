USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFOODCAT006TD001]    Script Date: 04/04/2024 03:21:13 p. m. ******/
CREATE TYPE [dbo].[APPFOODCAT006TD001] AS TABLE(
	[IdRedSocial] [int] NULL DEFAULT ((0)),
	[NombreRedSocial] [varchar](50) NOT NULL,
	[NombreNumeroUsuario] [varchar](50) NOT NULL,
	[URL] [varchar](max) NULL,
	[Comentarios] [varchar](200) NULL
)
GO
