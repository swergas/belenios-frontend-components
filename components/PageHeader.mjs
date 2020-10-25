const e = React.createElement;

function PageHeader(props) {
  return e(
    "div",
    {
      className: "page-header"
    },
    e(
      "div",
      {
        className: "page-header__logo"
      },
      e(
        "img",
        {
          src: "./static/logo.png",
          alt: "Serveur d'élections"
        }
      )
    ),
    e(
      "div",
      {
        className: "page-header__titles"
      },
      e(
        "h1",
        {
          id: "election_name",
        },
        props.title
      ),
      e(
        "p",
        {
          id: "election_description"
        },
        props.subTitle
      )
    ),
    e(
      "div",
      {
        className: "page-header__right"
      }
    )
  );
}

PageHeader.defaultProps = {
  title: "Title of election",
  subTitle: "Subtitle of election"
};

export { PageHeader };
export default PageHeader;
