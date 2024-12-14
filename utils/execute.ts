import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const npx = 'github:Zay-Dev/omniflex-npx';
const repoUrl = 'https://github.com/Zay-Dev/Omniflex.git';

const cloneExpress = (projectName: string, branch: string) => {
  const gitPath = path.join('apps', 'server', '.git');
  const repoUrl = 'https://github.com/Zay-Dev/omniflex-express-apps-server.git';

  const copyCommand = process.platform === 'win32' ?
    'copy apps\\server\\.env.sample apps\\server\\.env' :
    'cp apps/server/.env.sample apps/server/.env';

  execSync(`git clone --branch ${branch} ${repoUrl} apps/server`, { stdio: 'inherit' });

  fs.rmSync(gitPath, { recursive: true, force: true });

  execSync(copyCommand, { stdio: 'inherit' });
  execSync('yarn', { stdio: 'inherit' });

  console.log('\n✨ Setup complete! Your Omniflex Express project is ready.');
  console.log(`To start the server, run: cd ${projectName} && yarn dev:server`);
  console.log('🎮 Time to customize your server\'s superpowers! Check out apps/server/.env to configure your magic ✨');
};

export default (projectName: string, branch: string, mode?: string | null) => {
  if (!projectName) {
    console.error('Please provide a project name');
    console.error(`Usage: npx ${npx} --${branch} ${mode ? `--${mode} ` : ''}my-project-name`);
    process.exit(1);
  }

  try {
    // Clone main repo with submodules
    execSync(`git clone --branch ${branch} --recurse-submodules ${repoUrl} ${projectName}`, { stdio: 'inherit' });
    process.chdir(projectName);

    switch (mode) {
      case 'express': return cloneExpress(projectName, branch);
      default:
        execSync('yarn', { stdio: 'inherit' });

        console.log('\n✨ Setup complete! Your Omniflex project is ready.');
        console.log('Looks like you want to start with a blank project. Make sure you checkout our get-started/express guide to configure your magic ✨');
        console.log('https://www.omniflex.io/get-started/express');
        return;
    }
  } catch (error: any) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
};