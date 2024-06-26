USE [ProcAppDelivery]
GO
/****** Object:  View [dbo].[VistaPedidosProgramados]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VistaPedidosProgramados] AS
SELECT 
    A.APPFPROGDAT001_IdProgramacion AS IdProgramacion,
    A.APPFPROGDAT001_Descripcion AS Descripcion,
    APPFPROGDAT001_NotificacionesActivas AS NotificacionesActivas,
    B.APPFPRODCAT005_IdProducto AS IdProducto,
    B.APPFPRODCAT005_Nombre AS NombreProducto,
    B.APPFPRODCAT005_Foto AS FotoProducto,
    B.APPFPRODCAT005_Descripcion AS DescripcionProducto,
    B.APPFPRODCAT001_IdTipo AS IdTipo,
    B.APPFPRODCAT002_IdTipoAlimentacion AS IdTipoAlimentacion,
    C.APPFHUBCAT003_IdFoodHub AS IdFoodHub,
    C.APPFHUBCAT003_ClaveFoodHub AS ClaveFoodHub,
    C.APPFHUBCAT001_IdHub AS IdHub,
    C.APPFHUBCAT002_IdContacto AS IdContacto,
    C.APPFHUBCAT003_NombreHub AS NombreFoodHub,
    C.APPFHUBCAT003_Calle AS Calle,
    C.APPFHUBCAT003_EntreCalles AS EntreCalles,
    C.APPFHUBCAT003_Colonia AS Colonia,
    C.APPFHUBCAT003_Comentarios AS ComentariosFoodHub,
    C.APPFHUBCAT003_Ciudad AS CiudadFoodHub,
    C.APPFHUBCAT003_Municipio AS Municipio,
	G.APPADMONCAT005_IdMunicipio as IdMunicipio,
    E.APPADMONCAT004_IdEstado AS IdEstado,
    E.APPADMONCAT004_Nombre AS NombreEstado,
    C.APPFHUBCAT003_Pais AS Pais,
    C.APPFHUBCAT003_CodigoPostal AS CP,
    C.APPFHUBCAT003_Numero AS NumeroFoodHub,
    C.APPFHUBCAT003_Calificacion AS Calificacion,
    D.APPFOODCAT001_IdCuenta AS IdCuenta,
	F.APPFHUBCAT001_Foto AS FotoFoodHub
FROM APPFPROGDAT001 A
JOIN APPFPRODCAT005 B 
    ON A.APPFPRODCAT005_IdProducto = B.APPFPRODCAT005_IdProducto
JOIN APPFHUBCAT003 C ON A.APPFHUBCAT003_IdFoodHub = C.APPFHUBCAT003_IdFoodHub
JOIN APPADMONCAT005 G ON C.APPFHUBCAT003_Municipio = G.APPADMONCAT005_Nombre
JOIN APPFOODCAT001 D ON D.APPFOODCAT001_IdCuenta = B.APPFOODCAT001_IdCuenta
JOIN APPADMONCAT004 E ON E.APPADMONCAT004_IdEstado = C.APPADMONCAT004_IdEstado
JOIN APPFHUBCAT001 F ON F.APPFHUBCAT001_IdHub = C.APPFHUBCAT001_IdHub 
WHERE B.APPFPRODCAT005_PreciosConfigurados = 1
    AND B.APPFPRODCAT005_Disponibilidad = 1
    AND B.APPFPRODCAT005_Activo = 1
    AND A.APPFPROGDAT001_Activo = 1
    AND APPFPROGDAT001_Reportado = 0;
GO
