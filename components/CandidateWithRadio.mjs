class CandidateWithRadio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, value, checked, candidateInfo } = this.props;
    const checkedValue = checked ? "checked" : null;
    return e(
      'div',
      {
        className: "candidate-with-checkbox clickable"
      },
      e(
        'input',
        {
          type: 'radio',
          name: name,
          id: id,
          value: value,
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
            'className': 'radio-button-appearance'
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
}

CandidateWithRadio.defaultProps = {
  name: "radio-button-choice",
  id: "radio-button_1",
  value: "choice_1",
  checked: false,
  candidateInfo: "choice 1"
};

export { CandidateWithRadio };
export default CandidateWithRadio;
