import { Component ,OnInit, ViewChild} from '@angular/core';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController }  from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { TramoService } from '../services/tramo.service';
import { FormGroup } from '@angular/forms';
import { TramoModel } from '../model/tramo/tramo.model';
import { UsuarioModel } from '../model/usuario/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tramo',
  templateUrl: './tramo.page.html',
  styleUrls: ['./tramo.page.scss'],
})
export class TramoPage implements OnInit {
  
  public tramoFormGroup: FormGroup;
  tramo : TramoModel;
  tramos : TramoModel[];
  dateNow = new Date();
  
  sentidoVia =[
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


  constructor(    
    public alertController: AlertController,
    private puntoCicloviaService: PuntoCicloviaService,
    private geolocation: Geolocation,
    private navCtrl : NavController,
    private formBuilder: RxFormBuilder,
    private tramoService: TramoService,
    private route: ActivatedRoute, 
 
    ) { 


    }




  ngOnInit() {

    this.route.params.subscribe(params => {
         let id = parseInt(params.id); 
         this.tramoService.getTramo(id).subscribe(res=>{
            this.tramo=(res)?res:new TramoModel();
            this.initUsuario();
            
         });

    });

    
  }

  initUsuario(){  
    let usuario: UsuarioModel=JSON.parse( localStorage.getItem("currentUser"));    
    this.tramo.usuario = (usuario.username)?usuario.username:null;   
   
  }

  
  settingForm():void{


    /*
    this.tramoFormGroup = this.formBuilder.formGroup(this.tramo);
    
    this.tramoFormGroup.valueChanges.subscribe(change=>{  
      
      
    }); 
    */
   }

  
  regresar(){    
    console.log('holass')
    this.navCtrl.navigateRoot("/element-tramo");     
   
  }
  guardar(){
    this.tramoService.updateTramo(this.tramo.id,this.tramo).subscribe(res=>{
        this.navCtrl.navigateRoot("/element-tramo");    
    });

    /*if(this.puntoCicloVia.is_valid){

      
      this.puntoCicloviaService.createPuntosCiclovia(this.puntoCicloVia).subscribe(res=>{
        
        if(res){
          this.navCtrl.navigateForward("/esri-map");
        }
      });

    }

    else{
      this.alertaFormularioIncompleto();
    }
*/
  }

  

}
