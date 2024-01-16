import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as LessonActions from './lesson.actions';
import { Lesson } from '../models/lesson.model';
import { cloneDeep } from 'lodash-es';

export interface LessonState extends EntityState<Lesson> {
  loading: boolean;
  success?: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const lessonsAdapter = createEntityAdapter<Lesson>({
  selectId: (lesson: Lesson) => lesson._id,
});

const initialState: LessonState = lessonsAdapter.getInitialState({
  loading: false,
  success: undefined,
  errorMessage: null,
  successMessage: null,
});

const successMessage = (successMessage: string | null) => ({
  loading: false,
  success: true,
  errorMessage: null,
  successMessage,
});

const errorMessage = (errorMessage: string) => ({
  loading: false,
  success: false,
  successMessage: null,
  errorMessage,
});

export const lessonsReducer = createReducer(
  initialState,
  on(LessonActions.loadLesson, (state) => ({ ...state, loading: true })),
  on(LessonActions.loadLessonSuccess, (state, { lesson }) =>
    lessonsAdapter.setOne(lesson, { ...state, ...successMessage(null) })
  ),
  on(LessonActions.loadLessonFailed, (state) => ({
    ...state,
    ...errorMessage('Error During lesson loading'),
  })),
  on(LessonActions.addQuestionToLesson, (state, { id, question }) => {
    const lesson = cloneDeep(state.entities[id] as Lesson);
    lesson.questions.push(question);
    return lessonsAdapter.setOne(lesson, { ...state });
  }),
  on(LessonActions.updateQuestionToLesson, (state, { id, question }) => {
    const lesson = cloneDeep(state.entities[id] as Lesson);
    lesson.questions = lesson.questions.map((q) =>
      q._id === question._id ? question : q
    );
    return lessonsAdapter.setOne(lesson, { ...state });
  }),
  on(LessonActions.assignQuestion, (state) => ({ ...state, loading: true })),
  on(LessonActions.assignQuestionSuccess, (state, { lesson }) =>
    lessonsAdapter.setOne(lesson, {
      ...state,
      ...successMessage('Lesson saved'),
    })
  ),
  on(LessonActions.assignQuestionFailed, (state) => ({
    ...state,
    ...errorMessage('Error During lesson saving'),
  })),
  on(LessonActions.clearErrorMessage, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(LessonActions.clearSuccessMessage, (state) => ({
    ...state,
    successMessage: null,
  }))
);
