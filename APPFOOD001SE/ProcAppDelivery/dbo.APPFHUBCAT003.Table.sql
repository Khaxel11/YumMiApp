USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBCAT003]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBCAT003](
	[APPFHUBCAT003_IdFoodHub] [int] IDENTITY(1,1) NOT NULL,
	[APPFHUBCAT003_ClaveFoodHub] [char](6) NOT NULL,
	[APPFHUBCAT001_IdHub] [int] NOT NULL,
	[APPFHUBCAT002_IdContacto] [int] NOT NULL,
	[APPFHUBCAT003_NombreHub] [varchar](200) NOT NULL,
	[APPFHUBCAT003_Calle] [varchar](50) NOT NULL,
	[APPFHUBCAT003_EntreCalles] [varchar](100) NOT NULL,
	[APPFHUBCAT003_Colonia] [varchar](50) NOT NULL,
	[APPFHUBCAT003_Comentarios] [varchar](max) NULL,
	[APPFHUBCAT003_Ciudad] [varchar](50) NOT NULL,
	[APPFHUBCAT003_Municipio] [varchar](50) NOT NULL,
	[APPADMONCAT004_IdEstado] [int] NOT NULL,
	[APPFHUBCAT003_Pais] [char](2) NOT NULL,
	[APPFHUBCAT003_CodigoPostal] [char](5) NOT NULL,
	[APPFHUBCAT003_Numero] [varchar](6) NOT NULL,
	[APPFHUBCAT003_Calificacion] [decimal](2, 1) NULL,
	[APPFHUBCAT003_TieneServicioDomicilio] [bit] NOT NULL,
	[APPFHUBCAT003_HorarioConfigurado] [bit] NOT NULL,
	[APPFHUBCAT003_ServicioDomicilioConfigurado] [bit] NOT NULL,
	[APPFHUBCAT003_Abierto] [bit] NULL,
	[APPFHUBCAT003_Coordenadas] [geography] NULL,
	[APPFHUBCAT003_Activo] [bit] NULL,
	[APPFHUBCAT003_FechaInsert] [datetime] NOT NULL,
	[APPFHUBCAT003_UsuarioInsert] [char](6) NOT NULL,
	[APPFHUBCAT003_FechaUpdate] [datetime] NULL,
	[APPFHUBCAT003_UsuarioUpdate] [char](6) NULL,
	[APPFHUBCAT003_FechaDelete] [datetime] NULL,
	[APPFHUBCAT003_UsuarioDelete] [char](6) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ('') FOR [APPFHUBCAT003_Comentarios]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ('MX') FOR [APPFHUBCAT003_Pais]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ((0)) FOR [APPFHUBCAT003_TieneServicioDomicilio]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ((0)) FOR [APPFHUBCAT003_HorarioConfigurado]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ((0)) FOR [APPFHUBCAT003_ServicioDomicilioConfigurado]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ((0)) FOR [APPFHUBCAT003_Abierto]
GO
ALTER TABLE [dbo].[APPFHUBCAT003] ADD  DEFAULT ((1)) FOR [APPFHUBCAT003_Activo]
GO
