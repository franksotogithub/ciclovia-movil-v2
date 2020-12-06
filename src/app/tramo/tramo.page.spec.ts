import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TramoPage } from './tramo.page';

describe('TramoPage', () => {
  let component: TramoPage;
  let fixture: ComponentFixture<TramoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TramoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
