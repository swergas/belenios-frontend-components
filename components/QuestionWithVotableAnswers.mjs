import ClassicVoteCandidatesList from "./ClassicVoteCandidatesList.mjs";

function TranslatableQuestionWithVotableAnswers({ minimum_answers, maximum_answers, question, answers, identifierPrefix, visible, t }){
  let description;
  let question_type = "checkbox";
  if ( minimum_answers === 1 && maximum_answers === 1){
    question_type = "radio";
  }
  if ( minimum_answers === maximum_answers ){
    description = t("selectXAnswers", {count: minimum_answers});
  }
  else {
    description = t("selectBetweenXAndYAnswers", {min: minimum_answers, count: maximum_answers});
  }
  const rendered_answers = e(
    ClassicVoteCandidatesList,
    {
      type: question_type,
      identifierPrefix: identifierPrefix,
      candidates: answers
    }
  );
  const containerClassNames = visible ? "question-with-votable-answers" : "question-with-votable-answers question-with-votable-answers--hidden";
  return e(
    'div',
    {
      className: containerClassNames
    },
    e(
      "h3",
      {
        className: "vote-title"
      },
      question || "Question title"
    ),
    e(
      "p",
      {
        className: "vote-description"
      },
      description
    ),
    rendered_answers
  );
}

TranslatableQuestionWithVotableAnswers.defaultProps = {
  "answers": [
    "Answer 1",
    "Answer 2",
    "Answer 3"
  ],
  "minimum_answers": 1,
  "maximum_answers": 2,
  "question": "Question 1?",
  "identifierPrefix": "question_1_",
  "visible": true
};

const QuestionWithVotableAnswers = ReactI18next.withTranslation()(TranslatableQuestionWithVotableAnswers);

export { QuestionWithVotableAnswers, TranslatableQuestionWithVotableAnswers };
export default QuestionWithVotableAnswers;
