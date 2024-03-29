USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT004]    Script Date: 13/01/2024 12:11:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT004](
	[APPFOODCAT004_IdCuentaBancaria] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODCAT004_NombreTitular] [varchar](150) NOT NULL,
	[APPFOODCAT004_NumeroCuenta] [varchar](30) NOT NULL,
	[APPFOODCAT004_Banco] [varchar](100) NULL,
	[APPFOODCAT004_CLABE] [bit] NOT NULL,
	[APPFOODCAT008_IdMoneda] [int] NOT NULL,
	[APPFOODCAT008_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT008_FechaUpdate] [datetime] NULL,
	[APPFOODCAT008_FechaDelete] [datetime] NULL
) ON [PRIMARY]
GO
