import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCheckboxDisplayComponent } from './question-checkbox-display.component';

describe('QuestionCheckboxDisplayComponent', () => {
  let component: QuestionCheckboxDisplayComponent;
  let fixture: ComponentFixture<QuestionCheckboxDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCheckboxDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCheckboxDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
