USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT004]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT004](
	[APPFOODCAT004_IdCuentaBancaria] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODCAT004_NombreTitular] [varchar](150) NOT NULL,
	[APPFOODCAT004_NumeroCuenta] [varchar](30) NOT NULL,
	[APPADMONCAT009_IdBanco] [varchar](100) NULL,
	[APPFOODCAT004_ProveedorTarjeta] [varchar](10) NOT NULL,
	[APPFOODCAT004_IdImagen] [int] NOT NULL,
	[APPFOODCAT004_CLABE] [varchar](50) NULL,
	[APPFOODCAT008_IdMoneda] [int] NOT NULL,
	[APPFOODCAT004_Activo] [bit] NOT NULL,
	[APPFOODCAT004_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT004_FechaUpdate] [datetime] NULL,
	[APPFOODCAT004_FechaDelete] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFOODCAT004] ADD  DEFAULT ((1)) FOR [APPFOODCAT004_Activo]
GO
