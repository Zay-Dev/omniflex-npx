#!/usr/bin/env node

import execute from './utils/execute';

const args = process.argv.slice(2);

const findArg = (values: string[]) => {
  const parsedArgs = args
    .map(arg => arg.toLowerCase().trim().substring(2));
  const index = parsedArgs.findIndex(arg => values.includes(arg));

  if (index >= 0) {
    args[index] = '';
  }

  return parsedArgs[index];
};

const branchName = (() => {
  const values = [
    'alpha',
    //'beta',
    //'stable',
    'develop',
  ];

  return findArg(values) || 'stable';
})();

const mode = (() => {
  const values = [
    'express',
  ];

  return findArg(values) || '';
})();

const projectName = args.filter(Boolean)[0];

execute(projectName, branchName, mode);