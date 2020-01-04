import * as ora from 'ora'
import { Answers } from 'inquirer';
import { Frameworks } from '../../config/constants';
import Django from './django';

var chalk = require('chalk');
const fs = require('fs');


const initLocalRepo = (answers: Answers) => {
    (async () => {
        const spinner = ora('Initializing new local repo ...').start();
        fs.mkdir(`./${answers.repoName}`, (err: any) => {
            spinner.stop();
            if (err) {
                console.log(chalk.red(err));
            }
            else {
                console.log(chalk.green('New local repo initialized!'))
            }
        });
    })()
}

async function installDjango () {
    console.log("inside install django");
    // TODO: configure for windows machines
    await Django.installDjangoUnix();
}

const installFramework = (framework: string) => {
    switch(framework) { 
        case Frameworks.DJANGO: { 
           installDjango();
           break; 
        } 
        case Frameworks.EXPRESS: { 
           //statements; 
           break; 
        } 
        case Frameworks.PHOENIX: { 
            //statements; 
            break; 
        } 
        case Frameworks.REACT: { 
            //statements; 
            break; 
        } 
        case Frameworks.RUBYONRAILS: { 
            //statements; 
            break; 
        }
        default: { 
           //statements; 
           break; 
        } 
     } 
}

export default {
    initLocalRepo,
    installFramework
}