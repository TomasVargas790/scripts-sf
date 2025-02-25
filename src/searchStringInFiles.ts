import { readdir, writeFile, } from 'fs/promises';
import { createReadStream, lstatSync } from 'fs';
import { createInterface } from 'readline/promises';
import { KEY_WORDS } from './constants.ts';

const baseUrl = '../sf/force-app/main/default';
const directories = ['classes', 'lwc'];

export async function searchStringInFiles(sobject: string) {
    console.clear()
    console.log(`Searching ${sobject}.`)
    for (let directory of directories) {
        const actualURL = `${baseUrl}/${directory}`;

        const files = await readdir(actualURL, { encoding: 'utf-8', recursive: true });

        console.log(`Directory:${actualURL} Total files: ${files.length}`);

        const stringsToSearch = KEY_WORDS[sobject]
        const summary = await Promise.all(files
            .filter(file => lstatSync(`${actualURL}/${file}`).isFile())
            .map(async file => {

                const lines: number[] = [];
                const readedFile = createInterface({
                    input: createReadStream(`${actualURL}/${file}`)
                });

                let lineNumber = 0;

                for await (const line of readedFile) {
                    lineNumber++;
                    if (stringsToSearch.some(s => line.toLowerCase().includes(s.toLowerCase()))) {
                        lines.push(lineNumber);
                    }
                }

                return {
                    file,
                    lines
                };
            })
        )

        const filteredSummary = summary.filter(({ lines }) => lines.length > 0)

        const json = filteredSummary.reduce((prev, { lines, file }) => ({ ...prev, [file]: lines }), {})
        const csv = filteredSummary.reduce((prev, { lines, file }) => prev + '\n' + file + ';' + lines, 'file;lines')

        const title = `${new Date().toISOString().split('T')[0]}_${sobject}_${directory}`

        await writeFile(`./files/searchStringInFiles/${title}.json`, JSON.stringify(json, null, 2));
        await writeFile(`./files/searchStringInFiles/${title}.csv`, csv);

        console.log('Summary saved');
    }
}

searchStringInFiles('SOCIETY_PLAN')