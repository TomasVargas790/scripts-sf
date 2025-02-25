type SFConfig = {
    token: string,
    instanceUrl: string
};

type serverConfig = {
    port: string,
    env: string
};

type EnvType = {
    sf: SFConfig;
    server: serverConfig;
};

const validateEnvVariables = (envVariables: string[]): void => {
    envVariables.forEach((variable) => {
        if (!process.env[variable]) {
            console.error(`Error: ${variable} is missing in the environment.`);
            process.exit(1);
        }
    });
};

const requiredEnvVariables = ['SF_TOKEN', 'SF_INSTANCE_URL', 'SERVER_PORT', 'ENVIRONMENT',];
validateEnvVariables(requiredEnvVariables);

const { SF_TOKEN, SF_INSTANCE_URL, SERVER_PORT, ENVIRONMENT } = process.env;

const sfConfig: SFConfig = {
    token: SF_TOKEN as string,
    instanceUrl: SF_INSTANCE_URL as string,
};

const serverConfig: serverConfig = {
    port: SERVER_PORT as string,
    env: ENVIRONMENT as string,
};

const env: EnvType = {
    sf: sfConfig,
    server: serverConfig,
};

export default env