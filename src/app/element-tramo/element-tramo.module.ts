import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementTramoPageRoutingModule } from './element-tramo-routing.module';

import { ElementTramoPage } from './element-tramo.page';
import { IonicSelectableModule } from 'ionic-selectable';
import {environment} from './../../environments/environment';


/*import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementTramoPageRoutingModule,
    IonicSelectableModule,
    /*AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,*/
  ],
  declarations: [ElementTramoPage,
    
  ]
})
export class ElementTramoPageModule {}
