import { TranslatablePageHeader } from './PageHeader.mjs';

export default {
  component: TranslatablePageHeader,
  title: 'PageHeader',
};

const fakeTranslationFunction = s => "***";
const TemplateWithoutTranslation = args => e(TranslatablePageHeader, {...args, t: fakeTranslationFunction});

const TemplateWithTranslation = args => {
  // small hack: here I use i18next instead of ReactI18next, because I haven't managed yet to make it work using ReactI18next in Storybook
  const t = i18next.t.bind(i18next);
  return e(TranslatablePageHeader, {...args, t: t});
}

export const DefaultResponsiveWithoutTranslation = TemplateWithoutTranslation.bind({});
DefaultResponsiveWithoutTranslation.args = {
  title: "My vote title",
  subTitle: "My vote description",
};

export const DefaultResponsiveWithTranslation = TemplateWithTranslation.bind({});
DefaultResponsiveWithTranslation.args = {
  title: "My vote title",
  subTitle: "My vote description",
};
