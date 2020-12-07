export interface TramoRequets {
  id: number;
  nombre_via: string;
  nombre: string;
  distancia : number;
  desde:string;
  hasta:string;
  id_via: number;
  sentido: string;
  tipo: string;
  ancho: number;
  distrito:string;

  usuario: string;
  seccion_vial_normativa: string;
  seccion_vial_actual : string;

  geo_json: any,
  observacion: string,

  }
  