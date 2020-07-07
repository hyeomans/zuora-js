import { OauthEndpoints } from './oauth'

export interface AuthHeaderProvider {
  (trackId:string): Promise<string>
}

export const bearerTokenProvider = (oauthEndpoint: OauthEndpoints):AuthHeaderProvider => {
  return async (trackId:string):Promise<string> => {
    const { accessToken } = await oauthEndpoint.token({ 'Zuora-Track-Id': trackId })
    return `Bearer ${accessToken}`
  }
}

export const basicAuthProvider = (clientId:string, clientSecret:string):AuthHeaderProvider => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (_:string):Promise<string> => {
    try {
      const toEncode = `${clientId}:${clientSecret}`
      const buffer = Buffer.from(toEncode)
      return Promise.resolve(`Basic ${buffer.toString('base64')}`)
    } catch (e) {
      return Promise.reject(new Error('cannot generate basic auth header'))
    }
  }
}
