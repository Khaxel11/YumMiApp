USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT006]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT006](
	[APPFPRODCAT006_IdPrecios] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT005_IdProducto] [int] NOT NULL,
	[APPFPRODCAT006_PrecioUnidad] [decimal](18, 0) NOT NULL,
	[APPFPRODCAT006_CantidadMinima] [int] NOT NULL,
	[APPFPRODCAT006_CantidadMaxima] [int] NOT NULL,
	[APPFPRODCAT006_Activo] [bit] NOT NULL,
	[APPFPRODCAT006_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT006_UsuarioInsert] [char](6) NOT NULL,
	[APPFPRODCAT006_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT006_UsuarioUpdate] [char](6) NULL,
	[APPFPRODCAT006_FechaDelete] [smalldatetime] NULL,
	[APPFPRODCAT006_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT006] ADD  DEFAULT ((1)) FOR [APPFPRODCAT006_Activo]
GO
