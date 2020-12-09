import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from '../model/usuario/usuario.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import {Storage} from '@ionic/storage';
import {LoadingController}  from  '@ionic/angular'; 
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  error_usuario:boolean;
  error_message:string;
  usuario: UsuarioModel;
  public usuarioFormGroup: FormGroup;
  loading:any;
  TIME_IN_MS:2000;
  constructor(    private authService:AuthService,
    private navCtrl : NavController,
    private formBuilder: RxFormBuilder,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    ) {



     }

  ngOnInit() {

    this.usuario = new UsuarioModel();
    this.settingForm();
  }

  settingForm():void{
    this.usuarioFormGroup = this.formBuilder.formGroup(this.usuario);
    
    this.usuarioFormGroup.valueChanges.subscribe(change=>{  
      
      console.log(this.usuarioFormGroup);
      this.usuario.is_valid = this.usuarioFormGroup.valid;
    }); 
   }

   
   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
    
  }


  async registerUser(event){
    event.preventDefault();
    this.error_message="";
    console.log('this.usuario>>>',this.usuario);
    this.loading =this.loadingCtrl.create({
      message:'Por favor espere..'
    });

    (await this.loading).present();


    this.authService.registerUser(this.usuario).toPromise().then( async(res)=>{
      this.error_usuario = false;
      (await this.loading).dismiss();
      if(res){
        this.presentToast('Registro exitoso');       
    
     
      setTimeout( () => {
        this.navCtrl.navigateForward('/login'); 
      }, this.TIME_IN_MS);


      }
     
    },async(error)=>{
      
      console.log('error>>>',error);
      this.error_message='';
      (await this.loading).dismiss();
      if(error.status==400){
        this.error_usuario = true;
        this.error_message=error.error.message||'';
      }
    });


    /*this.authService.registerUser(this.usuario).toPromise().then(res=>{        

      this.error_usuario = false;
      if(res){

        this.navCtrl.navigateForward('/login');
      }
      else{
        
        this.error_usuario = true;
        this.error_message=" El usuario o el password no son correctos";
      }
      
    },error=>{
      this.error_message='';
      if(error.status==400){
        this.error_usuario = true;
        this.error_message=error.error.message||'';
      }
    });*/    
    
  }


  regresar(event)
  {
    this.navCtrl.navigateForward('/login');
  }



}
