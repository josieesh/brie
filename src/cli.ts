#!/usr/bin/env node
import './polyfills';
import { Answers } from 'inquirer';

import { getRepoName, getNewRepoInfo } from './helpers/promptHelpers/newRepoPromptHelper'


var commander = require('commander');
var inquirer = require('inquirer');

commander
    .version('1.0.0')
    .description('GitHub Repo Management CLI')

commander
    .command('mkrepo [name]')
    .alias('new')
    .description('Create a new repository. Option to initialize on GitHub.')
    .action(async (name: string) => {
        var repoName = "";
        if (!name) {
            repoName = await getRepoName();
            getNewRepoInfo(repoName);
        }
        else {
            repoName = name;
            getNewRepoInfo(repoName);
        }
    }
)

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    commander.outputHelp()
    process.exit()
}
commander.parse(process.argv)

