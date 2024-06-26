USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT009]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT009](
	[APPADMONCAT009_IdBanco] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT009_NombreBanco] [varchar](100) NOT NULL,
	[APPADMONCAT009_Acronimo] [varchar](10) NOT NULL,
	[APPADMONCAT009_Ciudad] [varchar](50) NULL,
	[APPADMONCAT009_RFC] [varchar](20) NULL,
	[APPADMONCAT009_Activo] [bit] NOT NULL,
	[APPADMONCAT009_FechaInsert] [smalldatetime] NOT NULL,
	[APPADMONCAT009_FechaUpdate] [smalldatetime] NULL,
	[APPADMONCAT009_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPADMONCAT009] ADD  DEFAULT ((1)) FOR [APPADMONCAT009_Activo]
GO
