/* 
Clases o Modelos para Captura de 
Restricciones de ingredientes de en tipos dalimentacion 
*/
export class clsRestricciones{
    cantidadRestriciones:number = 0;
    idRestriccionIngrediente:number = 0;
    idTipoAlimentacion:number = 0;
    idIngrediente:number = 0;
    tipoAlimentacion:string = '';
    ingrediente :string='';
    descripcion :string='';

}

export class clsTiposAlimentacion{
    idTipoAlimentacion:number = 0;
    tipoAlimentacion:string = '';
    descripcion:string = '';
    cantidadRestriciones:number = 0;
}

export class clsIngredient{
    idIngrediente :number=0;
    ingrediente :string='';
    descripcion :string='';
}
