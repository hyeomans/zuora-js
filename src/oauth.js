const qs = require('qs')

/**
 * @typedef {Object} ZuoraHeaders
 * @property {string} [Zuora-Track-Id] - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue. The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (:), semicolon (;), double quote ("), and quote (').
 */

const oauth = (axiosInstance, clientId, clientSecret) => {
  return {
    /**
     * Creates an oauth token.
     * The errors that can return are:
     *
     * 400: either clientId or clientSecrete is missing
     *
     * 401: clientSecret is incorrect
     *
     * 429: too many requests
     * @param {...ZuoraHeaders} headers - {@link ZuoraHeaders}
     */
    token: (headers = {}) => {
      const zuoraTrackId = headers['Zuora-Track-Id'] || ''
      return axiosInstance({
        url: '/oauth/token',
        method: 'POST',
        data: qs.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }),
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Zuora-Track-Id': zuoraTrackId }
      }).then(({ data, headers }) => {
        const { expires_in: expiresIn, access_token: accessToken, jti, scope, token_type: tokenType } = data
        return {
          expiresIn,
          accessToken,
          jti,
          scope,
          tokenType,
          limitMinute: headers['x-ratelimit-limit-minute'],
          remainingMinute: headers['x-ratelimit-remaining-minute'],
          trackId: headers['zuora-track-id']
        }
      })
    }
  }
}

module.exports = oauth
