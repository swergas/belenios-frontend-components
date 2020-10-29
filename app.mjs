import i18n_init from "./i18n_init.mjs";
import PageHeader from "./components/PageHeader.mjs";
import { VoteBreadcrumb } from "./components/Breadcrumb.mjs";
import QuestionWithVotableAnswers from "./components/QuestionWithVotableAnswers.mjs";
import VoteNavigation from "./components/VoteNavigation.mjs";
import PageFooter from "./components/PageFooter.mjs";

function getHashParametersFromURL(){
  const url_hash_parameters = window.location.hash.substr(1);
  return url_hash_parameters.split('&').reduce(function (result, item) {
    const parts = item.split('=');
    result[parts[0]] = parts[1];
    return result;
  }, {});
}

const onVoteSubmit = (event, electionData) => {
  const vote_of_voter_per_question = extractVoterSelectedAnswersFromFields(electionData);
  alert("vote_of_voter_per_question: " + JSON.stringify(vote_of_voter_per_question));
  event.preventDefault();
};

function VoteApp({uuid, lang, onVoteSubmit}){
  const [electionData, setElectionData] = React.useState({});
  const [electionLoaded, setElectionLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch(`/elections/${uuid}/election.json`)
      .then(response => response.json())
      .then(
        electionData => {
          setElectionData(electionData);
          setElectionLoaded(true);
        }
      );
  }, []);

  if(!electionLoaded){
    return e(
      "div",
      {
        className: "page"
      },
      e(
        PageHeader,
        {
          title: "Loading...",
          subTitle: null
        }
      ),
      e(
        "div",
        {
          className: "page-body"
        },
        e(
          VoteBreadcrumb
        ),
        e(
          "div",
          {
            style: {
              textAlign: "center",
              padding: "30px 0"
            }
          },
          "Loading..."
        )
      ),
      e(
        PageFooter,
        {
          electionUuid: "Loading...",
          electionFootprint: "Loading..."
        }
      )
    )
  }
  else {
    return e(
      "div",
      {
        className: "page"
      },
      e(
        PageHeader,
        {
          title: electionData.name,
          subTitle: electionData.description
        }
      ),
      e(
        "div",
        {
          className: "page-body"
        },
        e(
          VoteBreadcrumb
        ),
        e(
          AllQuestionsWithPagination,
          {
            electionData: electionData,
            onVoteSubmit: onVoteSubmit
          }
        ),
      ),
      e(
        PageFooter,
        {
          electionUuid: electionData.uuid,
          electionFootprint: "TODO" // TODO
        }
      )
    );
  }
}

const afterI18nInitialized = (uuid, lang) => {
  return function(){
    const container = document.querySelector("#vote-app");
    ReactDOM.render(
      e(
        VoteApp,
        {
          uuid: uuid,
          lang: lang,
          onVoteSubmit: onVoteSubmit
        }
      ),
      container
    );
  }
};

function main() {
  const hash_parameters = getHashParametersFromURL();
  const lang = hash_parameters['lang'];
  const uuid = hash_parameters['uuid'];
  const container = document.querySelector("#vote-app");
  container.innerHTML = "Loading...";
  i18n_init(lang, afterI18nInitialized(uuid, lang));
}

function extractVoterSelectedAnswersFromFields(electionData){
  let vote_of_voter_per_question = []; // array where each element correspond to voter's vote on question i. if type of question i is checkbox, answer to this question is an array of indexes of answers. if type of question i is radio, answer to this question is an array containing only one index of answer.
  vote_of_voter_per_question = electionData.questions.map(function(question, question_index){
    const question_type = question.min === 1 && question.max === 1 ? "radio" : "checkbox";
    const els = question.answers.map(
      function(v, index){
        return document.querySelector(`#question_${question_index}__choice_${index}`);
      }
    );
    // attribute `checked`` works for questions of type `<input type="checkbox">` as well as `<input type="radio">`
    const answers_to_question = els.map(el => el.checked).reduce(
      function(accumulator, value, index){
        if (value === true){
          accumulator.push(index);
        }
        return accumulator;
      },
      []
    );
    if (question_type == "radio" && answers_to_question.length > 1){
      console.error("Several answers are checked but question type should be radio.");
    }
    return answers_to_question;
  });
  return vote_of_voter_per_question;
}


/* We chose to not use a `<form>`, because it could increase possibilities to leak voter's choices. Instead, we use `<input type="checkbox">` or `<input type="radio">` fields outside of a `<form>`, and classic `<button>` for navigation between questions ("Previous" and "Next" labels). */
class AllQuestionsWithPagination extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_question_index: props.current_question_index
    };
    this.onClickPrevious = this.onClickPrevious.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  static get defaultProps() {
    return {
      current_question_index: 0,
      electionData: null,
      onVoteSubmit: null
    };
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
    if (this.state.current_question_index+1 < this.props.electionData.questions.length){
      this.setState({current_question_index: this.state.current_question_index+1});
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

main();
