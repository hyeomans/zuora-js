/**
 * @typedef {Object} ZuoraHeaders
 * @property {string} [Zuora-Entity-Ids] - An entity ID. If you have Zuora Multi-entity enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.
 */

const describe = (axiosInstance, authHeaderProvider) => {
  /**
   *
   * @param {string} objectName - API name of an object in your Zuora tenant. For example, InvoiceItem. See Zuora Object Model for the list of valid object names. Depending on the features enabled in your Zuora tenant, you may not be able to list the fields of some objects.
   * @param {...JSON} headers
  */
  return (objectName, headers = {}) => {
    return authHeaderProvider(headers)
      .then(authHeader => {
        return axiosInstance({
          url: `/v1/describe/${objectName}`,
          method: 'GET',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            ...headers
          }
        })
      })
  }
}

module.exports = describe
