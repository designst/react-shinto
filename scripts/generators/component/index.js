/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');
const getComponentPath = require('../utils/getComponentPath');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    let componentPath;
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.js.hbs';
      }
    }

    data.parent = getComponentPath(data);

    if (data.parent) {
      componentPath = `../../app/components/${data.parent}/{{ properCase name }}`;
    } else {
      componentPath = `../../app/components/{{ properCase name }}`;
    }

    const actions = [
      {
        type: 'add',
        path: `${componentPath}/index.js`,
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${componentPath}/__tests__/index.test.js`,
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If they want a i18n messages file
    // noinspection JSUnresolvedVariable
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: `${componentPath}/messages.js`,
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If want loadable.js to load the component asynchronously
    // noinspection JSUnresolvedVariable
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${componentPath}/loadable.js`,
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
