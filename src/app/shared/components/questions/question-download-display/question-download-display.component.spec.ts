import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDownloadDisplayComponent } from './question-download-display.component';

describe('QuestionDownloadDisplayComponent', () => {
  let component: QuestionDownloadDisplayComponent;
  let fixture: ComponentFixture<QuestionDownloadDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDownloadDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDownloadDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
