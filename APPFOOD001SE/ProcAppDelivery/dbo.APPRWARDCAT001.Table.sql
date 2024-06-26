USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPRWARDCAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPRWARDCAT001](
	[APPRWARDCAT001_IdCategoriaRecomensa] [int] IDENTITY(1,1) NOT NULL,
	[APPRWARDCAT001_NombreRecompensa] [varchar](100) NOT NULL,
	[APPRWARDCAT001_NivelRecomensa] [int] NOT NULL,
	[APPRWARDCAT001_Descripcion] [varchar](max) NOT NULL,
	[APPRWARDCAT001_FechaInsert] [smalldatetime] NOT NULL,
	[APPRWARDCAT001_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
