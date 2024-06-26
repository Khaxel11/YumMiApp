USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPMENUCAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPMENUCAT002](
	[APPMENUCAT002_IdVisual] [int] IDENTITY(1,1) NOT NULL,
	[APPMENUCAT002_Titulo] [varchar](80) NOT NULL,
	[APPMENUCAT002_Subtitulo] [varchar](150) NULL,
	[APPMENUCAT002_Imagen] [varbinary](max) NULL,
	[APPMENUCAT001_IdSistema] [int] NOT NULL,
	[APPMENUCAT002_IdUsoMenu] [int] NOT NULL,
	[APPMENUCAT002_DescripcionUso] [varchar](80) NOT NULL,
	[APPMENUCAT002_EsProgramado] [bit] NULL,
	[APPMENUCAT002_FechaInicioProgramado] [datetime] NULL,
	[APPMENUCAT002_DiasApartirProgramado] [int] NULL,
	[APPMENUCAT002_Activo] [bit] NOT NULL,
	[APPMENUCAT002_UsuarioInsert] [varchar](6) NOT NULL,
	[APPMENUCAT002_FechaInsert] [smalldatetime] NOT NULL,
	[APPMENUCAT002_UsuarioUpdate] [varchar](6) NULL,
	[APPMENUCAT002_FechaUpdate] [smalldatetime] NULL,
	[APPMENUCAT002_UsuarioDelete] [varchar](6) NULL,
	[APPMENUCAT002_FechaDelete] [smalldatetime] NULL,
	[APPMENUCAT002_RutaRedirecciona] [nchar](100) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPMENUCAT002] ADD  DEFAULT ((0)) FOR [APPMENUCAT002_EsProgramado]
GO
ALTER TABLE [dbo].[APPMENUCAT002] ADD  DEFAULT ((1)) FOR [APPMENUCAT002_Activo]
GO
