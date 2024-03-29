USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT004]    Script Date: 13/01/2024 12:11:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT004](
	[APPFPRODCAT004_IdIngrediente] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT004_Ingrediente] [varchar](50) NOT NULL,
	[APPFPRODCAT004_Descripcion] [varchar](200) NOT NULL,
	[APPFPRODCAT004_Foto] [varchar](200) NULL,
	[APPFPRODCAT004_Activo] [bit] NOT NULL,
	[APPFPRODCAT004_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT004_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT004_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT004] ADD  DEFAULT ((1)) FOR [APPFPRODCAT004_Activo]
GO
