import { writeFile } from "fs/promises";

import sf from "./sf.ts";

//const apexCode = 'TriggerHandler.bypass%28CaseTriggerHandler.class.getName%28%29%29%3BCase%5B%5D%20cases%20%3D%20%5BSELECT%20Id%2COrigin%20FROM%20Case%20WHERE%20Origin%20%3D%20null%20AND%20GeneratingArea__c%20%3D%20%27Agencia%27%20limit%202000%5D%3Bfor%28Case%20c%3A%20cases%29%7Bc.Origin%20%3D%20%27Agencia%27%3B%7Dupdate%20cases%3BTriggerHandler.clearBypass%28CaseTriggerHandler.class.getName%28%29%29%3B';

const apexCode = `System.debug('aaaa');`

const logResult = await sf.request(`/sobjects/ApexLog/${(await sf.sobject('ApexLog').findOne())?.Id}/Body`)
const apexResult = await sf.tooling.executeAnonymous(apexCode)

await writeFile(`files/javi-brian/logResult.json`, JSON.stringify(logResult, null, 2))
await writeFile(`files/javi-brian/apexResult.json`, JSON.stringify(apexResult, null, 2))



























/* const headers = {
    Authorization: 'Bearer '
}


async function main() {
    for (let i = 0; i < 100; i++) {
        const apex = await (await fetch(apexEndpoint, { headers })).json()

    }
}

main() */