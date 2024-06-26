USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT003]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT003](
	[APPFPRODCAT003_IdCategoria] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT003_Categoria] [varchar](50) NOT NULL,
	[APPFPRODCAT003_Descripcion] [varchar](200) NOT NULL,
	[APPFPRODCAT003_Activo] [bit] NOT NULL,
	[APPFPRODCAT003_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT003_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT003_FechaDelete] [smalldatetime] NULL,
	[APPFPRODCAT003_Foto] [image] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT003] ADD  DEFAULT ((1)) FOR [APPFPRODCAT003_Activo]
GO
