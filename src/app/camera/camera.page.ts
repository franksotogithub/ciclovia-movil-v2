import { Component,HostListener, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  
  width: number;
  height: number;
  camera:boolean=true;
  previusUrl :string ='';

  id: number;
  
  @HostListener('window:resize', ['$event'])
  urlPreview:string;
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
    
    this.videoOptions = {
 
      width : {ideal: 300},
       height : {ideal: 600},
     
     
      };
      
    
 
 
  }

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
 
  width : {ideal: 300},
   height : {ideal: 600},
 
 
  };

  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;
 
  public imageAsDataUrl:string;
 
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
 

  constructor(
    private router: Router,
    private navController:NavController
    /*private urlService: UrlService*/
    ) { 


  }

  ngOnInit() {
   
    
  }

  ionViewDidEnter(){
 
    this.onResize();

    this.urlPreview = localStorage.getItem('urlPreview')?localStorage.getItem('urlPreview'):null;



    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      
      /*
      const activeDeviceId: string = WebcamComponent.getDeviceIdFromMediaStreamTrack(stream.getVideoTracks()[0]);
      this.activeVideoInputIndex = activeDeviceId ? this.availableVideoInputs
        .findIndex((mediaDeviceInfo: MediaDeviceInfo) => mediaDeviceInfo.deviceId === activeDeviceId) : -1;
      this.videoInitialized = true;

      this.cameraSwitched.next(activeDeviceId);*/

    });
    this.nextWebcam.subscribe((e)=>{
     /*
      this.videoOptions = {
 
        width : {ideal: 300},
         height : {ideal: 600},
       
       
        };    */    
    })
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
 
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
 
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
 
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  
 public handleImage(webcamImage: WebcamImage): void {
  console.info('received webcam image', webcamImage.imageAsDataUrl);

  this.webcamImage = webcamImage;
  this.imageAsDataUrl = webcamImage.imageAsDataUrl;
 
  if(webcamImage.imageAsDataUrl){
    this.camera =false;
  }
}

public cameraWasSwitched(deviceId: string): void {
  console.log('active device: ' + deviceId);
  this.deviceId = deviceId;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}

openPhoto(){
  this.camera=false;
 }

 guardar(){
    localStorage.setItem('image',this.imageAsDataUrl);
    /*this.router.navigate([this.urlPreview]); */
    this.navController.navigateForward(this.urlPreview);
  /*this.movMercadoCasasModel.imgUrl =this.imageAsDataUrl; 
  
  this.idbService.updateItem(TablesDB.MOV_MERC_CASAS, this.movMercadoCasasModel,this.id);
   this.router.navigate([this.previusUrl]);
*/
}


 back(){
  this.camera=true;
 }
}
