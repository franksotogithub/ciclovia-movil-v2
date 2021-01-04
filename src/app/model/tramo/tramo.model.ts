import { TramoRequets } from './tramo.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class TramoModel implements  TramoRequets {


  id: number;
  nombre_via: string;
  nombre:string;
  geo_json: any;
 id_via: number;
 seccion_vial_normativa :string;
 seccion_vial_actual : string;
 tipo: string;
 sentido: string;
 ubicacion : string;
 usuario:string;

 espacio_1_tipo :string;
 espacio_1_ancho : number;
 espacio_1_porcentaje : number;
 
 espacio_2_tipo : string;
 espacio_2_ancho : number;
 espacio_2_porcentaje : number;
 
 espacio_3_tipo : string;
 espacio_3_ancho : number;
 espacio_3_porcentaje : number;
 
 espacio_4_tipo : string;
 espacio_4_ancho : number;
 espacio_4_porcentaje : number;


 segregador_1_tipo : string;
 segregador_1_estado : string;
 segregador_1_porcentaje : number;
 
 segregador_2_tipo : string;
 segregador_2_estado : string;
 segregador_2_porcentaje : number;
 
 segregador_3_tipo : string;
 segregador_3_estado : string;
 segregador_3_porcentaje : number;
 
 segregador_4_tipo : string;
 segregador_4_estado : string;
 segregador_4_porcentaje : number;


 segregador_1_o_tipo : string;
 segregador_1_o_estado : string;
 segregador_1_o_porcentaje : number;

 
 
 segregador_2_o_tipo : string;
 segregador_2_o_estado : string;
 segregador_2_o_porcentaje : number;

 senial_v_1_tipo :string;
 senial_v_1_cant_buena:number;
 senial_v_1_cant_regular:number;
 senial_v_1_cant_mala:number;
 senial_v_1_total:number;

 senial_v_2_tipo :string;
 senial_v_2_cant_buena:number;
 senial_v_2_cant_regular:number;
 senial_v_2_cant_mala:number;
 senial_v_2_total:number;
 
 senial_v_3_tipo :string;
 senial_v_3_cant_buena:number;
 senial_v_3_cant_regular:number;
 senial_v_3_cant_mala:number;
 senial_v_3_total:number;
 
 senial_v_4_tipo :string;
 senial_v_4_cant_buena:number;
 senial_v_4_cant_regular:number;
 senial_v_4_cant_mala:number;
 senial_v_4_total:number;

 
 senial_v_1_o_tipo :string;
 senial_v_1_o_cant_buena:number;
 senial_v_1_o_cant_regular:number;
 senial_v_1_o_cant_mala:number;
 senial_v_1_o_total:number;

 senial_v_2_o_tipo :string;
 senial_v_2_o_cant_buena:number;
 senial_v_2_o_cant_regular:number;
 senial_v_2_o_cant_mala:number;
 senial_v_2_o_total:number;

 senial_v_3_o_tipo :string;
 senial_v_3_o_cant_buena:number;
 senial_v_3_o_cant_regular:number;
 senial_v_3_o_cant_mala:number;
 senial_v_3_o_total:number;

 senial_h_1_tipo :string;
 senial_h_1_por_bueno:number;s
 senial_h_1_por_regular:number;
 senial_h_1_por_malo:number;
  
 
 senial_h_2_tipo :string;
 senial_h_2_por_bueno:number;
 senial_h_2_por_regular:number;
 senial_h_2_por_malo:number;


 estado_1_tipo : string;
 estado_1_por : number;
 estado_1_obs : string;


 estado_2_tipo : string;
 estado_2_por : number
 estado_2_obs : string;


 estado_3_tipo : string;
 estado_3_por : number;
 estado_3_obs : string;

 estado_4_tipo : string;
 estado_4_por : number;
 estado_4_obs : string;


 estado_5_tipo : string;
 estado_5_por : number;
 estado_5_obs : string;


 estado_6_tipo : string;
 estado_6_por : number;
 estado_6_obs : string;

 estado_7_tipo : string;
 estado_7_por : number;
 estado_7_obs : string;

 estado_8_tipo : string;
 estado_8_por : number;
 estado_8_obs : string;

 seguridad_1_tipo : string;
 seguridad_1_por : number;
 

 seguridad_2_tipo : string;
 seguridad_2_por : number;



  constructor(t?: TramoRequets){

    this.id=t?.id;
    this.nombre_via=t?.nombre_via;
   this.id_via = t?.id_via;
   this.seccion_vial_normativa= t?.seccion_vial_normativa;
   this.seccion_vial_actual= t?.seccion_vial_actual;
   this.tipo = t?.tipo;
   this.sentido = t?.sentido;
   this.ubicacion = t?.ubicacion;
     this.usuario = t?.usuario;
     this.nombre = t?.nombre;
     this.geo_json = t?.geo_json;
     
   this.espacio_1_tipo = (t && t.espacio_1_tipo)?t.espacio_1_tipo:'JARDINERA CON VEGETACION' ;
   this.espacio_1_ancho =t?t.espacio_1_ancho:0;
   this.espacio_1_porcentaje =t?t.espacio_1_porcentaje:0;
   
   this.espacio_2_tipo =(t && t.espacio_2_tipo)?t.espacio_2_tipo:'VEREDA';
   this.espacio_2_ancho = t?t.espacio_2_ancho:0;
   this.espacio_2_porcentaje =t?t.espacio_2_porcentaje:0;
   
   this.espacio_3_tipo = (t && t.espacio_3_tipo)?t.espacio_3_tipo:'ESTACIONAMIENTOS VEHICULAR PUBLICO';
   this.espacio_3_ancho =t?t.espacio_3_ancho:0;
   this.espacio_3_porcentaje =t?t.espacio_3_porcentaje:0;
   
   this.espacio_4_tipo=(t && t.espacio_4_tipo)?t.espacio_4_tipo:'RAMPA DE ACCESO VEHICULAR' ;
   this.espacio_4_ancho =t?t.espacio_4_ancho:0;
   this.espacio_4_porcentaje=t?t.espacio_4_porcentaje:0 ;
  
  
   this.segregador_1_tipo=(t&&t.segregador_1_tipo)?t.segregador_1_tipo:'BOLARDOS';
   this.segregador_1_estado =t?.segregador_1_estado;
   this.segregador_1_porcentaje =t?t.segregador_1_porcentaje:0;
   
   this.segregador_2_tipo=(t &&t.segregador_2_tipo)?t.segregador_2_tipo:'TOPELLANTAS';
   this.segregador_2_estado =t?.segregador_2_estado;
   this.segregador_2_porcentaje =t?t.segregador_2_porcentaje:0;
   
   this.segregador_3_tipo = (t && t.segregador_3_tipo)?t.segregador_3_tipo:'TACHONES' ;
   this.segregador_3_estado       =t?.segregador_3_estado;
   this.segregador_3_porcentaje   =t?t.segregador_3_porcentaje:0;
   
   this.segregador_4_tipo         = (t && t.segregador_4_tipo)?t.segregador_4_tipo:'SARDINEL PERALTADO';
   this.segregador_4_estado       =t?.segregador_4_estado;
   this.segregador_4_porcentaje   =t?t.segregador_4_porcentaje:0;
  
   this.segregador_1_o_tipo         =t?.segregador_1_o_tipo;
   this.segregador_1_o_estado       =t?.segregador_1_o_estado;
   this.segregador_1_o_porcentaje   =t?t.segregador_1_o_porcentaje:0;

 
 
   this.segregador_2_o_tipo         =t?.segregador_2_o_tipo;
   this.segregador_2_o_estado       =t?.segregador_2_o_estado;
   this.segregador_2_o_porcentaje   =t?t.segregador_2_o_porcentaje:0;

   this.senial_v_1_tipo           = (t && t.senial_v_1_tipo)?t.senial_v_1_tipo:'R-42';
   this.senial_v_1_cant_buena     =t?t.senial_v_1_cant_buena:0   ;          
   this.senial_v_1_cant_regular   =t?t.senial_v_1_cant_regular:0  ;        
   this.senial_v_1_cant_mala      =t?t.senial_v_1_cant_mala:0     ;  
   this.senial_v_1_total          =t?t.senial_v_1_total:0         ;  

   this.senial_v_2_tipo           =(t && t.senial_v_2_tipo)?t.senial_v_2_tipo:'P-46'          ;   
   this.senial_v_2_cant_buena     =t?t.senial_v_2_cant_buena:0    ;   
   this.senial_v_2_cant_regular   =t?t.senial_v_2_cant_regular:0  ;   
   this.senial_v_2_cant_mala      =t?t.senial_v_2_cant_mala:0     ;   

   this.senial_v_2_total          =t?t.senial_v_2_total:0         ;   

   this.senial_v_3_tipo           = (t && t.senial_v_3_tipo) ?t.senial_v_3_tipo :   'P-46A'     ; 
   this.senial_v_3_cant_buena     =t?t.senial_v_3_cant_buena:0    ; 
   this.senial_v_3_cant_regular   =t?t.senial_v_3_cant_regular:0  ;   
   this.senial_v_3_cant_mala      =t?t.senial_v_3_cant_mala:0     ;   
   this.senial_v_3_total          =t?t.senial_v_3_total:0         ;      

   this.senial_v_4_tipo           = (t && t.senial_v_4_tipo) ?t.senial_v_4_tipo :   'P-46B' ;     
   this.senial_v_4_cant_buena     =t?t.senial_v_4_cant_buena:0    ;   
   this.senial_v_4_cant_regular   =t?t.senial_v_4_cant_regular:0  ;     
   this.senial_v_4_cant_mala      =t?t.senial_v_4_cant_mala:0     ;   
   this.senial_v_4_total          =t?t.senial_v_4_total:0         ; 
   
   this.senial_v_1_o_tipo           =t?.senial_v_1_o_tipo;     
   this.senial_v_1_o_cant_buena   =t?t.senial_v_1_o_cant_buena:0  ;     
   this.senial_v_1_o_cant_regular =t?t.senial_v_1_o_cant_regular:0;     
   this.senial_v_1_o_cant_mala    =t?t.senial_v_1_o_cant_mala:0   ;     
   this.senial_v_1_o_total        =t?t.senial_v_1_o_total:0       ;   

   this.senial_v_2_o_tipo          =t?.senial_v_2_o_tipo;   
   this.senial_v_2_o_cant_buena   =t?t.senial_v_2_o_cant_buena:0  ;       
   this.senial_v_2_o_cant_regular =t?t.senial_v_2_o_cant_regular:0;       
   this.senial_v_2_o_cant_mala    =t?t.senial_v_2_o_cant_mala:0   ;       
   this.senial_v_2_o_total        =t?t.senial_v_2_o_total:0       ;  

   this.senial_v_3_o_tipo          =t?.senial_v_3_o_tipo;   
   this.senial_v_3_o_cant_buena   =t?t.senial_v_3_o_cant_buena:0  ;       
   this.senial_v_3_o_cant_regular =t?t.senial_v_3_o_cant_regular:0;       
   this.senial_v_3_o_cant_mala    =t?t.senial_v_3_o_cant_mala:0   ;       
   this.senial_v_3_o_total        =t?t.senial_v_3_o_total:0       ;  



   this.senial_h_1_tipo           = (t && t.senial_h_1_tipo)?t.senial_h_1_tipo:'INTERIOR CICLOVIA'          ;

   this.senial_h_1_por_bueno      =t?.senial_h_1_por_bueno     ;     
   this.senial_h_1_por_regular    =t?.senial_h_1_por_regular   ;     
   this.senial_h_1_por_malo       =t?.senial_h_1_por_malo      ;     

   this.senial_h_2_tipo           = (t && t.senial_h_2_tipo)?t.senial_h_2_tipo:'CRUCES'          ;     
   this.senial_h_2_por_bueno      =t?.senial_h_2_por_bueno     ;     
   this.senial_h_2_por_regular    =t?.senial_h_2_por_regular   ;     
   this.senial_h_2_por_malo       =t?.senial_h_2_por_malo      ; 


   
 
   this.estado_1_tipo = (t && t.estado_1_tipo)?t.estado_1_tipo:'AGRIETAMIENTO'  ;     
   this.estado_1_por =t?.estado_1_por;     
   this.estado_1_obs =t?.estado_1_obs;     
  
  
    
   this.estado_2_tipo =(t && t.estado_2_tipo)?t.estado_2_tipo:'HUNDIMIENTO'  ;     
   this.estado_2_por =t?.estado_2_por;     
   this.estado_2_obs =t?.estado_2_obs;     
  
  
   this.estado_3_tipo =(t && t.estado_3_tipo)?t.estado_3_tipo:'RAICES DE ARBOL'  ;     
   this.estado_3_por =t?.estado_3_por;     
   this.estado_3_obs =t?.estado_3_obs;     


   this.estado_4_tipo =(t && t.estado_4_tipo) ?t.estado_4_tipo:'OBRAS DE SERVICIO'  ;     
   this.estado_4_por =t?.estado_4_por;     
   this.estado_4_obs =t?.estado_4_obs;     

  
   this.estado_5_tipo =(t && t.estado_5_tipo)?t.estado_5_tipo:'ELEMENTOS URBANOS QUE OBSTRUYEN'  ;     
   this.estado_5_por =t?.estado_5_por;     
   this.estado_5_obs =t?.estado_5_obs;   

   this.estado_6_tipo =(t && t.estado_6_tipo)?t.estado_6_tipo:'ACUMULACION DE RESIDUOS SOLIDOS'  ;     
   this.estado_6_por =t?.estado_6_por;     
   this.estado_6_obs =t?.estado_6_obs;     

   this.estado_7_tipo =(t && t.estado_7_tipo)?t.estado_7_tipo:'CRUCES PEATONALES ';

   this.estado_7_por =t?.estado_7_por;     

   this.estado_7_obs =t?.estado_7_obs; 

   this.estado_8_tipo =(t && t.estado_8_tipo)?t.estado_8_tipo:'CRUCES VEHICULARES NO SEÑALIZADOS';     

   this.estado_8_por =t?.estado_8_por;     
   this.estado_8_obs =t?.estado_8_obs;   
   
   
   this.seguridad_1_tipo = (t && t.seguridad_1_tipo)?t.seguridad_1_tipo:'ILUMINACION';
   this.seguridad_1_por = t?.seguridad_1_por;
   this.seguridad_2_tipo = (t && t.seguridad_2_tipo ) ?t.seguridad_2_tipo:'EQUIPAMIENTO DE SEGURIDAD';
   this.seguridad_2_por  = t?.seguridad_2_por;

  }


}
  