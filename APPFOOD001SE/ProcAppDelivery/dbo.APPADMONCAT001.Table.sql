USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPADMONCAT001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPADMONCAT001](
	[APPADMONCAT001_IdCargo] [int] IDENTITY(1,1) NOT NULL,
	[APPADMONCAT001_ClaveCargo] [varchar](3) NOT NULL,
	[APPADMONCAT001_NombreCargo] [varchar](20) NOT NULL,
	[APPADMONCAT001_Activo] [bit] NOT NULL,
	[APPADMONCAT001_FechaInsert] [smalldatetime] NOT NULL,
	[APPADMONCAT001_UsuarioInsert] [char](6) NOT NULL,
	[APPADMONCAT001_FechaUpdate] [smalldatetime] NULL,
	[APPADMONCAT001_UsuarioUpdate] [char](6) NULL,
	[APPADMONCAT001_FechaDelete] [smalldatetime] NULL,
	[APPADMONCAT001_UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[APPADMONCAT001] ADD  DEFAULT ((1)) FOR [APPADMONCAT001_Activo]
GO
