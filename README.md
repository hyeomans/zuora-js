
## Installation

```
$> npm i zuora-js
```

## Usage

```
const zuora = require('zuora-js')
const clientId = 'your-client-id'
const clientSecret = 'your-client-secret'
const api = zuora('https://rest.apisandbox.zuora.com', clientId, clientSecret)

api.actions.query('select id, name from Product', {}, 3)
  .then(console.log)
  .catch(r => console.error(r.response.data))
```