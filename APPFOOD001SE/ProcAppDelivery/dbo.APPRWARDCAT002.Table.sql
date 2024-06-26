USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPRWARDCAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPRWARDCAT002](
	[APPRWARDCAT002_IdRecomensa] [int] IDENTITY(1,1) NOT NULL,
	[APPRWARDCAT001_IdCategoriaRecomensa] [int] NOT NULL,
	[APPRWARDCAT002_NombreRecomensa] [varchar](100) NOT NULL,
	[APPRWARDCAT002_Descripcion] [varchar](max) NOT NULL,
	[APPRWARDCAT002_PuntosRequeridos] [int] NOT NULL,
	[APPRWARDCAT002_DisponibleDesde] [smalldatetime] NOT NULL,
	[APPRWARDCAT002_DisponibleHasta] [smalldatetime] NOT NULL,
	[APPRWARDCAT002_Activa] [bit] NOT NULL,
	[APPRWARDCAT002_FechaInsert] [smalldatetime] NOT NULL,
	[APPRWARDCAT002_UsuarioInsert] [varchar](6) NOT NULL,
	[APPRWARDCAT002_FechaUpdate] [smalldatetime] NULL,
	[APPRWARDCAT002_UsuarioUpdate] [varchar](6) NULL,
	[APPRWARDCAT002_FechaDelete] [smalldatetime] NULL,
	[APPRWARDCAT002_UsuarioDelete] [varchar](6) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPRWARDCAT002] ADD  DEFAULT ((1)) FOR [APPRWARDCAT002_Activa]
GO
