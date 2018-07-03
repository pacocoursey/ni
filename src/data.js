const path = require('path');

module.exports = {
  confirmation: {
    type: 'confirm',
    name: 'confirm',
    message: 'Create package.json with this information?',
    initial: true,
  },
  extras: [
    {
      type: 'confirm',
      name: 'readme',
      message: 'Add a README.md file?',
      initial: true,
      active: 'yes',
      inactive: 'no',
    },
    {
      type: 'confirm',
      name: 'gitignore',
      message: 'Add a .gitignore file?',
      initial: true,
    },
    {
      type: prev => (prev ? 'list' : null),
      name: 'gitignoreFiles',
      message: 'Enter files to ignore:',
      separator: ',',
      initial: '.DS_Store, node_modules/',
    },
  ],
  initial: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the package name?',
      initial: `${path.basename(process.cwd().toLowerCase())}`,
    },
    {
      type: 'text',
      name: 'version',
      message: 'What version?',
      initial: '0.0.1',
    },
    {
      type: 'text',
      name: 'description',
      message: 'Describe the package:',
    },
    {
      type: 'text',
      name: 'main',
      message: 'What is the entry point?',
      initial: 'index.js',
    },
    {
      type: 'text',
      name: 'repository',
      message: 'Git repository:',
    },
    {
      type: 'list',
      name: 'keywords',
      message: 'Enter relevant keywords:',
    },
    {
      type: 'list',
      name: 'scripts',
      message: 'What npm scripts?',
      initial: 'start, test',
    },
    {
      type: 'select',
      name: 'license',
      message: 'License:',
      choices: [
        { title: 'MIT', value: 'MIT' },
        { title: 'ISC', value: 'ISC' },
      ],
    },
  ],
};
