export class LatLong{
    latitud: number;
    longitud : number;
    constructor(latitud?:number,longitud?:number){
      this.latitud = latitud?latitud:null;
      this.longitud = longitud?longitud:null;
    }
  }