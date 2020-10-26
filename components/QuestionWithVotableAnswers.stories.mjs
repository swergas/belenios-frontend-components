import { TranslatableQuestionWithVotableAnswers } from './QuestionWithVotableAnswers.mjs';

export default {
  component: TranslatableQuestionWithVotableAnswers,
  title: 'QuestionWithVotableAnswers',
};

const fakeTranslationFunction = s => s;
const TemplateWithoutTranslation = args => e(TranslatableQuestionWithVotableAnswers, {...args, t: fakeTranslationFunction});

const TemplateWithTranslation = args => {
  // small hack: here I use i18next instead of ReactI18next, because I haven't managed yet to make it work using ReactI18next in Storybook
  const t = i18next.t.bind(i18next);
  return e(TranslatableQuestionWithVotableAnswers, {...args, t: t});
}

export const DefaultWithoutTranslation = TemplateWithoutTranslation.bind({});
const defaultArgs = {
  "answers": [
    "Answer 1.1",
    "Answer 1.2",
    "Answer 1.3"
  ],
  "minimum_answers": 1,
  "maximum_answers": 2,
  "question": "Question 1?",
  "identifierPrefix": "question_1_",
  "visible": true
};

const radioArgs = {
  "answers": [
    "Answer 2.1",
    "Answer 2.2",
    "Answer 2.3"
  ],
  "minimum_answers": 1,
  "maximum_answers": 1,
  "question": "Question 2?",
  "identifierPrefix": "question_2_",
  "visible": true
};

const BlankVoteAllowedArgs = {
  "blankVoteAllowed": true
};

DefaultWithoutTranslation.args = {
  ...defaultArgs
};

export const DefaultWithTranslation = TemplateWithTranslation.bind({});
DefaultWithTranslation.args = {
  ...defaultArgs
};

export const RadioWithTranslation = TemplateWithTranslation.bind({});
RadioWithTranslation.args = {
  ...radioArgs
};

export const DefaultWithBlankVoteAllowed = TemplateWithTranslation.bind({});
DefaultWithBlankVoteAllowed.args = {
  ...defaultArgs,
  ...BlankVoteAllowedArgs
};

export const RadioWithBlankVoteAllowed = TemplateWithTranslation.bind({});
RadioWithBlankVoteAllowed.args = {
  ...radioArgs,
  ...BlankVoteAllowedArgs
};
