import { TranslatableQuestionWithVotableAnswers } from './QuestionWithVotableAnswers.mjs';

export default {
  component: TranslatableQuestionWithVotableAnswers,
  title: 'TranslatableQuestionWithVotableAnswers',
};

const fakeTranslationFunction = s => s;
const TemplateWithoutTranslation = args => e(TranslatableQuestionWithVotableAnswers, {...args, t: fakeTranslationFunction});

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

DefaultWithoutTranslation.args = {
  ...defaultArgs
};

const TemplateWithTranslation = args => {
  // small hack: here I use i18next instead of ReactI18next, because I haven't managed yet to make it work using ReactI18next in Storybook
  const t = i18next.t.bind(i18next);
  return e(TranslatableQuestionWithVotableAnswers, {...args, t: t});
}

export const DefaultWithTranslation = TemplateWithTranslation.bind({});
DefaultWithTranslation.args = {
  ...defaultArgs
};