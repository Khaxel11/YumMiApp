USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedTableType [dbo].[APPFPROGDAT002TD001]    Script Date: 04/04/2024 03:21:14 p. m. ******/
CREATE TYPE [dbo].[APPFPROGDAT002TD001] AS TABLE(
	[IdFechaProgramada] [int] NULL,
	[IdProgramacion] [int] NULL,
	[Fecha] [datetime] NOT NULL,
	[Cantidad] [int] NULL,
	[Interesados] [int] NULL,
	[Confirmado] [bit] NULL,
	[TipoProgramacion] [char](1) NULL
)
GO
