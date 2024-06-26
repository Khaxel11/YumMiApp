USE [ProcAppDelivery]
GO
/****** Object:  Table [dbo].[APPFOODCAT003]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPFOODCAT003](
	[APPFOODCAT003_IdEstablecimiento] [int] IDENTITY(1,1) NOT NULL,
	[APPFOODCAT001_IdCuenta] [int] NOT NULL,
	[APPFOODCAT003_ClaveEstablecimiento] [varchar](6) NOT NULL,
	[APPFOODCAT003_NombreEstablecimiento] [varchar](100) NOT NULL,
	[APPFOODCAT003_TipoNegocio] [char](1) NOT NULL,
	[APPFOODCAT003_NumeroTelefonico] [varchar](16) NULL,
	[APPFOODCAT003_Calle] [varchar](50) NOT NULL,
	[APPFOODCAT003_EntreCalles] [varchar](100) NOT NULL,
	[APPFOODCAT003_Comentarios] [varchar](max) NOT NULL,
	[APPFOODCAT003_Colonia] [varchar](50) NOT NULL,
	[APPFOODCAT003_Ciudad] [varchar](50) NOT NULL,
	[APPFOODCAT003_Municipio] [varchar](50) NOT NULL,
	[APPADMONCAT005_IdEstado] [int] NOT NULL,
	[APPFOODCAT003_Pais] [char](2) NOT NULL,
	[APPFOODCAT003_CodigoPostal] [char](5) NOT NULL,
	[APPFOODCAT003_Numero] [varchar](6) NOT NULL,
	[APPFOODCAT003_ServicioDomicilio] [bit] NOT NULL,
	[APPFOODCAT003_TipoVehiculo] [tinyint] NOT NULL,
	[APPFOODCAT003_DescripcionVehiculo] [varchar](50) NOT NULL,
	[APPFOODCAT003_Calificacion] [decimal](2, 1) NULL,
	[APPFOODCAT003_Activo] [bit] NOT NULL,
	[APPFOODCAT003_FechaInsert] [datetime] NOT NULL,
	[APPFOODCAT003_FechaUpdate] [datetime] NULL,
	[APPFOODCAT003_FechaDelete] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
