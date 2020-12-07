import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import {  TramoRequets } from 'src/app/model/tramo/tramo.requets';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
import { TramoModel } from '../model/tramo/tramo.model';
import { ElementTramoRequets } from '../model/element-tramo/element-tramo.requets';

@Injectable({
  providedIn: 'root'
})
export class ElementTramoService {
  API_URL_ELEMENT_TRAMO =  `${environment.api}/api/element_tramo/`;

  constructor(private http: HttpClient) { 



  }


  getAllElementTramo(id_via?:string):Observable<ElementTramoRequets[]>{

    let params = new HttpParams();
    if (id_via) {
      params = params.set('id_via', id_via);
    }
    
    return this.http.get(this.API_URL_ELEMENT_TRAMO,{params}).pipe(
      map((res: GeneralV1Request<ElementTramoRequets[]>) =>{
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


  getElementTramo(id:number):Observable<ElementTramoRequets>{

    
    
    return this.http.get( `${this.API_URL_ELEMENT_TRAMO}${id}`).pipe(
      map((res: GeneralV1Request<ElementTramoRequets>) =>{
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

  createElementTramo(elementTramo: ElementTramoRequets ){
    const requestBody =elementTramo;
    return this.http.post(this.API_URL_ELEMENT_TRAMO,requestBody).pipe( map((res: GeneralV1Request<ElementTramoRequets>) => {
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


  updateElementTramo(id:number,elementTramo: ElementTramoRequets ){
    const requestBody =elementTramo;
    return this.http.post(`${this.API_URL_ELEMENT_TRAMO}update/${id}`,requestBody).pipe( map((res: GeneralV1Request<ElementTramoRequets>) => {
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



  
  deleteElementTramo(id:number){
    const requestBody ={};
    return this.http.post(`${this.API_URL_ELEMENT_TRAMO}delete/${id}`,requestBody).pipe( map((res: GeneralV1Request<ElementTramoRequets>) => {
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


}
