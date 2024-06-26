USE [ProcAppDelivery]
GO
/****** Object:  StoredProcedure [dbo].[APPFPROD001APSPA2]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	FECHA CREACION:		23/Enero/2024
	CREADO POR:			Axel Aguilar A.
	DESCRIPCION:		Acciones para la captura de un nuevo producto(
							)
	=================================================================================
*/
CREATE PROCEDURE [dbo].[APPFPROD001APSPA2]
	@Opcion INT,
	@IdCuenta INT = NULL
	,@Nombre		VARCHAR(100) = NULL 
	,@Foto			VARCHAR(MAX) = NULL 
	,@Descripcion	VARCHAR(200) = NULL 
	,@IdTipo		INT = NULL 
	,@IdTipoAlimentacion	INT = NULL 
	,@Usuario		CHAR(6) = NULL
	,@Ingredientes as APPFPRODCAT007TD001 READONLY
	,@Categorias as APPFPRODCAT009TD001 READONLY
	,@Precios as APPFPRODCAT006TD001 READONLY
	,@IdProducto INT = NULL
AS 
BEGIN
	DECLARE @RowCount INT,
	@Mensaje AS VARCHAR(100) = '',
	@Correcto BIT
	--Inserta los datos del producto
	
	IF @Opcion = 1
	BEGIN

		DECLARE @Id INT
		INSERT INTO APPFPRODCAT005
		(
			APPFOODCAT001_IdCuenta,			APPFPRODCAT005_Nombre,				APPFPRODCAT005_Foto,
			APPFPRODCAT005_Descripcion,			APPFPRODCAT001_IdTipo,				APPFPRODCAT002_IdTipoAlimentacion,
			APPFPRODCAT005_Disponibilidad,		APPFPRODCAT005_PreciosConfigurados, APPFPRODCAT005_Promocion,
			APPFPRODCAT005_EtiquetaEspecial,	APPFPRODCAT005_Etiqueta,			APPFPRODCAT005_Activo,
			APPFPRODCAT005_FechaInsert,			APPFPRODCAT005_UsuarioInsert
		)
		VALUES(
			@IdCuenta,						@Nombre,							@Foto,
			@Descripcion,					@IdTipo,							@IdTipoAlimentacion,
			1,								0,									0,
			0,								'',								0,
			GETDATE(),						FORMAT(@IdCuenta, '000000')
		)
		SET @Id = @@IDENTITY
		
		SELECT 'OK' as Message, 1 as Correct, @Id as Value

	END
	
	--Inserta Ingredientes y Categorias
	IF @Opcion = 2
	BEGIN
		DECLARE @TotalCategorias INT
		
		SELECT @TotalCategorias = COUNT(*) FROM APPFPRODCAT009 WHERE APPFPRODCAT005_IdProducto = @IdProducto
		IF @TotalCategorias > 5
		BEGIN
			 SET @Mensaje = 'El producto tiene más de 5 categorias, para agregar otra debe eliminar alguna.'
		END
		ELSE
		BEGIN
			  MERGE APPFPRODCAT009 AS destino -- <--- tabla principal a afectar
					USING @Categorias AS origen --<-- tabla temporal
					ON (destino.APPFPRODCAT009_IdCategoriaProducto = origen.IdCategoriaProducto) --- relacion que tiene que cumplir

				   /* WHEN MATCHED AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN --- si encuentra relacion entonces significa que existe en ambos lados (actualizar)
						UPDATE
						SET 
							APPFPRODCAT007_FechaUpdate = GETDATE(),
							APPFPRODCAT007_UsuarioUpdate = @Usuario*/

					WHEN NOT MATCHED BY TARGET AND (origen.IdCategoriaProducto = 0 ) THEN --- si no existe relacion entonces signfiica que es nuevo
						INSERT (APPFPRODCAT003_IdCategoria, APPFPRODCAT005_IdProducto, APPFPRODCAT009_Activo, APPFPRODCAT009_FechaInsert)
						VALUES (origen.IdCategoria, origen.IdProducto, 1, GETDATE())
    
					WHEN NOT MATCHED BY SOURCE AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN ---< si existe actualmente, pero se elimina de la lista pasa a estatus 0
					UPDATE SET 
					APPFPRODCAT009_Activo = 0, APPFPRODCAT009_FechaDelete = GETDATE();

					SET @RowCount = @@ROWCOUNT
					IF @RowCount > 0
					BEGIN
						SET @Mensaje = 'OK'
						SET @Correcto = 1
					END
					ELSE
					BEGIN
						SET @Mensaje = 'No se ha afectado ningun registro de las categorías'
						SET @Correcto = 0
					END
					SELECT @Mensaje as Message, @Correcto as Correct, @RowCount as Value
		END


	END
	
	--Guardar los Ingredientes de una comida
	IF @Opcion = 3
	BEGIN
			MERGE APPFPRODCAT007 AS destino -- <--- tabla principal a afectar
					USING @Ingredientes AS origen --<-- tabla temporal
					ON (destino.APPFPRODCAT007_IdIngredienteComida = origen.IdIngredienteComida) --- relacion que tiene que cumplir

				   /* WHEN MATCHED AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN --- si encuentra relacion entonces significa que existe en ambos lados (actualizar)
						UPDATE
						SET 
							APPFPRODCAT007_FechaUpdate = GETDATE(),
							APPFPRODCAT007_UsuarioUpdate = @Usuario*/

					WHEN NOT MATCHED BY TARGET AND (origen.IdIngredienteComida = 0 ) THEN --- si no existe relacion entonces signfiica que es nuevo
						INSERT (APPFPRODCAT004_IdIngrediente, APPFPRODCAT005_IdProducto, APPFPRODCAT007_Activo, APPFPRODCAT007_UsuarioInsert, APPFPRODCAT007_FechaInsert)
						VALUES (origen.IdIngrediente, origen.IdProducto, 1, FORMAT(@IdCuenta, '000000'), GETDATE())
    
					WHEN NOT MATCHED BY SOURCE AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN ---< si existe actualmente, pero se elimina de la lista pasa a estatus 0
					UPDATE SET 
					APPFPRODCAT007_Activo = 0, APPFPRODCAT007_UsuarioDelete = FORMAT(@IdCuenta, '000000'), APPFPRODCAT007_FechaDelete = GETDATE();

					SET @RowCount = @@ROWCOUNT
					IF @RowCount > 0
					BEGIN
						SET @Mensaje = 'OK'
						SET @Correcto = 1
					END
					ELSE
					BEGIN
						SET @Mensaje = 'No se ha afectado ningun registro de los Ingredientes'
						SET @Correcto = 0
					END
					SELECT @Mensaje as Message, @Correcto as Correct, @RowCount as Value
	END

	--Guardar los precios de los productos
	IF @Opcion = 4
	BEGIN
			MERGE APPFPRODCAT006 AS destino -- <--- tabla principal a afectar
					USING @Precios AS origen --<-- tabla temporal
					ON (destino.APPFPRODCAT006_IdPrecios = origen.IdPrecio) --- relacion que tiene que cumplir

				    WHEN MATCHED AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN --- si encuentra relacion entonces significa que existe en ambos lados (actualizar)
						UPDATE
						SET 
							APPFPRODCAT006_PrecioUnidad = origen.PrecioUnidad, 
							APPFPRODCAT006_CantidadMinima = origen.CantidadMinima, 
							APPFPRODCAT006_CantidadMaxima = origen.CantidadMaxima,
							APPFPRODCAT006_FechaUpdate = GETDATE(),
							APPFPRODCAT006_UsuarioUpdate = FORMAT(@IdCuenta, '000000')

					WHEN NOT MATCHED BY TARGET AND (origen.IdPrecio = 0 ) THEN --- si no existe relacion entonces signfiica que es nuevo
						INSERT (
							APPFPRODCAT006_PrecioUnidad, 
							APPFPRODCAT006_CantidadMinima, 
							APPFPRODCAT006_CantidadMaxima,
							APPFPRODCAT005_IdProducto, 
							APPFPRODCAT006_Activo, 
							APPFPRODCAT006_UsuarioInsert, 
							APPFPRODCAT006_FechaInsert)
						VALUES (
							origen.PrecioUnidad, 
							origen.CantidadMinima, 
							origen.CantidadMaxima, 
							@IdProducto, 1, 
							FORMAT(@IdCuenta, '000000'), GETDATE())
    
					WHEN NOT MATCHED BY SOURCE AND destino.APPFPRODCAT005_IdProducto = @IdProducto THEN ---< si existe actualmente, pero se elimina de la lista pasa a estatus 0
					UPDATE SET 
						APPFPRODCAT006_Activo = 0, 
						APPFPRODCAT006_UsuarioDelete = FORMAT(@IdCuenta, '000000'), 
						APPFPRODCAT006_FechaDelete = GETDATE();

					SET @RowCount = @@ROWCOUNT
					IF @RowCount > 0
					BEGIN
						--Si existen registros guarda el precio configurado
						UPDATE APPFPRODCAT005
						SET APPFPRODCAT005_PreciosConfigurados = 1
						WHERE APPFPRODCAT005_IdProducto = @IdProducto

						SET @Mensaje = 'OK'
						SET @Correcto = 1
					END
					ELSE
					BEGIN
						SET @Mensaje = 'No se ha afectado ningun registro de los precios'
						SET @Correcto = 0
					END
					SELECT @Mensaje as Message, @Correcto as Correct, @RowCount as Value
	END
	


END
GO
