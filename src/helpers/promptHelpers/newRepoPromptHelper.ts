import { newLocalRepoPrompts, newRemoteRepoPrompts } from './../../prompts';
import { Answers } from 'inquirer';
import localActions from '../../actions/local/local';
import GitHubApiClient from './../../actions/remote';
import { handleCreateRepoResponse } from './../../GitHubAPI/responseHandlers';

var inquirer = require('inquirer');

export async function getRepoName(): Promise<string> {
    return await inquirer.prompt([{
        type: 'input',
        name: 'repoName',
        message: 'Repository name:'
    }]).then((answer: Answers) => { 
        return answer.repoName;
    });
}

export function getNewRepoInfo(repoName: string) {
    inquirer.prompt(newLocalRepoPrompts).then((info: Answers) =>  {
        info.repoName = repoName;
        if (info.framework) {
            localActions.installFramework(info.framework);
        }
        if (info.toInitRemote) {
            inquirer.prompt(newRemoteRepoPrompts).then((remoteValues: Answers) => {
                localActions.initLocalRepo(info);
                GitHubApiClient.createGitHubClient(remoteValues.personalAccessToken);
                remoteValues.repoName = repoName;
                handleCreateRepoResponse(remoteValues);                    
            });
        }
        else {
            localActions.initLocalRepo(info);
        }
    });
}