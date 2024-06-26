USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBCAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBCAT002](
	[APPFHUBCAT002_IdContacto] [int] IDENTITY(1,1) NOT NULL,
	[APPFHUBCAT002_ClaveContacto] [char](6) NOT NULL,
	[APPFHUBCAT002_NombreContacto] [varchar](50) NOT NULL,
	[APPFHUBCAT002_ApellidoPaterno] [varchar](50) NOT NULL,
	[APPFHUBCAT002_ApellidoMaterno] [varchar](50) NOT NULL,
	[APPFHUBCAT002_Genero] [char](1) NOT NULL,
	[APPFHUBCAT002_Correo] [varchar](250) NOT NULL,
	[APPFHUBCAT002_Telefono] [varchar](15) NOT NULL,
	[APPFHUBCAT002_Telefono2] [varchar](15) NULL,
	[APPADMONCAT001_IdCargo] [int] NOT NULL,
	[APPFHUBCAT002_Activo] [bit] NOT NULL,
	[APPFHUBCAT002_FechaInsert] [datetime] NOT NULL,
	[APPFHUBCAT002_UsuarioInsert] [char](6) NOT NULL,
	[APPFHUBCAT002_FechaUpdate] [datetime] NULL,
	[APPFHUBCAT002_UsuarioUpdate] [char](6) NULL,
	[APPFHUBCAT002_FechaDelete] [datetime] NULL,
	[APPFHUBCAT002_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFHUBCAT002] ADD  DEFAULT ('') FOR [APPFHUBCAT002_ApellidoPaterno]
GO
ALTER TABLE [dbo].[APPFHUBCAT002] ADD  DEFAULT ('') FOR [APPFHUBCAT002_ApellidoMaterno]
GO
ALTER TABLE [dbo].[APPFHUBCAT002] ADD  DEFAULT ((1)) FOR [APPFHUBCAT002_Activo]
GO
