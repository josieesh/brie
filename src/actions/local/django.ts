const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

namespace Django {
    async function checkPython3Exists(): Promise<void> {
        const stdout = await exec('which -a python3')
            .then((stdout: string, _: string) => {return stdout;})
            .catch((error: Error) => {
                console.log(error);
                return null;
            });
        if (stdout == null) {
            console.log(chalk.red("Please install Python 3.x.x on your machine to proceed."));
            throw Error;
        }
    }
    
    export async function installDjangoUnix() {
        await checkPython3Exists();
    }

    export function installDjangoWindows() {
    }
}

export default Django;
