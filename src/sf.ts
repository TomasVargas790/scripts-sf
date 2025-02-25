import { Connection } from "jsforce";
import env from './env.ts'

const { sf: { token, instanceUrl } } = env

export default new Connection({
    accessToken: token,
    instanceUrl
})