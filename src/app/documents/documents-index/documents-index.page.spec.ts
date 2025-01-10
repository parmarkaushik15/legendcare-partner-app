import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentsIndexPage } from './documents-index.page';

describe('DocumentsIndexPage', () => {
  let component: DocumentsIndexPage;
  let fixture: ComponentFixture<DocumentsIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
