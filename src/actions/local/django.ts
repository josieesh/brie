const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');
var pythonCommand = "";

namespace Django {
    async function checkCurrentDirPythonVersion(): Promise<string> {
        return await exec('python --version')
            .then((result: any) => {
                // Known bug in Python versions < 3.4 that the version prints to stderr
                if (result.stdout === "" && result.stderr !== "") return result.stderr.toLowerCase(); 
                else if (result.stdout !== "") return result.stdout.toLowerCase();
                else return null 
            })
            .catch((error: Error) => {
                return null;
            });
    }
    async function checkInstalledPythonVersions(): Promise<string> {
        return await exec("find /usr/bin -maxdepth 1 -name 'python3*'")
            .then((result: any) => {
                if (result.stdout !== "") return result.stdout;
                else return null;
            })
            .catch((error: Error) => {
                return null;
            });
    }
    async function checkPython3ExistsAndSetCommand(): Promise<void> {
        const regex = /python 3/g
        // First check the python version of the current directory, we may be inside a virtualenv
        const pythonVersion = await checkCurrentDirPythonVersion();
        if (!regex.test(pythonVersion)) {
            const stdout = await checkInstalledPythonVersions();
            if (stdout == null) {
                console.log(chalk.red("Could not find a Python 3 installation or active virtual environment.\n\Please install Python 3.x.x on your machine to proceed."));
            }
            else {
                pythonCommand = "python3 ";
            }
        }
        else {
            pythonCommand = "python ";
        }
    }
    
    export async function installDjangoUnix() {
        await checkPython3ExistsAndSetCommand()
    }

    export function installDjangoWindows() {
        // TODO: implement
    }
}

export default Django;
