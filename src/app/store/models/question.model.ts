export interface Question {
  _id?: string;
  type: string;
  config: QuestionConfig;
}

export interface QuestionConfig {
  question: string;
  options: QuestionOptions[] | string[];
}

export interface QuestionOptions {
  value: string;
  label: string;
}
