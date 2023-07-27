import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseModulesPageComponent } from './edit-course-modules-page.component';

describe('EditCourseModulesPageComponent', () => {
  let component: EditCourseModulesPageComponent;
  let fixture: ComponentFixture<EditCourseModulesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseModulesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseModulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
