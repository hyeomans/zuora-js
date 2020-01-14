
const bearerTokenProvider = (oauth) => {
  return (trackId) => {
    return oauth.token(trackId).then(r => {
      const { accessToken } = r
      return `Bearer ${accessToken}`
    })
  }
}

const basicAuthProvider = (clientId, clientSecret) => () => {
  try {
    const toEncode = `${clientId}:${clientSecret}`
    const buffer = Buffer.from(toEncode)
    return Promise.resolve(`Basic ${buffer.toString('base64')}`)
  } catch (e) {
    return Promise.reject(new Error('cannot generate basic auth header'))
  }
}

module.exports = {
  bearerTokenProvider,
  basicAuthProvider
}
