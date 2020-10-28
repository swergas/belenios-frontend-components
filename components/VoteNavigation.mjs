import { NiceButton, BlueNiceButton } from "./NiceButton.mjs";

function GenericNavigation({ labelInfo, labelPreviousButton, labelNextButton, disabledPreviousButton, disabledNextButton, onClickPreviousButton, onClickNextButton }){
  return e(
    'div',
    {
      className: "vote-navigation-container"
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
        labelInfo
      ),
      e(
        'div',
        {
          className: "vote-navigation__previous-button-container"
        },
        e(
          NiceButton,
          {
            className: "vote-navigation__previous-button",
            label: labelPreviousButton,
            onClick: onClickPreviousButton,
            disabled: disabledPreviousButton
          }
        )
      ),
      e(
        'div',
        {
          className: "vote-navigation__next-button-container"
        },
        e(
          BlueNiceButton,
          {
            className: "vote-navigation__next-button",
            label: labelNextButton,
            onClick: onClickNextButton,
            disabled: disabledNextButton
          }
        )
      )
    )
  );
}

function TranslatableVoteNavigation({ question_index, questions_length, onClickPreviousButton, onClickNextButton, t }){
  return GenericNavigation(
    {
      labelInfo: t("questionXofY", {current_question: question_index+1, number_of_questions: questions_length}),
      labelPreviousButton: t("Previous"),
      labelNextButton: t("Next"),
      onClickPreviousButton: question_index == 0 ? null : onClickPreviousButton,
      onClickNextButton: onClickNextButton,
      disabledPreviousButton: question_index == 0 ? true : false,
      disabledNextButton: false,
    }
  );
}

const VoteNavigation = ReactI18next.withTranslation()(TranslatableVoteNavigation);

export { VoteNavigation, TranslatableVoteNavigation, GenericNavigation };
export default VoteNavigation;
