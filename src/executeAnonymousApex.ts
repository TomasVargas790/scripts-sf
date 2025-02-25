import { writeFile } from "fs/promises";

import sf from "./sf.ts";

//const apexCode = 'TriggerHandler.bypass%28CaseTriggerHandler.class.getName%28%29%29%3BCase%5B%5D%20cases%20%3D%20%5BSELECT%20Id%2COrigin%20FROM%20Case%20WHERE%20Origin%20%3D%20null%20AND%20GeneratingArea__c%20%3D%20%27Agencia%27%20limit%202000%5D%3Bfor%28Case%20c%3A%20cases%29%7Bc.Origin%20%3D%20%27Agencia%27%3B%7Dupdate%20cases%3BTriggerHandler.clearBypass%28CaseTriggerHandler.class.getName%28%29%29%3B';
console.clear()

const apexCode = `TriggerHandler.bypass(CaseTriggerHandler.class.getName());
Case[] cases = [SELECT Id,Origin FROM Case WHERE Origin = NULL AND GeneratingArea__c = 'Agencia' LIMIT 500];
for(Case c: cases){
    c.Origin = 'Agencia';
}
update cases;
TriggerHandler.clearBypass(CaseTriggerHandler.class.getName());`
//const apexCode = `System.debug('aaaa');`

for (let i = 0; i < 2; i++) {
    setTimeout(async () => {


        //ANTES DE EJECUTAR DEJAR DEBUG LOGS SOBRE EL USUARIO SINO NO RESCATARA NADA
        //NO DEBERIA HABER OTRA DEBUG FLAG ACTIVA
        const apexResult = await sf.tooling.executeAnonymous(apexCode)
        console.log('[APEX EXECUTED]')

        const logResult = await sf.request(`/sobjects/ApexLog/${(await sf.sobject('ApexLog').findOne().orderby('LastModifiedDate', 'DESC'))?.Id}/Body`)
        console.log('[LOGS RETRIEVED]')

        await writeFile(`files/javi-brian/apexResult${i}.json`, JSON.stringify(apexResult, null, 2))
        await writeFile(`files/javi-brian/logResult${i}.json`, JSON.stringify(logResult))
        console.log('[LOGS SAVED]')
    }, 14000)
}