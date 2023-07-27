import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTextDisplayComponent } from './question-text-display.component';

describe('QuestionTextDisplayComponent', () => {
  let component: QuestionTextDisplayComponent;
  let fixture: ComponentFixture<QuestionTextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTextDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
