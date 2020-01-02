import { Answers } from 'inquirer';
import GitHubApiClient from './../actions/remote';
import { parseCreateRemoteValues } from './../helpers/parsers/parseRequestBody';
import { createRepoRequestBody } from './requestBodies';

var chalk = require('chalk');

export async function handleCreateRepoResponse(remoteValues: Answers) {
    const requestBody: createRepoRequestBody = parseCreateRemoteValues(remoteValues);
    const response = await GitHubApiClient.initRemoteRepo(requestBody);
    if (response.status == 201) console.log(chalk.green(`New remote repository created at https://github.com/${remoteValues.username}/${remoteValues.repoName}.`));
    else if (response.status == 422) console.log(chalk.red(`Repository with name ${remoteValues.repoName} already exists on this GitHub account.`));
    else if (response.status == 401) console.log(chalk.red(`Unable to create remote repository - bad token.`));
    else {
        console.log(chalk.red(`Something went wrong.`));
    }
}