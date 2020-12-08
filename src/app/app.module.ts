import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module


import { IonicStorageModule } from '@ionic/storage';
import {AuthInterceptor} from './core/interceptor/auth.interceptor';
import { IonicSelectableModule } from 'ionic-selectable';
import {Camera} from '@ionic-native/camera/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx'
import {WebcamModule} from 'ngx-webcam';
/*

import {environment} from './../environments/environment';*/
/*import { FirebaseX } from "@ionic-native/firebase-x/ngx";*/
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot({
      name: '_myDb',
      driverOrder: ['localstorage']}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    RxReactiveFormsModule,
    IonicSelectableModule,    
    WebcamModule,
    /*
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,*/
  ],
  providers: [
    
    Geolocation,
    StatusBar,
    SplashScreen,
    Camera,
    WebView,
    File,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
