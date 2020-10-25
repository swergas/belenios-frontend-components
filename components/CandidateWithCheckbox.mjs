function CandidateWithCheckbox({ name, id, checked, candidateInfo }){
  const checkedValue = checked ? true : false;
  return e(
    'div',
    {
      className: "candidate-with-checkbox clickable"
    },
    e(
      'input',
      {
        type: 'checkbox',
        name: name,
        id: id,
        defaultChecked: checkedValue
      }
    ),
    e(
      'label',
      {
        htmlFor: id
      },
      e(
        'span',
        {
          'className': 'checkbox-appearance'
        }
      ),
      e(
        'span',
        {
          'className': 'candidate-info'
        },
        candidateInfo
      )
    )
  );
}

CandidateWithCheckbox.defaultProps = {
  name: "radio-button-choice",
  id: "checkbox_1",
  checked: false,
  candidateInfo: "choice 1"
};

export { CandidateWithCheckbox };
export default CandidateWithCheckbox;
