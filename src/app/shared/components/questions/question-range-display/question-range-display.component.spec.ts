import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRangeDisplayComponent } from './question-range-display.component';

describe('QuestionRangeDisplayComponent', () => {
  let component: QuestionRangeDisplayComponent;
  let fixture: ComponentFixture<QuestionRangeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRangeDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRangeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
