USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBDAT001]    Script Date: 13/01/2024 12:11:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBDAT001](
	[APPFHUBDAT001_IdAsignado] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFHUBCAT003_IdFoodHub] [int] NOT NULL,
	[APPFHUBDAT001_Predeterminado] [bit] NOT NULL,
	[APPFHUBDAT001_Asignado] [bit] NOT NULL,
	[APPFHUBDAT001_Activo] [bit] NOT NULL,
	[APPFHUBDAT001_FechaInsert] [datetime] NOT NULL,
	[APPFHUBDAT001_FechaUpdate] [datetime] NULL,
	[APPFHUBDAT001_FechaDelete] [datetime] NULL
) ON [PRIMARY]
GO
