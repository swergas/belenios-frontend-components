import CandidateWithCheckbox from "./CandidateWithCheckbox.mjs";
import CandidateWithRadio from "./CandidateWithRadio.mjs";

/*
Displays a list of candidates represented using instances of component CandidateWithCheckbox or CandidateWithRadio, depending on value of "type" prop.
*/
class ClassicVoteCandidatesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, candidates, identifierPrefix, blankVoteAllowed } = this.props;
    const candidate_constructor = type == "checkbox" ? CandidateWithCheckbox : CandidateWithRadio;
    let finalCandidates = candidates;
    if (blankVoteAllowed === true){
      finalCandidates = [...candidates, "Blank vote"]; // TODO: i18n. Also, is this the right way to do it?
    }
    const renderedCandidates = finalCandidates.map((candidate, instanceNumber) => {
      const identifier = `${identifierPrefix}_choice_${instanceNumber}`;
      const commonProps = {
        candidateInfo: candidate,
        checked: false,
        id: identifier,
        key: instanceNumber
      };
      const additionalProps = type == "checkbox" ? {
        name: identifier
      } : { 
        name: identifierPrefix,
        value: `choice_${instanceNumber}` // or maybe a candidate id provided in data input, or slugification of candidate name?
      };
      return e(
        candidate_constructor,
        {
          ...commonProps,
          ...additionalProps
        }
      );
    });

    return e(
      'div',
      {
        className: "classic-vote-candidates-list noselect"
      },
      ...renderedCandidates
    );
  }
}

ClassicVoteCandidatesList.defaultProps = {
  type: "checkbox",
  identifierPrefix: "question_1",
  candidates: [
    "Answer 1",
    "Answer 2",
    "Answer 3"
  ],
  blankVoteAllowed: false
};

export { ClassicVoteCandidatesList };
export default ClassicVoteCandidatesList;
