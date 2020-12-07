import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import {  TramoRequets } from 'src/app/model/tramo/tramo.requets';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
import { TramoModel } from '../model/tramo/tramo.model';

@Injectable({
  providedIn: 'root'
})
export class TramoService {

  API_URL_TRAMO =  `${environment.api}/api/tramo/`;
  
  

  constructor(private http: HttpClient) { }


  getTramos(id_via?:string):Observable<TramoRequets[]>{

    let params = new HttpParams();
    if (id_via) {
      params = params.set('id_via', id_via);
    }
    
    return this.http.get(this.API_URL_TRAMO,{params}).pipe(
      map((res: GeneralV1Request<TramoRequets[]>) =>{
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


  
  getTramo(id:number):Observable<TramoRequets>{

    
    return this.http.get(`${this.API_URL_TRAMO}${id}`  ).pipe(
      map((res: GeneralV1Request<TramoRequets>) =>{
      let response = null;
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


  

  updateTramo(id: number ,tramo: TramoModel ){
    const requestBody =tramo;
    return this.http.post( `${this.API_URL_TRAMO}update/${id}`,requestBody).pipe( map((res: GeneralV1Request<TramoModel>) => {
      let response = null;
      if (res.status_code === 200) {
        const result = res.result;
        if (result ) {
          response = result;
        }
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }),
    catchError(err => {
      console.log('err>>>',err);

      if (typeof(err) === 'string') {
        
      } else {
        
      }
      return of(null);
    }),
    );
  }

  getTramoCercano(x,y):Observable<TramoRequets[]>{
    let params = new HttpParams();
    if (x) {
      params = params.set('x', x);
    }
    if (y) {
      params = params.set('y', y);
    }


    return this.http.get(`${this.API_URL_TRAMO}get_tramo/cercano`,{params}).pipe(
      map((res: GeneralV1Request<TramoRequets[]>) =>{
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

  

/*


 getViaCercana(x,y):Observable<CicloViaRequets[]>{
    let params = new HttpParams();
    if (x) {
      params = params.set('x', x);
    }
    if (y) {
      params = params.set('y', y);
    }

    return this.http.get(this.API_URL_VIA_CERCANA,{params}).pipe(
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

*/



  /*

  deleteTramo(id: number){
    return this.http.delete( `${this.API_URL_TRAMO}${id}`).pipe( map((res: GeneralV1Request<TramoModel>) => {
      let response = null;
      if (res.status_code === 200) {
        const result = res.result;
        if (result ) {
          response = result;
        }
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }),
    catchError(err => {
   

      if (typeof(err) === 'string') {
        
      } else {
        
      }
      return of(null);
    }),
    );
  }*/

  
}
