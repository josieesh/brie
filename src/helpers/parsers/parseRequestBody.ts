import { Answers } from 'inquirer';
import { createRepoRequestBody } from '../../GitHubAPI/requestBodies';

export function parseCreateRemoteValues(fields: Answers) : createRepoRequestBody {
    return {
        name: fields.repoName ,
        description: fields.repoDescription,
        private: fields.isPrivateRepo
    } as createRepoRequestBody;
}