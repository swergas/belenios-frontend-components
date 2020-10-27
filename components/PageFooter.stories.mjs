import { TranslatablePageFooter } from './PageFooter.mjs';

export default {
  component: TranslatablePageFooter,
  title: 'PageFooter',
};

const fakeTranslationFunction = s => "***";
const TemplateWithoutTranslation = args => e(TranslatablePageFooter, {...args, t: fakeTranslationFunction});

const TemplateWithTranslation = args => {
  // small hack: here I use i18next instead of ReactI18next, because I haven't managed yet to make it work using ReactI18next in Storybook
  const t = i18next.t.bind(i18next);
  return e(TranslatablePageFooter, {...args, t: t});
}

export const DefaultResponsiveWithoutTranslation = TemplateWithoutTranslation.bind({});
const defaultArgs = {
  electionUuid: "E7bP7XBxsumU3B",
  electionFootprint: "cbhXGRgIAtXd0dbzfkGuO2juG5oxm4KgAmyFCW6BDpE"
};

DefaultResponsiveWithoutTranslation.args = {
  ...defaultArgs
};

export const DefaultResponsiveWithTranslation = TemplateWithTranslation.bind({});
DefaultResponsiveWithTranslation.args = {
  ...defaultArgs
};
