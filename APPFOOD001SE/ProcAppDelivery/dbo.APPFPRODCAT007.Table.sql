USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT007]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT007](
	[APPFPRODCAT007_IdIngredienteComida] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT004_IdIngrediente] [int] NOT NULL,
	[APPFPRODCAT005_IdProducto] [int] NOT NULL,
	[APPFPRODCAT007_Activo] [bit] NOT NULL,
	[APPFPRODCAT007_FechaInsert] [smalldatetime] NULL,
	[APPFPRODCAT007_UsuarioInsert] [char](6) NOT NULL,
	[APPFPRODCAT007_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT007_UsuarioUpdate] [char](6) NULL,
	[APPFPRODCAT007_FechaDelete] [smalldatetime] NULL,
	[APPFPRODCAT007_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT007] ADD  DEFAULT ((1)) FOR [APPFPRODCAT007_Activo]
GO
