
## Installation

```
$> npm i zuora-js
```

## Usage

```
const { zuoraApi } = require('zuora-js')
const clientId = 'your-client-id'
const clientSecret = 'your-client-secret'
const zuora = zuoraApi('https://rest.apisandbox.zuora.com', clientId, clientSecret)

zuora.v1.action.query('select id, name from Product', 3, {"Zuora-Track-Id": "trackid"})
  .then(console.log)
  .catch(r => console.error(r.response.data))
```