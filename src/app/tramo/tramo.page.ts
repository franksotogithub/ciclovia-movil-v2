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
import { SenialVerticalRequest} from '../model/senial_vertical/senial_vertical';

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
    {value:'CONTRAFLUJO VEHICULAR',text:'CONTRAFLUJO VEHICULAR'},
  ];


  ubicacion =[
    {value:'BERMA CENTRAL',text:'BERMA CENTRAL'},
    {value:'BERMA LATERAL',text:'BERMA LATERAL'},
    
  ];

  tiposVia =[
    {value:'CICLOVIA',text:'CICLOVIA',},
    {value:'CICLOCARRIL',text:'CICLOCARRIL',},
    {value:'CICLOSENDA',text:'CICLOSENDA',},
    {value:'CICLOACERA',text:'CICLOACERA',},
    {value:'CARRIL COMPARTIDO',text:'CARRIL COMPARTIDO',},
    {value:'VIA COMPARTIDA',text:'VIA COMPARTIDA',},
  ]
 

  calificacion =[
    {value:'BUENO',text:'BUENO',},
    {value:'REGULAR',text:'REGULAR',},
    {value:'MALO',text:'MALO',},

  ]

  senial_otros=[

    {value:'P-46C',text:'P-46C',img:'p-46c.png'},
    {value:'P-46D',text:'P-46D',img:'p-46d.png'},
    {value:'P-46E',text:'P-46E',img:'p-46e.png'},
    {value:'R-22',text:'R-22',img:'r-22.png'},
    {value:'CICLOPARQUEADERO',text:'CICLOPARQUEADERO',img:'cicloparqueadero.png'},
    {value:'PRIORIDAD',text:'PRIORIDAD',img:'prioridad.png'},
    {value:'R-58A',text:'R-58A',img:'r-58a.png'},
    {value:'R-42C',text:'R-42C',img:'r-42c.png'},


  ]


  imgs:string[] =[];
  /*senial:string;*/
/*
  senial:any=
    {value:'p-46c',text:'P-46C',img:'p-46c.png'};
*/

  
  senialVericalList:SenialVerticalRequest[]=[



    /*
    {nombre:'R-42',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'r-42.png'},
    {nombre:'P-46',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46.png'},

    {nombre:'P-46A',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46a.png'},
    {nombre:'P-46B',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46b.png'},*/

    {nombre:'R-42',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'r-42.png'},
    {nombre:'P-46',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46.png'},

    {nombre:'P-46A',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46a.png'},
    {nombre:'P-46B',cant_buena:0,cant_regular:0,cant_mala:0,total:0,img:'p-46b.png'},

  ];

  senialVericalList2:any[]=[


    {nombre:'senial_v_1_tipo',cant_buena:'senial_v_1_cant_buena',cant_regular:'senial_v_1_cant_regular',cant_mala:'senial_v_1_cant_mala',total:'senial_v_1_total',img:'r-42.png'},
    {nombre:'senial_v_2_tipo',cant_buena:'senial_v_2_cant_buena',cant_regular:'senial_v_2_cant_regular',cant_mala:'senial_v_2_cant_mala',total:'senial_v_2_total',img:'p-46.png'},

    {nombre:'senial_v_3_tipo',cant_buena:'senial_v_3_cant_buena',cant_regular:'senial_v_3_cant_regular',cant_mala:'senial_v_3_cant_mala',total:'senial_v_3_total',img:'p-46a.png'},
    {nombre:'senial_v_4_tipo',cant_buena:'senial_v_4_cant_buena',cant_regular:'senial_v_4_cant_regular',cant_mala:'senial_v_4_cant_mala',total:'senial_v_4_total',img:'p-46b.png'},
    {nombre:'senial_v_1_o_tipo',cant_buena:'senial_v_1_o_cant_buena',cant_regular:'senial_v_1_o_cant_regular',cant_mala:'senial_v_1_o_cant_mala',total:'senial_v_1_o_total',img:'',otro:true},
    {nombre:'senial_v_2_o_tipo',cant_buena:'senial_v_2_o_cant_buena',cant_regular:'senial_v_2_o_cant_regular',cant_mala:'senial_v_2_o_cant_mala',total:'senial_v_2_o_total',img:'',otro:true},
    {nombre:'senial_v_3_o_tipo',cant_buena:'senial_v_3_o_cant_buena',cant_regular:'senial_v_3_o_cant_regular',cant_mala:'senial_v_3_o_cant_mala',total:'senial_v_3_o_total',img:'',otro:true},
  ];


  elemSegregadorList:any[]=[


    {nombre:'segregador_1_tipo',estado:'segregador_1_estado',porcentaje:'segregador_1_porcentaje',img:'bolardos.png'},
    {nombre:'segregador_2_tipo',estado:'segregador_2_estado',porcentaje:'segregador_2_porcentaje',img:'topellantas.png'},
    {nombre:'segregador_3_tipo',estado:'segregador_3_estado',porcentaje:'segregador_3_porcentaje',img:'tachones.png'},
    {nombre:'segregador_4_tipo',estado:'segregador_4_estado',porcentaje:'segregador_4_porcentaje',img:'sardinel.png'},
    {nombre:'segregador_1_o_tipo',estado:'segregador_1_o_estado',porcentaje:'segregador_1_o_porcentaje',img:'', otro:true},
    {nombre:'segregador_2_o_tipo',estado:'segregador_2_o_estado',porcentaje:'segregador_2_o_porcentaje',img:'', otro:true},
  ];


  senialHList:any[]=[


    {nombre:'senial_h_1_tipo',cant_buena:'senial_h_1_por_bueno',cant_regular:'senial_h_1_por_regular',cant_mala:'senial_h_1_por_malo' ,img:'interior-ciclovia.png'},
    {nombre:'senial_h_2_tipo',cant_buena:'senial_h_2_por_bueno',cant_regular:'senial_h_2_por_regular',cant_mala:'senial_h_2_por_malo' ,img:'cruces.png'},
    

  ];


  estadoList:any[]=[
    {nombre:'estado_1_tipo',porcentaje:'estado_1_por',obs:'estado_1_obs'},
    {nombre:'estado_2_tipo',porcentaje:'estado_2_por',obs:'estado_2_obs'},
    {nombre:'estado_3_tipo',porcentaje:'estado_3_por',obs:'estado_3_obs'},
    {nombre:'estado_4_tipo',porcentaje:'estado_4_por',obs:'estado_4_obs'},
    {nombre:'estado_5_tipo',porcentaje:'estado_5_por',obs:'estado_5_obs'},
    {nombre:'estado_6_tipo',porcentaje:'estado_6_por',obs:'estado_6_obs'},
    {nombre:'estado_7_tipo',porcentaje:'estado_7_por',obs:'estado_7_obs'},
    {nombre:'estado_8_tipo',porcentaje:'estado_8_por',obs:'estado_8_obs'},

  ]

  seguridadList:any[]=[
    {nombre:'seguridad_1_tipo',porcentaje:'seguridad_1_por'},
    {nombre:'seguridad_2_tipo',porcentaje:'seguridad_2_por'},
    

  ]

/*

this.senial_v_1_tipo           =t?t.senial_v_1_tipo:'R-42';
   this.senial_v_1_cant_buena     =t?.senial_v_1_cant_buena    ;          
   this.senial_v_1_cant_regular   =t?.senial_v_1_cant_regular  ;        
   this.senial_v_1_cant_mala      =t?.senial_v_1_cant_mala     ;  

*/


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
         
         /*this.tramoService.getTramo(id).subscribe(res=>{
            this.tramo=(res)?res:new TramoModel();
            this.initUsuario();
            
         });*/
         this.tramo = new TramoModel();
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

    console.log('this.tramo>>>',this.tramo);
    /*this.tramoService.updateTramo(this.tramo.id,this.tramo).subscribe(res=>{
        this.navCtrl.navigateRoot("/element-tramo");    
    });
*/
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


  onChange(newValue,item){
    
    let s=this.senial_otros.find((e)=>e.value==newValue.target.value);
    item.img=s.img;
    
    /*this.senial=s.img;*/
  }
  /*
  onChangeCantidadSv(e,item:SenialVerticalRequest){

    item.total = item.cant_buena + item.cant_mala + item.cant_regular; 
  }*/

  onChangeCantidadSv(e,tramo,item:any){
    
    tramo[item.total] = tramo[item.cant_buena] + tramo[item.cant_mala] + tramo[item.cant_regular]; 
  }

}
