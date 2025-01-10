import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimaryBusinessPage } from './primary-business.page';

describe('PrimaryBusinessPage', () => {
  let component: PrimaryBusinessPage;
  let fixture: ComponentFixture<PrimaryBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
