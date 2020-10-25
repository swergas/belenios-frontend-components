import ClassicVoteCandidatesList from './ClassicVoteCandidatesList.mjs';

export default {
  component: ClassicVoteCandidatesList,
  title: 'ClassicVoteCandidatesList',
};

const Template = args => e(ClassicVoteCandidatesList, {...args});

export const AnswersOfTypeCheckbox = Template.bind({});
AnswersOfTypeCheckbox.args = {
  type: "checkbox",
  identifierPrefix: "question_1",
  candidates: [
    "Answer 1.1",
    "Answer 1.2",
    "Answer 1.3"
  ]
};

export const AnswersOfTypeRadio = Template.bind({});
AnswersOfTypeRadio.args = {
  type: "radio",
  identifierPrefix: "question_2",
  candidates: [
    "Answer 2.1",
    "Answer 2.2",
    "Answer 2.3"
  ]
};

export const AnswersOfTypeRadioWithBlankVoteAllowed = Template.bind({});
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

export const AnswersOfTypeCheckboxWithBlankVoteAllowed = Template.bind({});
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
