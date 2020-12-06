import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeafletMapPage } from './leaflet-map.page';

describe('LeafletMapPage', () => {
  let component: LeafletMapPage;
  let fixture: ComponentFixture<LeafletMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
