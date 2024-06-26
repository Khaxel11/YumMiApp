USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPRODCAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPRODCAT001](
	[APPFPRODCAT001_IdTipo] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT001_NombreTipo] [varchar](50) NOT NULL,
	[APPFPRODCAT001_Descripcion] [varchar](100) NOT NULL,
	[APPFPRODCAT001_Foto] [image] NULL,
	[APPFPRODCAT001_Activo] [bit] NOT NULL,
	[APPFPRODCAT001_FechaInsert] [smalldatetime] NOT NULL,
	[APPFPRODCAT001_FechaUpdate] [smalldatetime] NULL,
	[APPFPRODCAT001_FechaDelete] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
