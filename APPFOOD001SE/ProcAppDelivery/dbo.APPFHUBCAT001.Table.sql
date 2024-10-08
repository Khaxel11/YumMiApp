USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBCAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBCAT001](
	[APPFHUBCAT001_IdHub] [int] IDENTITY(1,1) NOT NULL,
	[APPFHUBCAT001_NombreUsuario] [varchar](20) NOT NULL,
	[APPFHUBCAT001_Password] [varbinary](64) NOT NULL,
	[APPFHUBCAT001_Foto] [image] NULL,
	[APPFHUBCAT001_Activo] [bit] NOT NULL,
	[APPFHUBCAT001_FechaInsert] [datetime] NOT NULL,
	[APPFHUBCAT001_UsuarioInsert] [char](6) NOT NULL,
	[APPFHUBCAT001_FechaUpdate] [datetime] NULL,
	[APPFHUBCAT001_UsuarioUpdate] [char](6) NULL,
	[APPFHUBCAT001_FechaDelete] [datetime] NULL,
	[APPFHUBCAT001_UsuarioDelete] [char](6) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
