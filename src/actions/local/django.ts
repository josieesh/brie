const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

namespace Django {
    async function checkPython3ExistsAndUse(): Promise<void> {
        const regex = /python 3/g
        // First check the python version of the current directory, we may be inside a virtualenv
        const pythonVersion = await exec('python --version')
            .then((result: any) => {
                // Known bug in Python versions < 3.4 that the version prints to stderr
                if (result.stdout === "" && result.stderr !== "") return result.stderr.toLowerCase(); 
                else if (result.stdout !== "") return result.stdout.toLowerCase();
                else return null 
            })
            .catch((error: Error) => {
                return null;
            });
        if (!regex.test(pythonVersion)) {
            const stdout = await exec("find /usr/bin -maxdepth 1 -name 'python3*'")
            .then((result: any) => {
                return result.stdout;
            })
            .catch((error: Error) => {
                return null;
            });
            if (stdout == null) {
                console.log(chalk.red("Could not find a Python3 installation or active virtual environment.\n\
                    Please install Python 3.x.x on your machine to proceed."));
                throw Error;
            }
        }
    }
    
    export async function installDjangoUnix() {
        await checkPython3ExistsAndUse();
    }

    export function installDjangoWindows() {
    }
}

export default Django;
