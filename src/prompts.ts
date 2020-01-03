import { Answers } from 'inquirer';

export let localRepoPrompts: Array<Object> = [
    
]

export let newRemoteRepoPrompts: Array<Object>= [
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username:'
    },
    {
        type: 'password',
        name: 'personalAccessToken',
        message: 'Enter your GitHub Personal Access Token (See: https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line):',
    },
    {
        type: 'confirm',
        name: 'isPrivateRepo',
        message: 'Will the new repo be private?'
    },
    {
        type: 'input',
        name: 'repoDescription',
        message: 'Enter the repo description (press enter to leave blank):'
    }
]

export let newLocalRepoPrompts: Array<Object> = [
        {
        type: 'confirm',
        name: 'toInitRemote',
        message: 'Initialize remote repo as well?',
    }      
]

export let confirmationPrompt: Array<Object> = [
    {
        type: 'confirm',
        name: 'isCorrect',
        message: 'Is the above correct?'
    }
]

export let firstCommitPrompts: Array<Object> = [
    {
        type: 'input',
        name: 'firstCommitMessage',
        message: 'Enter first commit message:'
    } 
]