USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT002]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT002](
	[APPFPRODCAT002_IdTipoAlimentacion] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT002_TipoAlimentacion] [varchar](50) NOT NULL,
	[APPFPRODCAT002_Descripcion] [varchar](200) NOT NULL,
	[APPFPRODCAT002_Activo] [bit] NOT NULL,
	[APPFPRODCAT002_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT002_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT002_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT002] ADD  DEFAULT ((1)) FOR [APPFPRODCAT002_Activo]
GO
