USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFPRODCAT007TD001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
CREATE TYPE [dbo].[APPFPRODCAT007TD001] AS TABLE(
	[IdIngredienteComida] [int] NULL DEFAULT ((0)),
	[IdIngrediente] [int] NOT NULL,
	[IdProducto] [int] NOT NULL
)
GO
