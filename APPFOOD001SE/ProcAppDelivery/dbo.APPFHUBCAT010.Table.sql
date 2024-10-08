USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBCAT010]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBCAT010](
	[APPFHUBCAT010_IdCalificacion] [int] IDENTITY(1,1) NOT NULL,
	[APPFHUBCAT003_IdFoodHub] [int] NOT NULL,
	[APPUSERCAT001_IdCuenta] [int] NOT NULL,
	[APPFHUBCAT010_Calificacion] [int] NOT NULL,
	[APPFHUBCAT010_Comentarios] [varchar](max) NULL,
	[APPFHUBCAT010_Votos] [int] NOT NULL,
	[APPFHUBCAT010_Fecha] [smalldatetime] NOT NULL,
	[APPFHUBCAT010_FechaInsert] [smalldatetime] NOT NULL,
	[APPFHUBCAT010_Activo] [bit] NOT NULL,
	[APPFHUBCAT010_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
