USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFPRODCAT009TD001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
CREATE TYPE [dbo].[APPFPRODCAT009TD001] AS TABLE(
	[IdCategoriaProducto] [int] NULL DEFAULT ((0)),
	[IdProducto] [int] NOT NULL,
	[IdCategoria] [int] NOT NULL
)
GO
