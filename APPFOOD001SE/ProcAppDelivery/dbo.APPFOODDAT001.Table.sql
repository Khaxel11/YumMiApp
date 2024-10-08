USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODDAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODDAT001](
	[APPFOODDAT001_IdNotificacion] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT007_IdTipoNotificacion] [int] NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODDAT001_Titulo] [varchar](50) NOT NULL,
	[APPFOODDAT001_Mensaje] [varchar](max) NOT NULL,
	[APPFOODDAT001_Fecha] [datetime] NOT NULL,
	[APPFOODDAT001_Leida] [bit] NOT NULL,
	[APPFOODDAT001_FechaLeida] [datetime] NULL,
	[APPFOODDAT001_Activa] [bit] NOT NULL,
	[APPRWARDCAT002_IdRecomensaRelacionada] [int] NULL,
	[APPFOODDAT001_FechaInsert] [datetime] NOT NULL,
	[APPFOODDAT001_UsuarioInsert] [varchar](6) NOT NULL,
	[APPFOODDAT001_FechaDelete] [datetime] NULL,
	[APPFOODDAT001_UsuarioDelete] [varchar](6) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPFOODDAT001] ADD  DEFAULT ((0)) FOR [APPFOODDAT001_Leida]
GO
ALTER TABLE [dbo].[APPFOODDAT001] ADD  DEFAULT ((1)) FOR [APPFOODDAT001_Activa]
GO
