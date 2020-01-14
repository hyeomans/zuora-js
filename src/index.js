const axios = require('axios')
const { bearerTokenProvider, basicAuthProvider } = require('./authHeaderProvider')

/**
 * Creates an instance of a Zuora API
 * @param {string} baseURL Zuora API URL
 * @param {string} clientId Client ID or Email if using Basic Auth
 * @param {string} clientSecret Client Secret or Email Password if using Basic Auth
 * @param {boolean} useBasicAuth Use email/password instead of API credentials
 */
function zuora (baseURL, clientId, clientSecret, useBasicAuth = false) {
  const axiosInstance = useBasicAuth ? axios.create({ baseURL: `${baseURL}:19016` }) : axios.create({ baseURL })

  let authHeaderProvider
  if (useBasicAuth) {
    authHeaderProvider = basicAuthProvider(clientId, clientSecret)
  } else {
    const oauth = require('./oauth')(axiosInstance, clientId, clientSecret)
    authHeaderProvider = bearerTokenProvider(oauth)
  }

  return {
    actions: require('./actions')(axiosInstance, authHeaderProvider),
    describe: require('./describe')(axiosInstance, authHeaderProvider)
  }
}

module.exports = zuora
