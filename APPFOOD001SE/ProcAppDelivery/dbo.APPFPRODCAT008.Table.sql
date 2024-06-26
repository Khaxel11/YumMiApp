USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT008]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT008](
	[APPFPRODCAT008_IdRestriccionIngrediente] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT002_IdTipoAlimentacion] [int] NOT NULL,
	[APPFPRODCAT004_IdIngrediente] [int] NOT NULL,
	[APPFPRODCAT008_Activo] [bit] NOT NULL,
	[APPFPRODCAT008_UsuarioInsert] [char](6) NOT NULL,
	[APPFPRODCAT008_FechaInsert] [smalldatetime] NULL,
	[APPFPRODCAT008_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT008_UsuarioUpdate] [char](6) NULL,
	[APPFPRODCAT008_FechaDelete] [smalldatetime] NULL,
	[APPFPRODCAT008_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT008] ADD  DEFAULT ((1)) FOR [APPFPRODCAT008_Activo]
GO
