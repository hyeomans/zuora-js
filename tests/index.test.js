test('returns expected API interface', () => {
  const api = require('../src')('https://rest.apisandbox.zuora.com', 'clientId', 'clientSecret')
  expect(api.actions).toBeDefined()
  expect(api.oauth).toBeDefined()
})
