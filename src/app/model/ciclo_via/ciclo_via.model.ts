import { CicloViaRequets } from './ciclo_via.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class CicloViaModel implements  CicloViaRequets {
  
  
  OBJECTID: number;
  
  Name: string;
  GeoJson : string;

  constructor(p ?: CicloViaRequets){
    this.OBJECTID = p?.OBJECTID;
    this.Name = p?.Name;
    this.GeoJson = p?.GeoJson;
  }



}
  