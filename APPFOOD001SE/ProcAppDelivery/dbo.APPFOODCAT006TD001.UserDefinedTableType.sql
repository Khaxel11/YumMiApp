USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFOODCAT006TD001]    Script Date: 13/01/2024 12:11:36 p. m. ******/
CREATE TYPE [dbo].[APPFOODCAT006TD001] AS TABLE(
	[IdRedSocial] [int] NULL DEFAULT ((0)),
	[NombreRedSocial] [varchar](50) NOT NULL,
	[NombreNumeroUsuario] [varchar](50) NOT NULL,
	[URL] [varchar](max) NULL,
	[Comentarios] [varchar](200) NULL
)
GO
