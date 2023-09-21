import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTableDisplayComponent } from './question-table-display.component';

describe('QuestionTableDisplayComponent', () => {
  let component: QuestionTableDisplayComponent;
  let fixture: ComponentFixture<QuestionTableDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTableDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
