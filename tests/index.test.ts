import { zuoraApi } from '../src'
test('returns expected API interface', () => {
  const api = zuoraApi('https://rest.apisandbox.zuora.com', 'clientId', 'clientSecret')
  expect(api.oauth).toBeDefined()
  expect(api.v1.action).toBeDefined()
  expect(api.v1.describe).toBeDefined()
})
