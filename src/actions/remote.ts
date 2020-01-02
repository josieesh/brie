import axios from 'axios'
import * as ora from 'ora'
import { createRepoRequestBody } from '../GitHubAPI/requestBodies';

const url: string = "https://api.github.com";

var chalk = require('chalk');


namespace GitHubApiClient {
    export function createGitHubClient(authToken: string) {
        axios.defaults.headers.common['Authorization'] = 'token ' + authToken;
    }
    export async function initRemoteRepo(requestBody: createRepoRequestBody): Promise<any> {
        const spinner = ora();
        try {
            spinner.text = 'Creating repository on GitHub ...';
            spinner.start();
            let response = await axios({
                method: 'post',
                url: `${url}/user/repos`, 
                data: requestBody
            });
            spinner.stop();
            return response;
        } catch (error) {
            spinner.stop();
            return error.response;
        }
    }
}


export default GitHubApiClient