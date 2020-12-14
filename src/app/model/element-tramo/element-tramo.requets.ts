import { TramoModel } from '../tramo/tramo.model';

export interface ElementTramoRequets {
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
  observacion: string;
  tramo: TramoModel;
}
  