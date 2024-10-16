USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFHUBDAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFHUBDAT002](
	[APPFHUBDAT002_IdHorario] [int] IDENTITY(1,1) NOT NULL,
	[APPFHUBCAT003_IdFoodHub] [int] NOT NULL,
	[APPADMONCAT002_IdDiaSemana] [int] NOT NULL,
	[APPFHUBDAT002_HoraApertura] [time](7) NOT NULL,
	[APPFHUBDAT002_HoraCierre] [time](7) NOT NULL,
	[APPFHUBDAT002_HorarioEspecial] [bit] NULL,
	[APPFHUBDAT002_Comentarios] [varchar](max) NULL,
	[APPFHUBDAT002_Fecha] [smalldatetime] NOT NULL,
	[APPFHUBDAT002_Activo] [bit] NOT NULL,
	[APPFHUBDAT002_FechaInsert] [smalldatetime] NOT NULL,
	[APPFHUBDAT002_FechaUpdate] [smalldatetime] NULL,
	[APPFHUBDAT002_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
