import * as ora from 'ora'
import { Answers } from 'inquirer';

var chalk = require('chalk');
const fs = require('fs');


const initLocalRepo = (answers: Answers) => {
    (async () => {
        const spinner = ora('Initializing new local repo ...').start();
        fs.mkdir('./testrepo', (err: any) => {
            spinner.stop();
            if (err) {
                console.log(chalk.red(err));
            }
            else {
                console.log(chalk.magentaBright('New local repo initialized!'))
            }
        });
    })()
}

export default {
    initLocalRepo
}