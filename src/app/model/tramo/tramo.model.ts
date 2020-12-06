import { TramoRequets } from './tramo.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class TramoModel implements  TramoRequets {

  id: number;  
  nombre_via_y_km: string;
  distancia : number;
  desde:string;
  hasta:string;
  id_via: number;

  sentido: string;
  tipo: string;
  ancho: number;
  usuario: string;
  seccion_vial_normativa: string;
  seccion_vial_actual : string;

  distrito:string;
  constructor(t?: TramoRequets){
    this.id = t?.id;
    this.nombre_via_y_km = t?.nombre_via_y_km;
    this.distancia = t?.distancia;
    this.desde= t?.desde;
    this.hasta = t?.hasta;
    this.id_via = t?.id_via;
    this.sentido = t?.sentido;
    this.tipo = t?.tipo;
    this.usuario = t?.usuario;
    this.seccion_vial_actual = t?.seccion_vial_actual;
    this.seccion_vial_normativa = t?.seccion_vial_normativa;
    this.distrito = t?.distrito;

  }


}
  