USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT007]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT007](
	[APPADMONCAT007_IdTipoNotificacion] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT007_DescripcionNotificacion] [varchar](100) NOT NULL,
	[APPADMONCAT006_IdTipoUsuario] [int] NOT NULL,
	[APPADMONCAT007_Icono] [image] NULL,
	[APPADMONCAT007_Activo] [bit] NOT NULL,
	[APPADMONCAT007_FechaInsert] [smalldatetime] NOT NULL,
	[APPADMONCAT007_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPADMONCAT007] ADD  DEFAULT ((1)) FOR [APPADMONCAT007_Activo]
GO
