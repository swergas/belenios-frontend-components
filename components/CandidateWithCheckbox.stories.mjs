import CandidateWithCheckbox from './CandidateWithCheckbox.mjs';

export default {
  component: CandidateWithCheckbox,
  title: 'CandidateWithCheckbox',
};

const Template = args => e(CandidateWithCheckbox, {...args});

export const Default = Template.bind({});
Default.args = {
  name: "radio-button-choice",
  id: "checkbox_1",
  checked: false,
  candidateInfo: "choice 1"
};

export const Checked = Template.bind({});
Checked.args = {
  name: "radio-button-choice",
  id: "checkbox_1",
  checked: true,
  candidateInfo: "choice 1"
};