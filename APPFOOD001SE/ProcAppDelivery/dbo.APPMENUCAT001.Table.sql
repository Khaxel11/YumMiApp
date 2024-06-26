USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPMENUCAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPMENUCAT001](
	[APPMENUCAT001_IdSistema] [int] IDENTITY(1,1) NOT NULL,
	[APPMENUCAT001_NomenclaturaSistema] [varchar](20) NOT NULL,
	[APPMENUCAT001_Sistema] [varchar](100) NOT NULL,
	[APPMENUCAT001_Descripcion] [varchar](120) NOT NULL,
	[APPMENUCAT001_Activo] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPMENUCAT001] ADD  DEFAULT ((1)) FOR [APPMENUCAT001_Activo]
GO
