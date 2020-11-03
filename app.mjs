import i18n_init from "./i18n_init.mjs";
import PageHeader from "./components/PageHeader.mjs";
import { VoteBreadcrumb } from "./components/Breadcrumb.mjs";
import InputCredentialSection from "./components/InputCredentialSection.mjs";
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

// TODO: replace this mock function by usage of Belenios Javascript API (`src/lib/election.ml::of_string()`) when it is ready
const beleniosComputeElectionFingerprint = (election_data) => {
  return "election_fingerprint_aaa";
};

// TODO: replace this mock function by usage of Belenios Javascript API (`src/lib/credential.ml::check()`) when it is ready
const beleniosCredentialCheck = (credential) => {
  return true;
};

// TODO: replace this mock function by usage of Belenios Javascript API (`src/tool/tool_js_booth.ml::encryptBallot()`) when it is ready
const beleniosEncryptBallot = (election_data, credential, voter_ballot_as_plaintext) => {
  console.log("beleniosEncryptBallot() election_data:", election_data, "credential:", credential, "voter_ballot_as_plaintext:", voter_ballot_as_plaintext);
  return "encrypted_ballot_aaa";
};

const onVoteSubmit = (event, electionData, credential) => {
  const vote_of_voter_per_question = extractVoterSelectedAnswersFromFields(electionData);
  // TODO: implement usage of Belenios Javascript API when it is ready
  alert("vote_of_voter_per_question: " + JSON.stringify(vote_of_voter_per_question));
  const encrypted_ballot = beleniosEncryptBallot(electionData, credential, vote_of_voter_per_question);
  alert("encrypted_ballot:" + encrypted_ballot);
  event.preventDefault();
};

function TranslatableVoteApp({uuid, lang, onVoteSubmit, t}){
  const [currentStep, setCurrentStep] = React.useState(1);
  const [electionData, setElectionData] = React.useState({});
  const [electionFootprint, setElectionFootprint] = React.useState("");
  const [credential, setCredential] = React.useState(null);
  const [electionLoadingStatus, setElectionLoadingStatus] = React.useState(0); // 0: not yet loaded. 1: loaded with success. 2: loaded with error.

  React.useEffect(() => {
    fetch(`/elections/${uuid}/election.json`)
      .then(response => {
        if(!response.ok){
          return fetch(`/draft/preview/${uuid}/election.json`);
        }
        return response;
      })
      .then(response => {
        if(!response.ok){
          setElectionLoadingStatus(2);
        }
        else {
          response.json().then(electionData => {
            setElectionData(electionData);
            setElectionFootprint(beleniosComputeElectionFingerprint(electionData));
            setElectionLoadingStatus(1);
          });
        }
      });
  }, []);

  if(electionLoadingStatus === 0 || electionLoadingStatus === 2){
    const titleMessage = electionLoadingStatus === 0 ? "Loading..." : "Error"
    const loadingMessage = electionLoadingStatus === 0 ? titleMessage : "Error: Could not load this election. Maybe no election exists with this identifier.";
    const footerMessage = electionLoadingStatus === 0 ? loadingMessage : "N/A";
    return e(
      "div",
      {
        className: "page"
      },
      e(
        PageHeader,
        {
          title: titleMessage,
          subTitle: null
        }
      ),
      e(
        "div",
        {
          className: "page-body"
        },
        e(
          VoteBreadcrumb,
          {
            currentStep: currentStep
          }
        ),
        e(
          "div",
          {
            style: {
              textAlign: "center",
              padding: "30px 0"
            }
          },
          loadingMessage
        )
      ),
      e(
        PageFooter,
        {
          electionUuid: footerMessage,
          electionFootprint: footerMessage
        }
      )
    )
  }
  else {
    if (currentStep === 1){
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
            VoteBreadcrumb,
            {
              currentStep: currentStep
            }
          ),
          e(
            InputCredentialSection,
            {
              onSubmit: function(credential){
                // TODO: implement usage of Belenios Javascript API when it is ready
                if(beleniosCredentialCheck(credential) === true){
                  alert("credential: " + credential);
                  setCredential(credential);
                  setCurrentStep(2);
                }
                else {
                  alert(t("Invalid credential!"));
                }
                return false;
              }
            }
          )
        ),
        e(
          PageFooter,
          {
            electionUuid: electionData.uuid,
            electionFootprint: electionFootprint
          }
        )
      )
    }
    else if (currentStep === 2) {
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
            VoteBreadcrumb,
            {
              currentStep: currentStep
            }
          ),
          e(
            AllQuestionsWithPagination,
            {
              electionData: electionData,
              onVoteSubmit: function(event, electionData){
                return onVoteSubmit(event, electionData, credential);
              }
            }
          ),
        ),
        e(
          PageFooter,
          {
            electionUuid: electionData.uuid,
            electionFootprint: electionFootprint
          }
        )
      );
    }
  }
}

const VoteApp = ReactI18next.withTranslation()(TranslatableVoteApp);

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
  const question_x_choice_y_pattern = (question_index, answer_index) => `question_${question_index}__choice_${answer_index}`;
  let vote_of_voter_per_question = []; // array where each element correspond to voter's vote on question i. if type of question i is checkbox, answer to this question is an array of indexes of answers. if type of question i is radio, answer to this question is an array containing only one index of answer.
  vote_of_voter_per_question = electionData.questions.map(function(question, question_index){
    const question_type = question.min === 1 && question.max === 1 ? "radio" : "checkbox";
    const els = question.answers.map(
      function(v, index){
        return document.querySelector("#" + question_x_choice_y_pattern(question_index, index));
      }
    );
    // attribute `checked`` works for questions of type `<input type="checkbox">` as well as `<input type="radio">`
    let answers_to_question = els.map(el => el.checked).reduce(
      function(accumulator, value, index){
        const answer_value = value === true ? 1 : 0;
        accumulator.push(answer_value);
        return accumulator;
      },
      []
    );
    if ("blank" in question && question["blank"] === true){
      const blank_el = document.querySelector("#" + question_x_choice_y_pattern(question_index, question.answers.length));
      const blank_value = blank_el.checked ? 1 : 0;
      answers_to_question = [blank_value, ...answers_to_question];
    }
    const number_of_answers_checked = answers_to_question.reduce(
      function(accumulator, value, index){
        const answer_value = value === 1 ? 1 : 0;
        return accumulator + answer_value;
      },
      0
    );
    if (question_type == "radio" && number_of_answers_checked > 1){
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
