USE [ProcAppDelivery]
GO
/****** Object:  View [dbo].[FechasProgramadas]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[FechasProgramadas] AS
SELECT
    F.APPFPROGDAT002_IdFechaProgramada AS IdFechaProgramada,
    F.APPFPROGDAT002_Fecha AS Fecha,
    F.APPFPROGDAT002_Cantidad AS Cantidad,
    F.APPFPROGDAT002_Interesados AS Interesados,
    F.APPFPROGDAT002_Confirmado AS Confirmado,
    F.APPFPROGDAT002_NotificacionesEnviadas AS NotificacionesEnviadas,
    F.APPFPROGDAT002_TipoProgramacion AS TipoProgramacion,
    F.APPFPROGDAT002_Activo AS Activo,
	
    CASE
        WHEN CONVERT(DATE, F.APPFPROGDAT002_Fecha) = CONVERT(DATE, DATEADD(DAY, 1, GETDATE())) THEN 'Mañana'
        WHEN CONVERT(DATE, F.APPFPROGDAT002_Fecha) = GETDATE() THEN 'Hoy'
		WHEN CONVERT(DATE, F.APPFPROGDAT002_Fecha) < GETDATE() THEN 'Anteriores'
        ELSE FORMAT(F.APPFPROGDAT002_Fecha, 'dd MMMM')
    END AS FechaProgramada,
    CASE
        WHEN F.APPFPROGDAT002_Cantidad = 0 THEN (SELECT MAX(APPFPRODCAT006_PrecioUnidad) FROM APPFPRODCAT006 WHERE APPFPRODCAT005_IdProducto = V.IdProducto)
        ELSE (
            SELECT TOP 1 APPFPRODCAT006_PrecioUnidad
            FROM APPFPRODCAT006
            WHERE APPFPRODCAT005_IdProducto = V.IdProducto
            AND APPFPRODCAT006_CantidadMinima <= F.APPFPROGDAT002_Cantidad
            AND APPFPRODCAT006_CantidadMaxima >= F.APPFPROGDAT002_Cantidad
            ORDER BY APPFPRODCAT006_CantidadMinima ASC
        )
    END AS PrecioActual,
    V.IdProgramacion,
    V.Descripcion,
    V.NotificacionesActivas,
    V.IdProducto,
    V.NombreProducto,
    V.FotoProducto,
	V.FotoFoodHub,
    V.DescripcionProducto,
    V.IdTipo,
    V.IdTipoAlimentacion,
    V.IdFoodHub,
    V.ClaveFoodHub,
    V.IdHub,
    V.IdContacto,
    V.NombreFoodHub,
    V.Calle,
    V.EntreCalles,
    V.Colonia,
    V.ComentariosFoodHub,
    V.CiudadFoodHub,
    V.Municipio,
    V.IdEstado,
    V.NombreEstado,
    V.Pais,
    V.CP,
    V.NumeroFoodHub,
    V.Calificacion,
    V.IdCuenta,
    V.IdMunicipio
   
FROM VistaPedidosProgramados V
INNER JOIN APPFPROGDAT002 F ON V.IdProgramacion = F.APPFPROGDAT001_IdProgramacion
WHERE F.APPFPROGDAT002_Activo = 1
--AND F.APPFPROGDAT002_Fecha >= DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0) -- Primer día del mes actual
--AND F.APPFPROGDAT002_Fecha < DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) + 1, 0) -- Primer día del siguiente mes
--ORDER BY F.APPFPROGDAT002_Fecha;
GO
