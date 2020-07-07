import axios from 'axios'
import { OauthEndpoints, oauth } from './oauth'
import { basicAuthProvider, bearerTokenProvider } from './authHeaderProvider'
import { ActionEndpoints, actionEndpoints } from './action'
import { DescribeEndpoint, describeEndpoint } from './describe'

export interface ZuoraApi {
  oauth: OauthEndpoints
  v1: {
    action: ActionEndpoints
    describe: DescribeEndpoint
  }
}

export function zuoraApi (baseURL: string, clientId: string, clientSecret:string, useBasicAuth = false): ZuoraApi {
  const axiosInstance = axios.create({ baseURL })
  const oauthEndpoints = oauth(axiosInstance, clientId, clientSecret)
  const authHeaderProvider = useBasicAuth ? basicAuthProvider(clientId, clientSecret) : bearerTokenProvider(oauthEndpoints)
  return {
    oauth: oauthEndpoints,
    v1: {
      action: actionEndpoints(axiosInstance, authHeaderProvider),
      describe: describeEndpoint(axiosInstance, authHeaderProvider)
    }
  }
}
