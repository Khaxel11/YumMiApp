USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT005]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT005](
	[APPADMONCAT005_IdMunicipio] [int] NOT NULL,
	[APPADMONCAT004_IdEstado] [int] NOT NULL,
	[APPADMONCAT005_ClaveLocalidad] [varchar](4) NOT NULL,
	[APPADMONCAT005_Nombre] [varchar](200) NOT NULL,
	[APPADMONCAT005_Longitud] [decimal](10, 7) NULL,
	[APPADMONCAT005_Latitud] [decimal](10, 7) NULL,
	[APPADMONCAT005_Activo] [tinyint] NOT NULL
) ON [PRIMARY]
GO
