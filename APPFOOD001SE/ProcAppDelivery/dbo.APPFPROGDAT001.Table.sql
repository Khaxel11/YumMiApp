USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFPROGDAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFPROGDAT001](
	[APPFPROGDAT001_IdProgramacion] [int] IDENTITY(1,1) NOT NULL,
	[APPFPRODCAT005_IdProducto] [int] NOT NULL,
	[APPFHUBCAT003_IdFoodHub] [int] NOT NULL,
	[APPFPROGDAT001_Descripcion] [varchar](300) NULL,
	[APPFPROGDAT001_NotificacionesActivas] [bit] NOT NULL,
	[APPFPROGDAT001_Activo] [bit] NOT NULL,
	[APPFPROGDAT001_FechaInsert] [datetime] NOT NULL,
	[APPFPROGDAT001_UsuarioInsert] [char](6) NOT NULL,
	[APPFPROGDAT001_FechaUpdate] [datetime] NULL,
	[APPFPROGDAT001_UsuarioUpdate] [char](6) NULL,
	[APPFPROGDAT001_FechaDelete] [datetime] NULL,
	[APPFPROGDAT001_UsuarioDelete] [char](6) NULL,
	[APPFPROGDAT001_MotivoEliminado] [varchar](6) NULL,
	[APPFPROGDAT001_Reportado] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFPROGDAT001] ADD  DEFAULT ('') FOR [APPFPROGDAT001_MotivoEliminado]
GO
ALTER TABLE [dbo].[APPFPROGDAT001] ADD  DEFAULT ((0)) FOR [APPFPROGDAT001_Reportado]
GO
