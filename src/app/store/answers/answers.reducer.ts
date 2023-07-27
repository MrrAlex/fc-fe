import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as AnswerActions from './answers.actions';
import { Answer } from '../models/answer.model';

export interface AnswerState extends EntityState<Answer> {
  loading: boolean;
  success?: boolean;
}

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
    answersAdapter.setMany(answers, { ...state, loading: false, success: true })
  ),
  on(AnswerActions.saveAnswersFailed, (state) => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(AnswerActions.loadAnswers, (state) => ({ ...state, loading: true })),
  on(AnswerActions.loadAnswersSuccess, (state, { answers }) =>
    answersAdapter.setMany(answers, { ...state, loading: false, success: true })
  ),
  on(AnswerActions.loadAnswersFailed, (state) => ({
    ...state,
    loading: false,
    success: false,
  }))
);
