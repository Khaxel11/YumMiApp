export class MathHelper {

    constructor() {

    }

   public roundDecimals(num: string, places: string): number {
        return +(Math.round(parseFloat(num + 'e+' + places)) + 'e-' + places);
    }

}
