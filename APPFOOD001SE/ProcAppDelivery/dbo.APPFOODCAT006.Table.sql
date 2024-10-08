USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT006]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT006](
	[APPFOODCAT006_IdRedSocial] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODCAT006_NombreRedSocial] [varchar](20) NOT NULL,
	[APPFOODCAT006_NombreNumeroUsuario] [varchar](100) NOT NULL,
	[APPFOODCAT006_URL] [varchar](max) NULL,
	[APPFOODCAT006_Comentarios] [varchar](max) NULL,
	[APPFOODCAT006_Activo] [bit] NOT NULL,
	[APPFOODCAT006_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT006_FechaUpdate] [datetime] NULL,
	[APPFOODCAT006_FechaDelete] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFOODCAT006] ADD  DEFAULT ((1)) FOR [APPFOODCAT006_Activo]
GO
