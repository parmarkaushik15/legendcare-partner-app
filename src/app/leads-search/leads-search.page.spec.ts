import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadsSearchPage } from './leads-search.page';

describe('LeadsSearchPage', () => {
  let component: LeadsSearchPage;
  let fixture: ComponentFixture<LeadsSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
