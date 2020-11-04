import QuestionWithVotableAnswers from "./QuestionWithVotableAnswers.mjs";
import VoteNavigation from "./VoteNavigation.mjs";

/* We chose to not use a `<form>`, because it could increase possibilities to leak voter's choices. Instead, we use `<input type="checkbox">` or `<input type="radio">` fields outside of a `<form>`, and classic `<button>` for navigation between questions ("Previous" and "Next" labels). */
class TranslatableAllQuestionsWithPagination extends React.Component {
  static get defaultProps() {
    return {
      current_question_index: 0,
      electionData: null,
      extractVoterSelectedAnswersFromFields: null,
      onVoteSubmit: null,
      t: null
    };
  }

  constructor(props){
    super(props);
    this.state = {
      current_question_index: props.current_question_index
    };
    this.onClickPrevious = this.onClickPrevious.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickPrevious(){
    console.log("onClickPrevious");
    if (this.state.current_question_index-1 >= 0){
      this.setState({current_question_index: this.state.current_question_index-1});
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  }

  onClickNext(event){
    console.log("onClickNext");
    const t = this.props.t;
    // Before moving on to next question, verify that user input respects question constraints:
    // - if blank vote is allowed on this question and user voted blank, then verify that no other answer is checked
    // - if this question accepts between X and Y answers and user has not voted blank, verify that user has not checked less than X answers, nor more than Y answers
    const current_question_index = this.state.current_question_index;
    const current_question_data = this.props.electionData.questions[current_question_index];
    const voter_selected_answers = this.props.extractVoterSelectedAnswersFromFields(this.props.electionData);
    const number_of_answers_checked = voter_selected_answers[current_question_index].reduce(
      function(accumulator, value, index){
        const answer_value = value === 1 ? 1 : 0;
        return accumulator + answer_value;
      },
      0
    );
    if(current_question_data.blank === true && voter_selected_answers[current_question_index][0] === 1){
      if(number_of_answers_checked > 1){
        alert(t("questionConstraintNoBlankAndOther"));
        return;
      }
    }
    else {
      if(number_of_answers_checked < current_question_data.min){
        alert(t("questionConstraintNoLessThanMin", {count: current_question_data.min}));
        return;
      }
      if(number_of_answers_checked > current_question_data.max){
        alert(t("questionConstraintNoMoreThanMax", {count: current_question_data.max}));
        return;
      }
    }

    if (current_question_index+1 < this.props.electionData.questions.length){
      this.setState({current_question_index: current_question_index+1});
      window.scrollTo(0, 0); // Scroll to top of the page
    }
    else {
      // TODO: go to verification page
      if (this.props.onVoteSubmit){
        return this.props.onVoteSubmit(event, this.props.electionData);
      }
    }
  }

  render(){
    const renderedQuestions = this.props.electionData.questions.map(function(question, question_index){
      return e(
        QuestionWithVotableAnswers,
        {
          answers: question.answers,
          minimum_answers: question.min,
          maximum_answers: question.max,
          question: question.question,
          blankVoteAllowed: question.blank,
          identifierPrefix: `question_${question_index}_`,
          visible: this.state.current_question_index === question_index ? true : false
        }
      )
    }, this);

    const renderedPagination = e(
      VoteNavigation,
      {
        question_index: this.state.current_question_index,
        questions_length: this.props.electionData.questions.length,
        onClickPreviousButton: this.onClickPrevious,
        onClickNextButton: this.onClickNext
      }
    );
    return e(
      React.Fragment,
      null,
      ...renderedQuestions,
      renderedPagination
    );
  }
}

const AllQuestionsWithPagination = ReactI18next.withTranslation()(TranslatableAllQuestionsWithPagination);

export { AllQuestionsWithPagination, TranslatableAllQuestionsWithPagination };
export default AllQuestionsWithPagination;
