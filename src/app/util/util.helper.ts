import { Observable } from 'rxjs';
import {LatLong} from '../model/generic/lat-long';

export class UtilHelper {
  public static timezone = 'America/Lima';


  public static formatPrecio(precio:any,convert_decimal=0,fixed=2):string{
    let num = parseFloat(precio);
    num = num / Math.pow(10,convert_decimal);
    let n = num.toFixed(fixed);

    return String(n);
  }

  /*
  public static getCurrentLocation() :LatLong{
    let latLong = new LatLong();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position>>',position);
        latLong.latitud = `${position.coords.latitude}`;
       latLong.longitud = `${position.coords.longitude}`;  
       return latLong;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      return latLong;
    }
   
    
  }*/

  public static  getPosition(): Promise<LatLong>  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => { 
        let p = new LatLong(); 
        p.latitud = position.coords.latitude;
        p.longitud = position.coords.longitude;

        resolve(p);
      }, (err) => {
        reject(err);
      });
    });
  }

  public static zeroPad = (num, places) => String(num).padStart(places, '0')



 
}