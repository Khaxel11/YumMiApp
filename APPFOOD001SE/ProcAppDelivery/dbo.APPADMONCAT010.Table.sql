USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT010]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT010](
	[APPADMONCAT010_IdEmpleado] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT010_NombreUsuario] [varchar](20) NOT NULL,
	[APPADMONCAT010_Password] [varbinary](64) NOT NULL,
	[APPADMONCAT010_Correo] [varchar](250) NULL,
	[APPADMONCAT010_Foto] [image] NULL,
	[APPADMONCAT010_Activo] [bit] NOT NULL,
	[APPADMONCAT010_Admin] [bit] NULL,
	[APPADMONCAT010_FechaInsert] [datetime] NOT NULL,
	[APPADMONCAT010_UsuarioInsert] [char](6) NOT NULL,
	[APPADMONCAT010_FechaUpdate] [datetime] NULL,
	[APPADMONCAT010_UsuarioUpdate] [char](6) NULL,
	[APPADMONCAT010_FechaDelete] [datetime] NULL,
	[APPADMONCAT010_UsuarioDelete] [char](6) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPADMONCAT010] ADD  DEFAULT ((0)) FOR [APPADMONCAT010_Admin]
GO
