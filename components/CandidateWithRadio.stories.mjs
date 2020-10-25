import CandidateWithRadio from './CandidateWithRadio.mjs';

export default {
  component: CandidateWithRadio,
  title: 'CandidateWithRadio',
};

const Template = args => e(CandidateWithRadio, {...args});

export const Default = Template.bind({});
Default.args = {
  name: "radio-button-choice",
  id: "radio-button_1",
  value: "choice_1",
  checked: false,
  candidateInfo: "choice 1"
};

export const Checked = Template.bind({});
Checked.args = {
  name: "radio-button-choice",
  id: "radio-button_1",
  value: "choice_1",
  checked: true,
  candidateInfo: "choice 1"
};