#!/usr/bin/env node
import './polyfills';
import { Answers, prompt } from 'inquirer';
import { newLocalRepoPrompts, newRemoteRepoPrompts } from './prompts';
import localActions from './actions/local';
import GitHubApiClient from './actions/remote';
import { handleCreateRepoResponse } from './GitHubAPI/responseHandlers';


var commander = require('commander');
var inquirer = require('inquirer');

commander
    .version('1.0.0')
    .description('GitHub Repo Management CLI')

commander
    .command('mkrepo')
    .alias('new')
    .description('Create a new Repository. Option to initialize on GitHub.')
    .action(() => {
        inquirer.prompt(newLocalRepoPrompts).then((localValues: Answers) =>  {
            if (localValues.toInitRemote) {
                inquirer.prompt(newRemoteRepoPrompts).then((remoteValues: Answers) => {
                    localActions.initLocalRepo(localValues);
                    GitHubApiClient.createGitHubClient(remoteValues.personalAccessToken);
                    remoteValues.repoName = localValues.repoName;
                    handleCreateRepoResponse(remoteValues);                    
                });
            }
            else localActions.initLocalRepo(localValues);
        });
    }
)

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    commander.outputHelp()
    process.exit()
}
commander.parse(process.argv)

