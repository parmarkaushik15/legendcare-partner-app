import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillNowPage } from './bill-now.page';

describe('BillNowPage', () => {
  let component: BillNowPage;
  let fixture: ComponentFixture<BillNowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillNowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillNowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
