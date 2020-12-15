import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

/*import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse} from '@ionic-native/background-geolocation/ngx';*/

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  arr : any[];
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {

    this.arr =[];
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      localStorage.setItem('urlPreview',this.previousUrl);
    });


    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();



    });



  }


}

