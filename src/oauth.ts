import { AxiosInstance } from 'axios'
import qs from 'qs'
import { TrackIdHeader } from './types'

export interface OauthTokenZuoraResponse {
  // eslint-disable-next-line camelcase
  expires_in: number
  // eslint-disable-next-line camelcase
  access_token: string
  jti: string
  scope: string
  // eslint-disable-next-line camelcase
  token_type: string
}

export interface OauthTokenResponse {
  expiresIn: number
  accessToken: string
  jti: string
  scope: string
  tokenType: string
  limitMinute: string
  remainingMinute: string
  trackId: string
}

export interface OauthEndpoints {
  /**
   *
   * Creates an oauth token.
   * The errors that can return are:
   *
   * 400: either clientId or clientSecrete is missing
   *
   * 401: clientSecret is incorrect
   *
   * 429: too many requests
   *
   * **NOTE**
   *
   * We expose this endpoint to expose all
   * endpoints from Zuora,
   * however this will be used internally called
   * everytime we call another zuora endpoint.
   */
  token: (headers?:TrackIdHeader) => Promise<OauthTokenResponse>
}

export function oauth (axiosInstance:AxiosInstance, clientId: string, clientSecret: string): OauthEndpoints {
  return {
    token: async (headers?:TrackIdHeader): Promise<OauthTokenResponse> => {
      const { data, headers: responseHeaders } = await axiosInstance.post<OauthTokenZuoraResponse>('/oauth/token', qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Zuora-Track-Id': headers?.['Zuora-Track-Id'] || ''
        }
      })

      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        jti: data.jti,
        scope: data.scope,
        tokenType: data.token_type,
        limitMinute: responseHeaders['x-ratelimit-limit-minute'],
        remainingMinute: responseHeaders['x-ratelimit-remaining-minute'],
        trackId: responseHeaders['zuora-track-id']
      }
    }
  }
}
