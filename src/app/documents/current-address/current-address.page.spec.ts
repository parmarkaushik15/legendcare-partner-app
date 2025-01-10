import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentAddressPage } from './current-address.page';

describe('CurrentAddressPage', () => {
  let component: CurrentAddressPage;
  let fixture: ComponentFixture<CurrentAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
