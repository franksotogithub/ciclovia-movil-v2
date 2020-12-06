import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component ,OnInit, ViewChild} from '@angular/core';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController }  from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonContent  ,Platform} from '@ionic/angular';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { CicloViaModel } from '../model/ciclo_via/ciclo_via.model';
import { UsuarioModel } from '../model/usuario/usuario.model';
import {Storage} from '@ionic/storage';
import { DistritoModel } from '../model/distrito/distrito.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TramoService } from '../services/tramo.service';
import { TramoModel } from '../model/tramo/tramo.model';

class Port {
  public id: number;
  public name: string;
}


@Component({
  selector: 'app-ciclovia',
  templateUrl: './ciclovia.page.html',
  styleUrls: ['./ciclovia.page.scss'],
})
export class CicloviaPage implements OnInit {
  @ViewChild(IonContent ) content: IonContent ;
 
  dateNow = new Date();
  /*ports: Port[];
  port: Port;
*/
  tramos : TramoModel[];

  tramo:  TramoModel;
  sentido =[
    {value:'UNIDIRECCIONAL',text:'UNIDIRECCIONAL'},
    {value:'BIDIRECCIONAL',text:'BIDIRECCIONAL'},
    
  ];
  tiposVia =[
    {value:'CICLOVIA',text:'CICLOVIA',},
    {value:'CICLOCARRIL',text:'CICLOCARRIL',},
    {value:'CICLOSENDA',text:'CICLOSENDA',},
    {value:'CICLOACERA',text:'CICLOACERA',},
    {value:'CARRIL COMPARTIDO',text:'CARRIL COMPARTIDO',},
    {value:'VIA COMPARTIDA',text:'VIA COMPARTIDA',},
  ]

  
  tiposSegregador =[
    {value:'Bolardos',text:'Bolardos',},
    {value:'Topellantas',text:'Topellantas',},
    {value:'Tachones',text:'Tachones',},
    {value:'Sardines peraltado',text:'Sardines peraltado',},
    
  ]


  estadoSegregador =[
    {value:'MALO',text:'MALO',},
    {value:'REGULAR',text:'REGULAR',},
    {value:'BUENO',text:'BUENO',},
    {value:'REINSTALACION',text:'REINSTALACION',},
    
  ]


  tiposSeVer =[
    {value:'R-42',text:'R-42',},
    {value:'P-46',text:'P-46',},
    {value:'P-46A',text:'P-46A',},
    {value:'P-46B',text:'P-46B',},
    {value:'I-22',text:'I-22',},
  ]


  estadoSeVer =[
    {value:'LIMPIEZA',text:'LIMPIEZA',},
    {value:'CAMBIO DE PANEL',text:'CAMBIO DE PANEL',},
    {value:'PINTURA POSTE',text:'PINTURA POSTE',},
    {value:'REINSTALACION',text:'REINSTALACION',},
    
  ]

  tiposSeHor =[
    {value:'Linea continua ',text:'Linea continua ',},
    {value:'Linea discontinua',text:'Linea discontinua',},
    {value:'Cruce',text:'Cruce',},
    {value:'Pictogramas',text:'Pictogramas',},
    {value:'Patas de elefante',text:'Patas de elefante',},
  ]


  tiposSuRod =[
    {value:'Bacheo',text:'Bacheo',},
    {value:'Recapeo',text:'Recapeo',},
    {value:'Carpeta nueva',text:'Carpeta nueva',},
    {value:'Slurry',text:'Slurry',},
    
  ]


  puntoCicloVia: PuntoCicloViaModel;
  public cicloViaFormGroup: FormGroup;

  constructor( 
    public alertController: AlertController,
    private puntoCicloviaService: PuntoCicloviaService,
    private geolocation: Geolocation,
    private navCtrl : NavController,
    private formBuilder: RxFormBuilder,
    private storage : Storage,
    private tramoService: TramoService,
    private platform: Platform,
    ) {

    /*this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];*/

      /*this.settingForm();*/
    }



    getTramos(id){

      this.tramoService.getTramos(id).subscribe((tramos)=>{

        this.tramos = tramos.map(t=>new TramoModel(t));
      });

    }

    
    portChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      this.puntoCicloVia.tramo = event.value;
      
    }


   ngOnInit() {
    this.puntoCicloVia = new PuntoCicloViaModel(); 

    this.settingForm();

    let via: CicloViaModel= JSON.parse( localStorage.getItem("via"));
    let user: UsuarioModel=JSON.parse( localStorage.getItem("currentUser"));
    let distrito : DistritoModel = JSON.parse(localStorage.getItem("distrito"));
   
    this.puntoCicloVia.ciclovia=via.Name;
    this.puntoCicloVia.usuario =user.username; 
    this.puntoCicloVia.distrito = distrito.NOMBDIST; 
    
    let id=(via.OBJECTID)?via.OBJECTID:null; 
       
    this.getTramos(id);
/*
    this.platform.ready().then(() => { 
      this.geolocation.getCurrentPosition().then(pos => {

        console.log('pos>>',pos);
      });
});*/



/*
this.setLocation();*/

  }

  
  setLocation() {
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
  
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log( 'resp>>',resp);




      this.puntoCicloVia.latitud=resp.coords.latitude;
      this.puntoCicloVia.longitud= resp.coords.longitude;

      }).catch((error) => {
        
        console.log('error>>>',error);
        
        /*alert(JSON.stringify(error));*/
      });
      
      
  }


  ionViewDidEnter() {
    this.setLocation();
  }


  settingForm():void{
    this.cicloViaFormGroup = this.formBuilder.formGroup(this.puntoCicloVia);
    
    this.cicloViaFormGroup.valueChanges.subscribe(change=>{  
      
      this.puntoCicloVia.is_valid=this.cicloViaFormGroup.valid
      console.log(this.puntoCicloVia,this.cicloViaFormGroup );
    }); 
   }



  async alertaFormularioIncompleto(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'Falta completar campos',
      buttons: ['OK']
    });
    await alert.present();
    
  }



  guardar(){
    console.log(this.puntoCicloVia.is_valid)
    if(this.puntoCicloVia.is_valid){

      
      this.puntoCicloviaService.createPuntosCiclovia(this.puntoCicloVia).subscribe(res=>{
        
        if(res){
          this.navCtrl.navigateForward("/esri-map");
        }
      });

    }

    else{
      this.alertaFormularioIncompleto();
    }
    
  }


  regresar(){    
    this.navCtrl.navigateBack("/esri-map");     
   
  }


  public pageScroller(){
    this.content.scrollToTop();
  }
}
