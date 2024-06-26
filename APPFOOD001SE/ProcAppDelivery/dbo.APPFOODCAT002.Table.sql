USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT002](
	[APPFOODCAT002_IdCocinero] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODCAT002_Nombre] [varchar](50) NOT NULL,
	[APPFOODCAT002_ApellidoPaterno] [varchar](50) NULL,
	[APPFOODCAT002_ApellidoMaterno] [varchar](50) NULL,
	[APPFOODCAT002_Genero] [char](1) NULL,
	[APPFOODCAT002_FechaNacimiento] [datetime] NULL,
	[APPFOODCAT002_RedesSocialesConfiguradas] [bit] NOT NULL,
	[APPFOODCAT002_FoodHubConfigurado] [bit] NOT NULL,
	[APPFOODCAT002_DatosBancariosConfigurado] [bit] NOT NULL,
	[APPFOODCAT002_Activo] [bit] NOT NULL,
	[APPFOODCAT002_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT002_FechaUpdate] [datetime] NULL,
	[APPFOODCAT002_FechaDelete] [datetime] NULL
) ON [PRIMARY]
GO
