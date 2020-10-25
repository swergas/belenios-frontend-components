const e = React.createElement;

function Breadcrumb(props) {
  const renderedSteps = props.steps.map((step, index) => {
    let className = "breadcrumb__step";
    if (step.isCurrentStep){
      className += " breadcrumb__step--current";
    }
    return e(
      React.Fragment,
      null,
      e(
        'div',
        {
          className: className
        },
        e(
          'span',
          {
            className: "breadcrumb__step__title"
          },
          step.title || ""
        ),
        e(
          'span',
          {
            className: "breadcrumb__step__short-title",
            title: step.title || ""
          },
          step.shortTitle || ""
        )
      ),
      e(
        'div',
        {
          className: "breadcrumb__step-separator"
        }
      )
    );
  });
  return e(
    "div",
    {
      className: "breadcrumb"
    },
    ...renderedSteps
  );
}

Breadcrumb.defaultProps = {
  steps: [
    {
      title: "Title of step 1",
      shortTitle: "Step 1",
      isCurrentStep: true
    },
    {
      title: "Title of step 2",
      shortTitle: "Step 2"
    }
  ]
};

export { Breadcrumb };
export default Breadcrumb;
