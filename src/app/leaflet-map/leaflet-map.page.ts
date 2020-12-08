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
  eventHandlerAssigned=false;
  
  idElement:any;
  elementTramo : ElementTramoModel;
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

  /*
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { 
        maxZoom: 22,
        maxNativeZoom: 19,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
      .addTo(this.map); // This line is added to add the Tile Layer to our map
  */
 tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
 { 
   maxZoom: 21,
   maxNativeZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3'],
   
  })
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
    const location=(zoom)? this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude),20):this.map.setView(new L.LatLng( this.dataLocation.coords.latitude, this.dataLocation.coords.longitude));
  }

  removeMarker(marker){
    this.map.removeLayer(marker)
  }


    addMarker(latitude, longitude){
     return L.marker([latitude, longitude]).addTo(this.map);
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

          /*let html=document.getElementById("popup").innerHTML;*/
          /*marker.bindPopup(`Tramo: ${p.tramo.nombre}<br>Elemento: ${p.elemento} <br> <ion-button [routerLink]="['/element-tramo-update']" >Ver</ion-button>`  */
          /*marker.bindPopup(`Tramo: ${p.tramo.nombre}<br>Elemento: ${p.elemento} <br> <ion-button class="norwayLink">Ver</ion-button>`*/
          /*marker.bindPopup(html);*/
          

          marker.on('click', (e)=> {
            
            this.elementTramo=p;
          

          });
          
          this.elementTramoMarkerList.push(marker);
        }

        });

        /*
        function flyToNorway(){
          this.navCtrl.navigateForward("/element-tramo-update");
        }

        this.map.on('popupopen', function(){

          if (  document.querySelector('.norwayLink')){
            const link = document.querySelector('.norwayLink')
            link.addEventListener('click',flyToNorway);
           
          }
        
        });
  
  
        this.map.on('popupclose', function(){
          document.querySelector('.norwayLink').removeEventListener('click', flyToNorway)
           eventHandlerAssigned = false
        })*/

        
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
  
            console.log(coords);
           var polygon = L.polyline(
            coords
          ).addTo(this.map);
  
          }
      
        
  
        });

      });


    }



  add(){

 

    this.tramoService.getTramoCercano(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise()
    .then( (resp:TramoModel[])=>{

      localStorage.setItem("tramos",JSON.stringify(resp));

      this.navCtrl.navigateForward("/element-tramo");
    })
    
  }


  ionViewDidLeave() {  
    clearInterval(this.myInterval);
    
}

logout(){
  this.authService.logout();
}


goUpdate(){
  this.router.navigate(['/element-tramo-update',this.elementTramo.id]);  
  /*this.navCtrl.navigateForward(`/element-tramo-update/${this.elementTramo.id}`);*/
}
}
