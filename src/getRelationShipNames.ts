import { readdir, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { createInterface } from 'readline/promises';



const baseUrl = '../sf/force-app/main/default/classes';
const files = await readdir(baseUrl, { encoding: 'utf-8' });

console.log(`Total files: ${files.length}`);

const summary = await Promise.all(
    files.map(async file => {
        const lines: number[] = [];
        const readedFile = createInterface({
            input: createReadStream(`${baseUrl}/${file}`)
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

await writeFile('result.json', JSON.stringify(json, null, 2));
await writeFile('result.csv', csv);

console.log('Summary saved');