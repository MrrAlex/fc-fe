import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDownloadComponent } from './question-download.component';

describe('QuestionDownloadComponent', () => {
  let component: QuestionDownloadComponent;
  let fixture: ComponentFixture<QuestionDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
