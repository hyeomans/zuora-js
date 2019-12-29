/**
 * @typedef {Object} ZuoraHeaders
 * @property {string} [Zuora-Track-Id] - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue. The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (:), semicolon (;), double quote ("), and quote (').
 * @property {string} [Zuora-Entity-Ids] - An entity ID. If you have Zuora Multi-entity enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.
 * @property {string} [X-Zuora-WSDL-Version=79] - Zuora WSDL version number.
 */

const actions = (axiosInstance, authHeaderProvider) => {
  /**
   * The query call sends a query expression by specifying the object to query, the fields to retrieve from that object, and any filters to determine whether a given object should be queried.
   *
   * You can use Zuora Object Query Language (ZOQL) to construct those queries, passing them through the queryString.
   *
   * Once the call is made, the API executes the query against the specified object and returns a query response object to your application. Your application can then iterate through rows in the query response to retrieve information.
   *
   * You can pass a simple ZOQL query, without `queryString` like this:
   * ```
   * api.actions.query('select id from Product')
   * ```
   * @param {string} zoqlQuery
   * @param {...ZuoraHeaders} headers - {@link ZuoraHeaders}
   * @param {number} batchSize defaults to 2000. More that 2000 will be ignored by Zuora
   */
  const query = (zoqlQuery, headers = {}, batchSize = 2000) => {
    return authHeaderProvider(headers)
      .then(authHeader => {
        return axiosInstance({
          url: '/v1/action/query',
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            ...headers
          },
          data: JSON.stringify({ queryString: zoqlQuery, conf: { batchSize } })
        })
      })
  }

  /**
   * Use queryMore to request additional results from a previous query call.
   * If your initial query call returns more than 2000 results, you can use queryMore to query for the additional results.
   *
   * Any queryLocator results greater than 2,000, will only be stored by
   * Zuora for 5 days before it is deleted.
   *
   * This call sends a request for additional results from an
   * initial query call. If the initial query call returns more than 2000 results, you can use the queryLocator returned from query to request the next set of results.
   *
   * Note: Zuora expires queryMore cursors after 15 minutes of activity.
   *
   * To use queryMore, you first construct a query call.
   * By default, the query call will return up to 2000 results.
   * If there are more than 2000 results, query will return a boolean done,
   * which will be marked as false, and a queryLocator, which is a marker
   * you will pass to queryMore to get the next set of results.
   * @param {string} queryLocator
   * @param {...ZuoraHeaders} headers
   */
  const queryMore = (queryLocator, headers = {}) => {
    return authHeaderProvider(headers)
      .then(authHeader => {
        return axiosInstance({
          url: '/v1/action/queryMore',
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
            ...headers
          },
          data: JSON.stringify({ queryLocator })
        })
      })
  }

  return { query, queryMore }
}

module.exports = actions
