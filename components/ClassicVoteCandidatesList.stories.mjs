import { TranslatableClassicVoteCandidatesList } from './ClassicVoteCandidatesList.mjs';

export default {
  component: TranslatableClassicVoteCandidatesList,
  title: 'ClassicVoteCandidatesList',
};

const fakeTranslationFunction = s => s;
const TemplateWithoutTranslation = args => e(TranslatableClassicVoteCandidatesList, {...args, t: fakeTranslationFunction});

const TemplateWithTranslation = args => {
  // small hack: here I use i18next instead of ReactI18next, because I haven't managed yet to make it work using ReactI18next in Storybook
  const t = i18next.t.bind(i18next);
  return e(TranslatableClassicVoteCandidatesList, {...args, t: t});
}

export const AnswersOfTypeCheckbox = TemplateWithoutTranslation.bind({});
AnswersOfTypeCheckbox.args = {
  type: "checkbox",
  identifierPrefix: "question_1",
  candidates: [
    "Answer 1.1",
    "Answer 1.2",
    "Answer 1.3"
  ]
};

export const AnswersOfTypeRadio = TemplateWithoutTranslation.bind({});
AnswersOfTypeRadio.args = {
  type: "radio",
  identifierPrefix: "question_2",
  candidates: [
    "Answer 2.1",
    "Answer 2.2",
    "Answer 2.3"
  ]
};

export const AnswersOfTypeRadioWithBlankVoteAllowed = TemplateWithTranslation.bind({});
AnswersOfTypeRadioWithBlankVoteAllowed.args = {
  type: "radio",
  identifierPrefix: "question_2",
  candidates: [
    "Answer 2.1",
    "Answer 2.2",
    "Answer 2.3"
  ],
  blankVoteAllowed: true
};

export const AnswersOfTypeCheckboxWithBlankVoteAllowed = TemplateWithTranslation.bind({});
AnswersOfTypeCheckboxWithBlankVoteAllowed.args = {
  type: "checkbox",
  identifierPrefix: "question_1",
  candidates: [
    "Answer 1.1",
    "Answer 1.2",
    "Answer 1.3"
  ],
  blankVoteAllowed: true
};
