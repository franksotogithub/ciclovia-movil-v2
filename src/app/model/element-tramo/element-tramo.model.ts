import { ElementTramoRequets } from './element-tramo.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';
import { TramoRequets } from '../tramo/tramo.requets';
import { TramoModel } from '../tramo/tramo.model';

export class ElementTramoModel implements  ElementTramoRequets {

  id: number;
  
  id_tramo: number;
  elemento : string;
  tipo : string;
  estado : string;
  data:  number;
  latitud: number;
  longitud: number;
  img: string;
  usuario: string;

  distrito:string;
  tramo : TramoModel;
  observacion: string;
  constructor(t?: ElementTramoRequets){
    this.id = t?.id;
    this.id_tramo = t?.id_tramo;
    this.elemento = t?.elemento;
    this.tipo= t?.tipo;
    this.estado = t?.estado;
    this.data = t?.data;
    this.latitud = t?.latitud;
    this.longitud = t?.longitud;
    this.img = t?.img;
    this.usuario = t?.usuario;
    this.tramo = t?.tramo;
    this.observacion= t?.observacion;
  }

}
  