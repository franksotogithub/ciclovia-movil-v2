import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import {  CicloViaRequets } from 'src/app/model/ciclo_via/ciclo_via.requets';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViaService {
  API_URL_VIA =  `${environment.api}/api/via/`;
  
  API_URL_VIA_CERCANA =  `${this.API_URL_VIA}ciclo_via_cercana`;

  constructor( private http: HttpClient) { 




  }


  
  getAllVia():Observable<CicloViaRequets[]>{


    return this.http.get(this.API_URL_VIA).pipe(
      map((res: GeneralV1Request<CicloViaRequets[]>) =>{
      let response = [];
      if (res.status_code === 200) {
        response = res.result;
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }

    ),

    catchError(err => {
      console.log('err>>>',err);
      if (typeof(err) === 'string') {
       
      } else {
     
      }
      return of(null);
    }),
    
    
    );
  }


  getViaCercana(x,y):Observable<CicloViaRequets[]>{
    let params = new HttpParams();
    if (x) {
      params = params.set('x', x);
    }
    if (y) {
      params = params.set('y', y);
    }

    return this.http.get(this.API_URL_VIA,{params}).pipe(
      map((res: GeneralV1Request<CicloViaRequets[]>) =>{
      let response = [];
      if (res.status_code === 200) {
        response = res.result;
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }

    ),

    catchError(err => {
      console.log('err>>>',err);
      if (typeof(err) === 'string') {
       
      } else {
     
      }
      return of(null);
    }),
    
    
    );
  }

  

}
