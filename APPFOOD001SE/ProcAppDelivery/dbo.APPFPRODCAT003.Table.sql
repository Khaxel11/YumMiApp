USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT003]    Script Date: 13/01/2024 12:11:37 p. m. ******/
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
	[APPFPRODCAT003_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT003] ADD  DEFAULT ((1)) FOR [APPFPRODCAT003_Activo]
GO
