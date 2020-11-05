# belenios-frontend-components

This repository contains several User Interface components meant to be used in [Belenios](https://www.belenios.org/). They are implemented using Javascript ES6 and React (without JSX nor transpilation), and use i18next for internationalisation.

[Here is a demo](https://swergas.github.io/belenios-frontend-components/index_without_npm.html#uuid=E7bP7XBxsumU3B) of a vote User Interface which uses these components.

## Browsing components using the index.html file

- Install npm, optionnaly using nvm (if you choose to use nvm, don't forget to execute `nvm use current` before executing the following commands)

- Install the minimum dependencies required for this project (React, i18next, etc):

`npm install --only=production`

- Start a local web server in this directory (required for Javascript modules to load without CORS issues):

`npm run server`

- And open your browser at the following URL:

http://localhost:8000/#lang=fr&uuid=E7bP7XBxsumU3B

Supported languages (in hash parameter of the URL) are "en" and "fr".

## Browsing components using Storybook

- Install not only the minimum set of dependencies required, but also development packages (those in `devDependencies` of `package.json`. They include Storybook and its dependencies, and are needed only if you want to build the storybook which displays components listed in this repository):

`npm install`

- Start the local Storybook server:

`npm run storybook`

It opens your browser at an URL like the following:

http://localhost:6006

