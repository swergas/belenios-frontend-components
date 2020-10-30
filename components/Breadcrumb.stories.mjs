import {Breadcrumb, TranslatableVoteBreadcrumb} from './Breadcrumb.mjs';

export default {
  component: Breadcrumb,
  title: 'Breadcrumb',
};

const fakeTranslationFunction = s => s;

const Template = args => e(Breadcrumb, {...args});
const TemplateForTranslatableVoteBreadcrumb = args => e(TranslatableVoteBreadcrumb, {...args, t: fakeTranslationFunction});

export const Default = Template.bind({});
Default.args = {
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

export const VoteExample = Template.bind({});
VoteExample.args = {
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
};

export const RealVoteBreadcrumb = TemplateForTranslatableVoteBreadcrumb.bind({});
RealVoteBreadcrumb.args = {
  currentStep: 1
};
