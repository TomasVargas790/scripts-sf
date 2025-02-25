
import yargs from 'yargs'
import inquirer from 'inquirer';

import { searchStringInFiles } from './searchStringInFiles.ts';
import { KEY_WORDS } from './constants.ts';

console.clear()
yargs()
    .usage('$0 <command> [options]')
    .command(
        'search',
        'Busca el SObject indicado en las clases Apex',
        () => { },
        async () => {
            const { sobject } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'sobject',
                    message: 'El nombre del SObject a buscar:',
                    choices: Object.keys(KEY_WORDS),
                },
            ]);
            searchStringInFiles(sobject)
        })
    .demandCommand(1, 'Debes proporcionar un comando válido. Usa --help para más información.') // Asegura que se pase al menos un comando
    .strict() 
    .help()
    .alias('help', 'h')
    .parse();

