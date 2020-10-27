import i18n_init from "./i18n_init.mjs";
import PageHeader from "./components/PageHeader.mjs";
import Breadcrumb from "./components/Breadcrumb.mjs";
import QuestionWithVotableAnswers from "./components/QuestionWithVotableAnswers.mjs";
import PageFooter from "./components/PageFooter.mjs";

function getHashParametersFromURL(){
  const url_hash_parameters = window.location.hash.substr(1);
  return url_hash_parameters.split('&').reduce(function (result, item) {
    const parts = item.split('=');
    result[parts[0]] = parts[1];
    return result;
  }, {});
}

function initializeUILanguageFromURLParameter(onI18nInitialized){
  const hash_parameters = getHashParametersFromURL();
  let lang = hash_parameters['lang'];
  i18n_init(lang, onI18nInitialized);
}

function onI18nInitialized(){
  renderBreadcrumb();
  renderPageFooter();

  fetch('./election.json')
    .then(response => response.json())
    .then(obj => renderElection(obj));
}

function main() {
  initializeUILanguageFromURLParameter(onI18nInitialized);
}

function extractVoterSelectedAnswersFromFields(election_data){
  let vote_of_voter_per_question = []; // array where each element correspond to voter's vote on question i. if type of question i is checkbox, answer to this question is an array of indexes of answers. if type of question i is radio, answer to this question is an array containing only one index of answer.
  vote_of_voter_per_question = election_data.questions.map(function(question, question_index){
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

function addFormSubmitBehaviour(election_data){
  /* v1: Use a form. We chose instead to not use a form, because it could increase possibilities to leak voter's choices.
  const formEl = document.querySelector("form.vote-form");
  const onSubmit = (event) => {
    alert("coucou");
    event.preventDefault();
  };
  formEl.addEventListener("submit", onSubmit);
  */

  // v2: Use Next button click event handler
  const btnEl = document.querySelector(".vote-navigation__next");
  const onSubmit = (event) => {
    const vote_of_voter_per_question = extractVoterSelectedAnswersFromFields(election_data);
    console.log("vote_of_voter_per_question:", vote_of_voter_per_question);
    event.preventDefault();
  };
  btnEl.addEventListener('click', onSubmit);
}

function renderElection(election_data){
  const container = document.querySelector("#classic-vote-candidates-list-container");
  ReactDOM.render(
    e(
      AllQuestionsWithPagination,
      {
        election_data: election_data
      }
    ),
    container
  );
  addFormSubmitBehaviour(election_data);

  const pageHeaderContainer = document.querySelector("#page-header-container");
  ReactDOM.render(
    e(
      PageHeader,
      {
        title: election_data.name,
        subTitle: election_data.description
      }
    ),
    pageHeaderContainer
  );
}

function VoteNavigation({ question_index, questions_length, onClickPrevious, onClickNext }){
  const labelPrevious = {
    __html: "&lt;&nbsp;&nbsp;Précédent" // TODO: i18n
  };

  const labelNext = {
    __html: "Suivant&nbsp;&nbsp;&gt;" // TODO: i18n
  };

  return e(
    'div',
    {
      className: "vote-footer"
    },
    e(
      'div',
      {
        className: "vote-navigation"
      },
      e(
        'div',
        {
          className: "vote-navigation__info"
        },
        `Question ${question_index+1} sur ${questions_length}` // TODO: i18n
      ),
      e(
        'div',
        {
          className: "vote-navigation__previous"
        },
        e(
          'button',
          {
            className: "nice-button nice-button--default",
            onClick: question_index == 0 ? null : onClickPrevious,
            dangerouslySetInnerHTML: labelPrevious,
            disabled: question_index == 0 ? true : false
          },
        )
      ),
      e(
        'div',
        {
          className: "vote-navigation__next"
        },
        e(
          'button',
          {
            className: "nice-button nice-button--blue",
            onClick: onClickNext,
            dangerouslySetInnerHTML: labelNext
          }
        )
      )
    )
  );
}

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
      election_data: null
    };
  }

  onClickPrevious(){
    console.log("onClickPrevious");
    if (this.state.current_question_index-1 >= 0){
      this.setState({current_question_index: this.state.current_question_index-1});
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  }

  onClickNext(){
    console.log("onClickNext");
    if (this.state.current_question_index+1 < this.props.election_data.questions.length){
      this.setState({current_question_index: this.state.current_question_index+1});
      window.scrollTo(0, 0); // Scroll to top of the page
    }
    else {
      // TODO: go to verification page
    }
  }

  render(){
    const renderedQuestions = this.props.election_data.questions.map(function(question, question_index){
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

    const renderedPagination = VoteNavigation({
      question_index: this.state.current_question_index,
      questions_length: this.props.election_data.questions.length,
      onClickPrevious: this.onClickPrevious,
      onClickNext: this.onClickNext,
    });
    return e(
      React.Fragment,
      null,
      ...renderedQuestions,
      renderedPagination
    );
  }
}

function renderBreadcrumb(){
  const breadcrumbContainer = document.querySelector("#breadcrumb-container");
  ReactDOM.render(
    e(
      Breadcrumb,
      {
        steps: [
          {
            title: "Saisie du code de vote",
            shortTitle: "Étape 1"
          },
          {
            title: "Choix de vote",
            shortTitle: "Étape 2",
            isCurrentStep: true
          },
          {
            title: "Récapitulatif",
            shortTitle: "Étape 3"
          },
          {
            title: "Authentification",
            shortTitle: "Étape 4"
          },
          {
            title: "Confirmation",
            shortTitle: "Étape 5"
          }
        ]
      }
    ),
    breadcrumbContainer
  );
}

function renderPageFooter(){
  const pageFooterContainer = document.querySelector("#page-footer-container");
  ReactDOM.render(
    e(
      PageFooter,
      {
        electionUuid: "E7bP7XBxsumU3B",
        electionFootprint: "cbhXGRgIAtXd0dbzfkGuO2juG5oxm4KgAmyFCW6BDpE"
      }
    ),
    pageFooterContainer
  );
}

main();
