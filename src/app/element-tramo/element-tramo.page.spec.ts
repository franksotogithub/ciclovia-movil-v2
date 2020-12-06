import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElementTramoPage } from './element-tramo.page';

describe('ElementTramoPage', () => {
  let component: ElementTramoPage;
  let fixture: ComponentFixture<ElementTramoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTramoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElementTramoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
