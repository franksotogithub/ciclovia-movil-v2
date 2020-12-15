import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ElementTramoModel } from '../model/element-tramo/element-tramo.model';
import { ElementTramoService } from '../services/element-tramo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TramoService } from '../services/tramo.service';
import { TramoModel } from '../model/tramo/tramo.model';
import { UsuarioModel } from '../model/usuario/usuario.model';

import { ActivatedRoute, Router } from '@angular/router';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';


/*import {AngularFireStorage} from '@angular/fire/storage';*/


import { finalize } from 'rxjs/operators';
import { FileService } from '../services/file.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, IWriteOptions,FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import {LoadingController}  from  '@ionic/angular'; 

import {environment} from 'src/environments/environment';
import { async } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-element-tramo-update',
  templateUrl: './element-tramo-update.page.html',
  styleUrls: ['./element-tramo-update.page.scss'],
})
export class ElementTramoUpdatePage implements OnInit {

  elementos =[
    {value:'Elemento Segregador',text:'Elemento Segregador',
    tipos: [
      {value:'Bolardos',text:'Bolardos',},
      {value:'Topellantas',text:'Topellantas',},
      {value:'Tachones',text:'Tachones',},
      {value:'Sardines peraltado',text:'Sardines peraltado',},

    ],

    estados:[
 
    {value:'Malo',text:'Malo',},
    {value:'Regular',text:'Regular',},
    {value:'Bueno',text:'Bueno',},
    {value:'Reinstalacion',text:'Reinstalacion',},
    ]  
  },
    {value:'Señalizacion Vertical',text:'Señalizacion Vertical',
    tipos: [
      {value:'R-42',text:'R-42',},
      {value:'P-46',text:'P-46',},
      {value:'P-46A',text:'P-46A',},
      {value:'P-46B',text:'P-46B',},
      {value:'I-22',text:'I-22',},
    ],

    estados:[
      {value:'Limpieza',text:'Limpieza',},
      {value:'Cambio de panel',text:'Cambio de panel',},
      {value:'Pintura de poste',text:'Pintura de poste',},
      {value:'Reinstalacion',text:'Reinstalacion',},
    ]
  },
    {value:'Señalizacion Horizontal',text:'Señalizacion Horizontal',
  
    tipos:[
      {value:'Linea continua ',text:'Linea continua ',},
      {value:'Linea discontinua',text:'Linea discontinua',},
      {value:'Cruce',text:'Cruce',},
      {value:'Pictogramas',text:'Pictogramas',},
      {value:'Patas de elefante',text:'Patas de elefante',},
    ],
    estados:null,
  },
    {value:'Superficie de Rodadura',text:'Superficie de Rodadura',
    tipos:[
      {value:'Bacheo',text:'Bacheo',},
      {value:'Recapeo',text:'Recapeo',},
      {value:'Carpeta nueva',text:'Carpeta nueva',},
      {value:'Slurry',text:'Slurry',},
    ],

    estados:null,
  },

  {value:'Otro',text:'Otro',
  tipos:null,
  estados:null,
},
    
  ]

  elemento: ElementTramoModel;
  tipos :any[];
  estados:any[];
  tramos : TramoModel[];

  tramo:  TramoModel;
  image :any;

  uploadProgress:number;
  /*file:File;*/
  fileTemp:any;

  loading:any;

  constructor(
    private elementTramoService: ElementTramoService,
    private geolocation: Geolocation,
    private navCtrl : NavController,
    private tramoService: TramoService,
    private router: Router,
    private camera: Camera,
    private webView : WebView,
    private fileService: FileService,
    private file: File,
    private filePath: FilePath,
    private storage: Storage,
    private ref: ChangeDetectorRef,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,  
  ) { }

  ngOnInit() {
    localStorage.removeItem('image');
    const API_URL_PHOTO= environment.api_photo;  
    this.route.params.subscribe(params => {
      let id = parseInt(params.id); 
      this.elementTramoService.getElementTramo(id).subscribe((res)=>{
        if(res){
          this.elemento = new  ElementTramoModel(res);
          this.image = (this.elemento.img)?`${API_URL_PHOTO}${this.elemento.img}`:null; 


          let tipos=this.elementos.find(e=>e.value==this.elemento.elemento).tipos;
          let estados = this.elementos.find(e=>e.value==this.elemento.elemento).estados;

          this.tipos = tipos?tipos:[];
          this.estados = estados?estados:[];
        
        }          
      });
      
    });
  }

  
  ionViewDidEnter(){
    const imageTemp = localStorage.getItem('image')?localStorage.getItem('image'):null;
    
    if(imageTemp){

    this.image =imageTemp;

    }

  }


  initVia(){  
    this.tramos=JSON.parse( localStorage.getItem("tramos"));
  }



  getElemetTramo(){
    const API_URL_PHOTO= environment.api_photo;
  
    this.route.params.subscribe(params => {
      let id = parseInt(params.id); 
      this.elementTramoService.getElementTramo(id).toPromise().then((res)=>{
        if(res){
          this.elemento = new  ElementTramoModel(res);
          this.image = (this.elemento.img)?`${API_URL_PHOTO}${this.elemento.img}`:null; 


          let tipos=this.elementos.find(e=>e.value==this.elemento.elemento).tipos;
          let estados = this.elementos.find(e=>e.value==this.elemento.elemento).estados;

          this.tipos = tipos?tipos:[];
          this.estados = estados?estados:[];
        
        }  
        
      });
      
    });


  }


  getUsuario(){
    let user: UsuarioModel=JSON.parse( localStorage.getItem("currentUser"));
    this.elemento.usuario=user.username;
  }
  
 

  changeElemento(e){
   
    if(this.elemento.elemento){
      let tipos=this.elementos.find(e=>e.value==this.elemento.elemento).tipos;
      let estados = this.elementos.find(e=>e.value==this.elemento.elemento).estados;
      this.tipos = tipos?tipos:[];
      this.estados = estados?estados:[];
      this.elemento.tipo=null;
      this.elemento.data=null;
      this.elemento.observacion =null;
    }
  }


  getTramos(id?){

    this.tramoService.getTramos(id).subscribe((tramos)=>{

      this.tramos = tramos.map(t=>new TramoModel(t));
    });

  }


  


  async guardar(){    
    
    this.loading =this.loadingCtrl.create({
      message:'Por favor espere..'
    });
      
    (await this.loading).present();
  

    if(this.image){      
      let name=this.readFileAndSave();

    }
    else{
      this.updateElement();
    }
  
  
  }

  updateElement(){   
    this.elementTramoService.updateElementTramo(this.elemento.id,this.elemento).subscribe( async(e)=>{
      (await this.loading).dismiss();
      this.navCtrl.navigateForward("/leaflet-map"); 

    });      
}


  changeTramo(e){

    this.elemento.id_tramo=e.value.id
  }


  regresar(){    
    this.navCtrl.navigateForward("/leaflet-map");   
  }

  editarTramo(){
    this.router.navigate(['/tramo',this.tramo.id]);  
  }


  takePicture(){
    localStorage.setItem('urlPreview','/element-tramo');
    this.navCtrl.navigateForward('/camera'); 
  }




  readFileAndSave(){

    const formData = new FormData();
    
    fetch(this.image).then(value=>{
      value.blob().then( (blob:Blob)=>{
       formData.append('file', blob, 'ejemplo.jpg');
        this.fileService.uploadFile(formData).toPromise().then(e=>{
          this.elemento.img=e['file']['filename'];
          this.updateElement();
      });
      }
     );
    });
    
  }

  eliminar(){
    this.elementTramoService.deleteElementTramo(this.elemento.id).subscribe(async (e)=>{
      this.navCtrl.navigateRoot("/leaflet-map"); 
    });   

  }
}
