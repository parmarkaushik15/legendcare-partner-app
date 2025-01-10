import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentityVerificationPage } from './identity-verification.page';

describe('IdentityVerificationPage', () => {
  let component: IdentityVerificationPage;
  let fixture: ComponentFixture<IdentityVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
