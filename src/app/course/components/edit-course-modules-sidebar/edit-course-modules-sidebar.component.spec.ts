import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseModulesSidebarComponent } from './edit-course-modules-sidebar.component';

describe('EditCourseModulesSidebarComponent', () => {
  let component: EditCourseModulesSidebarComponent;
  let fixture: ComponentFixture<EditCourseModulesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseModulesSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourseModulesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
