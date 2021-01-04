import { element } from 'protractor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { TramoService } from '../services/tramo.service';
import { TramoModel } from '../model/tramo/tramo.model';
import { Router } from '@angular/router';
import { reduce } from 'rxjs/operators';
import * as v from 'leaflet.vectorgrid';
import * as esri from 'esri-leaflet';
import {environment} from 'src/environments/environment';
import { UsuarioModel } from '../model/usuario/usuario.model';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.page.html',
  styleUrls: ['./leaflet-map.page.scss'],
})
export class LeafletMapPage implements OnInit {
  
  @ViewChild("popup", { static: true }) private popupEl: ElementRef;
  map:Map;
  newMarker:any;
  address:string[];
  dataLocation:any;
  listElementTramo :  ElementTramoModel[];
  initZoom=18
  currentLocationMarker:any;
  elementTramoMarkerList:any[]=[];
  myInterval:any;
  myInterval2:any;
  eventHandlerAssigned=false;
  API_URL_PHOTO= environment.api_photo;
  idElement:any;
  tramo: TramoModel;
  elementTramo : ElementTramoModel;
  user : UsuarioModel;
  
  markerPoint:any;
  tramoSelect:any;
  lineSelect:any;


  constructor(    
    private geolocation: Geolocation,
    private elementTramoService: ElementTramoService,
    private navCtrl : NavController,
    private authService: AuthService,
    /*private viaService : ViaService,*/
    private distritoService: DistritoService,
    private tramoService : TramoService,
    private router: Router,

    ) { }

  ngOnInit() {
    this.user=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null;
    
    /*JSON.localStorage.getItem('currentUser');

    localStorage.setItem("currentUser",JSON.stringify( result.user));*/
    /*this.user = UsuarioModel */
  }


  ionViewDidEnter(){
    if(!this.map){
      this.loadMap();    
      this.addVias();
      this.addPoints();
    }

   

    if(this.user.id_rol==1){
      this.myInterval=setInterval(()=>{ this.getCurrentPoint(false); }, 5000);

    }
    
    
    if(this.user.id_rol>1){
      this.myInterval2=setInterval(()=>{ this.addPoints(); }, 60000);
      /*this.addPoints();*/
    }
  }
 // The below function is added
  
 
 loadMap(){
   
  this.map = new Map("mapa").setView([17.3850,78.4867], 13);


 tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
 { 
   maxZoom: 21,
   maxNativeZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3'],
   
  })
 .addTo(this.map); 

 
 /*if(this.user.id_rol==1){
  this.getCurrentPoint(true);
 }
*/
this.getCurrentPoint(true);

/*
esri.dynamicMapLayer({
  url:'https://siu.imp.gob.pe/arcgis/rest/services/DATA/Manzanas/MapServer',
  opacity: 0.7
}).addTo(this.map);
*/

}
    



  getCurrentPoint(init:boolean){  

    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
    
  
    this.geolocation.getCurrentPosition(options).then((data) => {
      console.log('data>>>',data);
      
      if(data){
          
        this.dataLocation=data;
        (init)? this.currentLocation(this.initZoom):false;
       
        (this.currentLocationMarker)?this.removeFeature(this.currentLocationMarker):true;
     
        this.currentLocationMarker = this.addMarkerCurrentLocation(data.coords.latitude,data.coords.longitude);


       }
      }).catch((error) => {
      console.log(JSON.stringify(error));
      });

    }


    
  currentLocation(zoom?:number){  
    const location=(zoom)? this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude),20):this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude));
  }

  removeFeature(marker){
    this.map.removeLayer(marker)
  }


  

    addMarker(latitude, longitude){
      var marker_icon = L.icon({
        iconUrl: 'assets/img/red-dot.png',
        iconSize:     [24,24],
      
      });
     return L.marker([latitude, longitude], {icon: marker_icon,opacity:0.8}).addTo(this.map);
    }


    addMarkerSelect(latitude, longitude){
      (this.markerPoint)?this.removeFeature(this.markerPoint):true;
      var marker_icon = L.icon({
        iconUrl: 'assets/img/blue-dot.png',
        iconSize:     [30,30],
      
      });

      this.markerPoint=L.marker([latitude, longitude], {icon: marker_icon}).addTo(this.map);
    }





    addMarkerCurrentLocation(latitude, longitude){
      
      
      var current_location = L.icon({
        iconUrl: 'assets/img/current_location.png',
        iconSize:     [30,30],
      
      });
       

      return L.marker([latitude, longitude], {icon: current_location}).addTo(this.map);

    }


    removePoints(){
      this.elementTramoMarkerList.map(marker=>{
        this.removeFeature(marker);
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
          
          marker.on('click', (e)=> {
            this.cerrarPopup();
            this.elementTramo=p;
            this.addMarkerSelect(p.latitud,p.longitud);

          });
          
          this.elementTramoMarkerList.push(marker);
        }

        });


      });


    }

    

    addVias(){


      this.tramoService.getTramos().subscribe(res=>{
        let listVia = res.map(r=>{return new TramoModel(r)});

        listVia.map(v=>{
          
          let geom= new GeomModel(JSON.parse(v.geo_json));
          
          
          let c:any[]=geom.coordinates;

          if(geom && c){
            let coords=c.map(element => {
              return [element[1],element[0]]
            });
  
       

            
           const polyline= this.addLine(coords);

            /*
          polyline.bindPopup(`Tramo: ${v.nombre} <br> <a href="/">Ver </a>`);
            */
                  
          polyline.on('click', (e)=> {
           
            this.cerrarPopup();
            this.tramo = v;
            this.addLineSelect(coords);
            /*this.elementTramo=p;
            this.addMarkerSelect(p.latitud,p.longitud);*/

          });


          }
      
        
  
        });

      });


    }

    addLine(coords){
      var myStyle =
      {
          fillColor: '#1c9099',
          color:'red',
          weight: 8,
          opacity:0.8
      };


     return L.polyline(
      coords
    ).setStyle(myStyle).addTo(this.map);
    }


    addLineSelect(coords){
      (this.lineSelect)?this.removeFeature(this.lineSelect):null;
      
      var myStyle =
      {
          
        
          weight: 10
      };


      this.lineSelect = L.polyline(
      coords
    ).setStyle(myStyle).addTo(this.map);
    

    }


  add(){

 

    this.tramoService.getTramoCercano(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise()
    .then( (resp:TramoModel[])=>{

      localStorage.setItem("tramos",JSON.stringify(resp));

      this.navCtrl.navigateForward("/element-tramo");
    })
    
  }


  ionViewDidLeave() {  
    if(this.myInterval){
      clearInterval(this.myInterval);
    }
    
    if(this.myInterval2){
      clearInterval(this.myInterval2);
    }
    
    if(this.user.id_rol==1){
      this.map.remove();
    this.map = null;
    }
    
  }

logout(){
  this.authService.logout();
}


goElement(){
  this.router.navigate(['/element-tramo-update',this.elementTramo.id]);  
  /*this.navCtrl.navigateForward(`/element-tramo-update/${this.elementTramo.id}`);*/
}

goTramo(){
  this.router.navigate(['/tramo',this.tramo.id]);  
  
}

cerrarPopup(){
  this.tramo =null;
  this.elementTramo=null;
}

}
