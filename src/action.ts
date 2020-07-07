import { AxiosInstance } from 'axios'
import { AuthHeaderProvider } from './authHeaderProvider'
import { TrackIdEntityIdsAndVersionHeaders } from './types'

export interface ActionEndpoints {
  /**
   * The query call sends a query expression by specifying the object to query, the fields to retrieve from that object, and any filters to determine whether a given object should be queried.
   *
   * You can use Zuora Object Query Language (ZOQL) to construct those queries, passing them through the queryString.
   *
   * Once the call is made, the API executes the query against the specified object and returns a query response object to your application. Your application can then iterate through rows in the query response to retrieve information.
   *
   * You can pass a simple ZOQL query, without `queryString` like this:
   * ```
   * api.v1.action.query('select id from Product', 'trackId')
   * ```
   *
   * More information at: https://www.zuora.com/developer/api-reference/#operation/Action_POSTquery
   *
   * @param zoqlQuery ZOQL query in plain text, for example: `select id from Product`.
   * @param trackId Unique request id. Used for tracking purposes.
   * @param batchSize Defaults to 2000
   */
  query: <T>(zoqlQuery:string, batchSize?:number, headers?: TrackIdEntityIdsAndVersionHeaders) => Promise<QueryResponse<T>>

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
   */
  queryMore: <T>(queryLocator:string, headers?: TrackIdEntityIdsAndVersionHeaders) => Promise<QueryResponse<T>>
}

export interface QueryResponse<T> {
  records: Array<T>
  done: boolean
  size: number
  queryLocator?: string
}

export const actionEndpoints = (axiosInstance: AxiosInstance, authHeaderProvider: AuthHeaderProvider):ActionEndpoints => {
  return {
    query: async <T>(zoqlQuery:string, batchSize = 2000, headers?: TrackIdEntityIdsAndVersionHeaders):Promise<QueryResponse<T>> => {
      const authHeader = await authHeaderProvider(headers?.['Zuora-Track-Id'] || '')
      const { data } = await axiosInstance.post('/v1/action/query', JSON.stringify({ queryString: zoqlQuery, conf: { batchSize } }), {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        }
      })
      return data
    },
    queryMore: async<T>(queryLocator:string, headers?: TrackIdEntityIdsAndVersionHeaders):Promise<QueryResponse<T>> => {
      const authHeader = await authHeaderProvider(headers?.['Zuora-Track-Id'] || '')
      const { data } = await axiosInstance.post('/v1/action/queryMore', JSON.stringify({ queryLocator }), {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        }
      })
      return data
    }
  }
}
