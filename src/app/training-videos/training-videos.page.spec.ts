import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingVideosPage } from './training-videos.page';

describe('TrainingVideosPage', () => {
  let component: TrainingVideosPage;
  let fixture: ComponentFixture<TrainingVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingVideosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
