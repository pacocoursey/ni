#!/usr/bin/env node
const fs = require('fs-extra');
const co = require('clorox');
const prompts = require('prompts');
const { initial, extras, confirmation } = require('./data.js');

const { log } = console;

const onCancel = () => {
  log(`${co.red('✖')} ${co.bold('Cancelled ni.')}`);
  process.exit(1);
};

const error = (err) => {
  log(`${co.red('✖')} ${co.bold(`${err}`)}`);
};

const success = (message) => {
  log(`  ${co.green('✔')} ${co.bold(`${message}`)}`);
};

const print = (o) => {
  // Fix keywords formatting
  if (o.keywords && o.keywords.length <= 1) o.keywords = [];

  // Make scripts be an object
  const scripts = {};
  if (o.scripts && o.scripts.length !== 0) {
    o.scripts.forEach((s) => { scripts[s] = ''; });
  }
  delete o.scripts;
  o.scripts = scripts;

  // Add dependencies and devDependencies
  o.dependencies = {};
  o.devDependencies = {};

  return JSON.stringify(o, null, 2);
};

async function init() {
  // Answer initial package.json questions
  const answers = await prompts(initial, { onCancel });

  // Show user the completed package.json file
  const pretty = print(answers);
  log(`\n${pretty}\n`);

  // Ensure that the entry point file exists
  fs.ensureFile(answers.main, (err) => {
    if (err) { error(err); }
  });

  // Confirm creation of the package, exit otherwise
  const c = await prompts(confirmation, { onCancel });
  if (!c.confirm) {
    onCancel();
  } else {
    try {
      await fs.outputFile('package.json', pretty);
      success('Created package.json');
    } catch (err) {
      error(err);
    }
  }

  // Query about extra setup options
  const x = await prompts(extras, { onCancel });

  // .gitignore
  if (x.gitignore) {
    let files;
    if (x.gitignoreFiles && x.gitignoreFiles.length !== 0) {
      files = x.gitignoreFiles.join('\n');
      files = `${files}\n`;
    } else {
      files = '\n';
    }

    try {
      await fs.outputFile('.gitignore', files);
      success('Created .gitignore');
    } catch (err) {
      error(err);
    }
  }

  // README.md
  if (x.readme) {
    try {
      await fs.outputFile('README.md', '');
      success('Created README.md');
    } catch (err) {
      error(err);
    }
  }

  success(`${answers.name} has been initialized. Get to work.`);
}

init();
