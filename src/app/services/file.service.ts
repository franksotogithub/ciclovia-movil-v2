import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';

import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
 
  
  API_URL_FILE_UPLOAD =  `${environment.api}/api/file/upload`;

  constructor( private http: HttpClient) { 




  }


/*

  uploadFile(photo:File){
    const fd = new FormData();
    fd.append('file',photo);
    return this.http.post(this.API_URL_FILE_UPLOAD,fd);
    
  }
*/
  
  uploadFile(formData){
   
    return this.http.post(this.API_URL_FILE_UPLOAD,formData);
    
  }



}
