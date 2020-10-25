import PageHeader from './PageHeader.mjs';

export default {
  component: PageHeader,
  title: 'PageHeader',
};

const Template = args => e(PageHeader, {...args});

export const DefaultResponsive = Template.bind({});
DefaultResponsive.args = {
  title: "My vote title",
  subTitle: "My vote description",
};
