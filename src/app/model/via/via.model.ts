import { ViaRequets } from './via.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class CicloViaModel implements  ViaRequets {
  
  
  OBJECTID: number;
  dep: string;
  prov:string;
  dist:string;
  nombre: string;
  nombre_alterno: string;
  categoria:string;
 

  constructor(p ?: ViaRequets){
    this.OBJECTID = p?.OBJECTID;
    this.dep = p?.dep;
    this.prov = p?.prov;
    this.dist = p?.dist;
    this.nombre = p?.nombre;
    this.nombre_alterno = p?.nombre_alterno;
    this.categoria = p?.categoria;
    
  }



}
  