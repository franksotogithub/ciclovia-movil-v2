import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ElementTramoModel } from '../model/element-tramo/element-tramo.model';
import { ElementTramoService } from '../services/element-tramo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TramoService } from '../services/tramo.service';
import { TramoModel } from '../model/tramo/tramo.model';
import { UsuarioModel } from '../model/usuario/usuario.model';
import { CicloViaModel } from '../model/ciclo_via/ciclo_via.model';
import { Router } from '@angular/router';
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

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-element-tramo',
  templateUrl: './element-tramo.page.html',
  styleUrls: ['./element-tramo.page.scss'],
})
export class ElementTramoPage implements OnInit {
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
    public loadingCtrl: LoadingController
    /*private storage: AngularFireStorage*/
  ) { }

  ngOnInit() {

    this.elemento = new ElementTramoModel();   
    this.setLocation();
    this.getUsuario();
    this.initVia();

  }

  initVia(){
  
    this.tramos=JSON.parse( localStorage.getItem("tramos"));


  }





  getUsuario(){
    let user: UsuarioModel=JSON.parse( localStorage.getItem("currentUser"));
    this.elemento.usuario=user.username;
  }
  
  setLocation() {
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
  
    this.geolocation.getCurrentPosition(options).then((resp) => {


      this.elemento.latitud=resp.coords.latitude;
      this.elemento.longitud= resp.coords.longitude;

      }).catch((error) => {
        
        
 
      });
      
      
  }

  changeElemento(e){
   
    if(this.elemento.elemento){
      let tipos=this.elementos.find(e=>e.value==this.elemento.elemento).tipos;
      let estados = this.elementos.find(e=>e.value==this.elemento.elemento).estados;
      this.tipos = tipos?tipos:[];
      this.estados = estados?estados:[];
      this.elemento.tipo=null;
      this.elemento.estado=null;
      this.elemento.valor =null;

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
  

    if(this.fileTemp){      
      let name=this.readFile(this.fileTemp);

    }
    else{
      this.createElement();
    }
      /*
    
    if(this.elemento.id){
      
      let name=this.readFile(this.fileTemp);
      console.log('name>>',name);

    }

    else{

      let name=this.readFile(this.fileTemp);
      console.log('name>>',name);

      

    }    */
  }



 

   createElement(){
      
      this.elementTramoService.createElementTramo(this.elemento).subscribe(async (e)=>{
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
    /*
    localStorage.setItem("tramo",JSON.stringify(this.tramo));
    this.navCtrl.navigateForward("/tramo"); */
    this.router.navigate(['/tramo',this.tramo.id]);  
    
  }


  takePicture(){

 

   const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.CAMERA,
    targetWidth:720,
    correctOrientation: true,
  }
    

 

   this.camera.getPicture(options).then((imageData) => {
    this.image = this.webView.convertFileSrc(imageData);
    this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
      entry.file(file => {
        console.log(file);
       
        this.fileTemp = file;
      });
    });
  }, (err) => {
   
  });


/*

this.navCtrl.navigateForward('/camera'); */


  }




   readFile(file: any) {

    let filename:any;

    /*if(!file){
      cb();
    */

    
      const reader = new FileReader();
      
      filename=reader.onloadend = async () => {
        const imgBlob = new Blob([reader.result], {
          type: file.type
        });
        const formData = new FormData();
        /*formData.append('name', 'Hello');*/
        formData.append('file', imgBlob, file.name);
        this.fileService.uploadFile(formData).toPromise().then(e=>{
            console.log('e>>',e['file']['filename']);
            
            this.elemento.img=e['file']['filename'];
            this.createElement();
        });
        
        
      };
      reader.readAsArrayBuffer(file);
      return filename;

  }



  
  /*
  uploadPicture(callback){


    const randomID= Math.random().toString(36).substring(2,8);
    const filePath=`files/${new Date().getTime()}_${randomID}`
    const uploadTask = this.storage.upload(filePath,this.image);
    const fileRef = this.storage.ref(filePath);

    uploadTask.percentageChanges().subscribe(changes=>{

      this.uploadProgress = changes;


    });


    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url)=>{ 
        this.elemento.img= url;
        callback();

      });} 
    )
   )
  .subscribe()

  }*/




  /*



  
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webView.convertFileSrc(img);
      return converted;
    }
  }
 


  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}
 
copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        this.presentToast('Error while storing file.');
    });
}

updateStoredImages(name) {
  this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
          let newImages = [name];
          this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
          arr.push(name);
          this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
  });
}




deleteImage(imgEntry, position) {
  this.images.splice(position, 1);

  this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
          this.presentToast('File removed.');
      });
  });
}






startUpload(imgEntry) {
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast('Error while reading file.');
      });
}


readFile(file: any) {
  const reader = new FileReader();
  reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}





async uploadImageData(formData: FormData) {
  const loading = await this.loadingController.create({
      message: 'Uploading image...',
  });
  await loading.present();

  this.http.post("http://localhost:8888/upload.php", formData)
      .pipe(
          finalize(() => {
             loading.dismiss();
          })
      )
      .subscribe(res => {
          
        
        if (res['success']) {
              this.presentToast('File upload complete.')
          } else {
              this.presentToast('File upload failed.')
          }
      });
}*/
 

}
