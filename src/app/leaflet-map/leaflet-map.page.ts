import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as L from 'leaflet';
import { ElementTramoService } from '../services/element-tramo.service';
import { ViaService } from '../services/ciclo-via.service';
import { ElementTramoModel } from '../model/element-tramo/element-tramo.model';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { DistritoModel } from '../model/distrito/distrito.model';
import { DistritoService } from '../services/distrito.service';
import { CicloViaModel } from '../model/ciclo_via/ciclo_via.model';
import { CicloViaRequets } from '../model/ciclo_via/ciclo_via.requets';
import { GeomModel } from '../model/geom/geom.model';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.page.html',
  styleUrls: ['./leaflet-map.page.scss'],
})
export class LeafletMapPage implements OnInit {
  map:Map;
  newMarker:any;
  address:string[];
  dataLocation:any;
  listElementTramo :  ElementTramoModel[];
  initZoom=18
  currentLocationMarker:any;
  elementTramoMarkerList:any[]=[];
  myInterval:any;
  constructor(    
    private geolocation: Geolocation,
    private elementTramoService: ElementTramoService,
    private navCtrl : NavController,
    private authService: AuthService,
    private viaService : ViaService,
    private distritoService: DistritoService,
    ) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    if(!this.map){
      this.loadMap();    
      this.addVias();
    }

    this.addPoints();

    this.myInterval=setInterval(()=>{ this.getCurrentPoint(false); }, 5000);
  }
 // The below function is added
  
 
 loadMap(){
    
  this.map = new Map("mapa").setView([17.3850,78.4867], 13);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
      .addTo(this.map); // This line is added to add the Tile Layer to our map
  
      this.getCurrentPoint(true);
     
  }
    

  getCurrentPoint(init:boolean){  

    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
  
  
    this.geolocation.getCurrentPosition(options).then((data) => {
      console.log('data>>>',data);
      
      if(data){
          
        this.dataLocation=data;     


        (init)? this.currentLocation(this.initZoom):false;
       
        (this.currentLocationMarker)?this.removeMarker(this.currentLocationMarker):true;
     
        this.currentLocationMarker = this.addMarkerCurrentLocation(data.coords.latitude,data.coords.longitude);


       }
      }).catch((error) => {
      console.log(JSON.stringify(error));
      });
        
    }

    
  currentLocation(zoom?:number){  
    const location=(zoom)? this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude), 18):this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude));

  }

  removeMarker(marker){
    this.map.removeLayer(marker)
  }

    addMarker(latitude, longitude){
     return L.marker([latitude, longitude]).addTo(this.map);
    }

    addMarkerCurrentLocation(latitude, longitude){

      return  L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5
      }).addTo(this.map);
    }


    removePoints(){
      this.elementTramoMarkerList.map(marker=>{
        this.removeMarker(marker);
      });
      this.elementTramoMarkerList =[];
    }

    addPoints(){
      this.removePoints();
      this.elementTramoService.getAllElementTramo().subscribe(res=>{
        this.listElementTramo=res.map(r=> {return new ElementTramoModel(r)});
        
        this.listElementTramo.map(p=>{
          console.log(p)
        if(p.latitud && p.longitud){          
          console.log('p.latitud , p.longitud>>',p.latitud , p.longitud);
          const marker=this.addMarker(p.latitud,p.longitud);
          
          this.elementTramoMarkerList.push(marker);
        }

  
        });
        
      });


    }

  

    addVias(){

      this.viaService.getAllVia().subscribe(res=>{
        let listVia=res.map(r=> {return new CicloViaModel(r)});
        
        listVia.map(v=>{
          
          let geom= new GeomModel(JSON.parse(v.GeoJson));
          console.log('geom.coordinates>>',geom.coordinates);
          
          let c:any[]=geom.coordinates;

          let coords=c.map(element => {
            return [element[1],element[0]]
          });

          console.log(coords);
         var polygon = L.polyline(
          coords
        ).addTo(this.map);

        
  
        });
        
      });


    }



  add(){
    /*this.elementTramoService.setPoint(this.dataLocation);*/

    this.viaService.getViaCercana(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise().then((resp:CicloViaRequets[])=>{
      if(resp.length>0){
        console.log('resp>>>',resp);
        let via = new CicloViaModel(resp[0]);
        localStorage.setItem("via",JSON.stringify(via));
        this.distritoService.getDistritoCercano(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise().
        then((resp)=>{
          if(resp.length>0){
            let distrito = new DistritoModel(resp[0]);
            localStorage.setItem("distrito",JSON.stringify(distrito));

          }         
          
          this.navCtrl.navigateForward("/element-tramo");
        });
        
       
   
      }
      
      
    });
    
  }


  ionViewDidLeave() {  
    clearInterval(this.myInterval);
    
}

logout(){
  this.authService.logout();
}

  
}
