import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BasicPagesPage } from './basic-pages.page';

describe('BasicPagesPage', () => {
  let component: BasicPagesPage;
  let fixture: ComponentFixture<BasicPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
