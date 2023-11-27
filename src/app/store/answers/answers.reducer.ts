import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as AnswerActions from './answers.actions';
import { Answer } from '../models/answer.model';
import * as FileSaver from 'file-saver';

export interface AnswerState extends EntityState<Answer> {
  loading: boolean;
  success?: boolean;
}

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

export const answersAdapter = createEntityAdapter<Answer>({
  selectId: (answer: Answer) => answer._id as string,
});

export const initialState: AnswerState = answersAdapter.getInitialState({
  loading: false,
  success: undefined,
});

export const answersReducer = createReducer(
  initialState,
  on(AnswerActions.saveAnswers, (state) => ({ ...state, loading: true })),
  on(AnswerActions.saveAnswersSuccess, (state, { answers }) =>
    answersAdapter.setMany(answers, {
      ...state,
      ...successMessage('Ответы успешно сохранены'),
    })
  ),
  on(AnswerActions.saveAnswersFailed, (state) => ({
    ...state,
    ...errorMessage('Что-то пошло не так, попробуйте позже.'),
  })),
  on(AnswerActions.loadAnswers, (state) => ({ ...state, loading: true })),
  on(AnswerActions.loadAnswersSuccess, (state, { answers }) =>
    answersAdapter.setMany(answers, { ...state, loading: false, success: true })
  ),
  on(AnswerActions.loadAnswersFailed, (state) => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(AnswerActions.loadCoursePdf, (state) => ({ ...state, loading: true })),
  on(AnswerActions.loadModulePdf, (state) => ({ ...state, loading: true })),
  on(AnswerActions.loadPdfSuccess, (state, { pdf }) => {
    FileSaver.saveAs(pdf, 'БПУФ.pdf');
    return { ...state, loading: false };
  }),
  on(AnswerActions.loadPdfFailed, (state) => ({ ...state, loading: false }))
);
