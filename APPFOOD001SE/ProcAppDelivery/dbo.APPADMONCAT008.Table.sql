USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT008]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT008](
	[APPADMONCAT008_IdRegistro] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT008_IdUso] [int] NOT NULL,
	[APPADMONCAT008_Nombre] [varchar](50) NOT NULL,
	[APPADMONCAT008_Descripcion] [varchar](100) NOT NULL,
	[APPADMONCAT008_Activo] [bit] NOT NULL,
	[APPADMONCAT008_FechaInsert] [smalldatetime] NOT NULL,
	[APPADMONCAT008_UsuarioInsert] [char](6) NOT NULL,
	[APPADMONCAT008_FechaUpdate] [smalldatetime] NULL,
	[APPADMONCAT008_UsuarioUpdate] [char](6) NULL,
	[APPADMONCAT008_FechaDelete] [smalldatetime] NULL,
	[APPADMONCAT008_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPADMONCAT008] ADD  DEFAULT ((1)) FOR [APPADMONCAT008_Activo]
GO
