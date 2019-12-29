const axios = require('axios')

const bearerTokenProvider = (oauth) => {
  return (trackId) => {
    return oauth.token(trackId).then(r => {
      const { accessToken } = r
      return `Bearer ${accessToken}`
    })
  }
}

function zuora (baseURL, clientId, clientSecret) {
  const axiosInstance = axios.create({ baseURL })
  const oauth = require('./oauth')(axiosInstance, clientId, clientSecret)
  const bearerProvider = bearerTokenProvider(oauth)
  return {
    oauth,
    actions: require('./actions')(axiosInstance, bearerProvider)
  }
}

module.exports = zuora
