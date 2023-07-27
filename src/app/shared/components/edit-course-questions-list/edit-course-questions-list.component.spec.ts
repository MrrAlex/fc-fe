import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseQuestionsListComponent } from './edit-course-questions-list.component';

describe('EditCourseQuestionsListComponent', () => {
  let component: EditCourseQuestionsListComponent;
  let fixture: ComponentFixture<EditCourseQuestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseQuestionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
