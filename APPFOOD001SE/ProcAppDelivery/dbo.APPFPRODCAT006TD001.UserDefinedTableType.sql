USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFPRODCAT006TD001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
CREATE TYPE [dbo].[APPFPRODCAT006TD001] AS TABLE(
	[IdPrecio] [int] NULL,
	[PrecioUnidad] [decimal](10, 4) NOT NULL,
	[CantidadMinima] [decimal](10, 4) NOT NULL,
	[CantidadMaxima] [decimal](10, 4) NOT NULL
)
GO
