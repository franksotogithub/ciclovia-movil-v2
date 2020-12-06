import { TramoModel } from '../tramo/tramo.model';

export interface ElementTramoRequets {
  id: number;
  
  id_tramo: number;
  elemento : string;
  tipo : string;
  estado : string;
  valor:  number;
  latitud: number;
  longitud: number;
  img: string;
  usuario: string;
  
  tramo: TramoModel;
}
  