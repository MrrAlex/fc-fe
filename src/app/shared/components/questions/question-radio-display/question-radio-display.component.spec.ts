import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRadioDisplayComponent } from './question-radio-display.component';

describe('QuestionRadioDisplayComponent', () => {
  let component: QuestionRadioDisplayComponent;
  let fixture: ComponentFixture<QuestionRadioDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRadioDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRadioDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
