USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT001]    Script Date: 13/01/2024 12:11:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT001](
	[APPFPRODCAT001_IdTipo] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT001_NombreTipo] [varchar](50) NOT NULL,
	[APPFPRODCAT001_Descripcion] [varchar](100) NOT NULL,
	[APPFPRODCAT001_Activo] [bit] NOT NULL,
	[APPFPRODCAT001_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT001_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT001_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPRODCAT001] ADD  DEFAULT ((1)) FOR [APPFPRODCAT001_Activo]
GO
