USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT008]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT008](
	[APPFOODCAT008_IdMoneda] [int] NOT NULL,
	[APPFOODCAT008_NombreMoneda] [varchar](50) NOT NULL,
	[APPFOODCAT008_NombreCorto] [char](3) NOT NULL,
	[APPFOODCAT008_Activo] [bit] NOT NULL,
	[APPFOODCAT008_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT008_FechaUpdate] [datetime] NULL,
	[APPFOODCAT008_FechaDelete] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFOODCAT008] ADD  DEFAULT ((1)) FOR [APPFOODCAT008_Activo]
GO
