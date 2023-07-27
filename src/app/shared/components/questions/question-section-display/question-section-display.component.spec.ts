import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSectionDisplayComponent } from './question-section-display.component';

describe('QuestionSectionDisplayComponent', () => {
  let component: QuestionSectionDisplayComponent;
  let fixture: ComponentFixture<QuestionSectionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSectionDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSectionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
