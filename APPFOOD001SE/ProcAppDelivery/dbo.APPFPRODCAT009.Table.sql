USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT009]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT009](
	[APPFPRODCAT009_IdCategoriaProducto] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT005_IdProducto] [int] NOT NULL,
	[APPFPRODCAT003_IdCategoria] [int] NOT NULL,
	[APPFPRODCAT009_Activo] [bit] NOT NULL,
	[APPFPRODCAT009_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT009_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT009_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT009] ADD  DEFAULT ((1)) FOR [APPFPRODCAT009_Activo]
GO
