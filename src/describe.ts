import { AxiosInstance } from 'axios'
import { TrackIdAndEntityIdsHeader } from './types'
import { AuthHeaderProvider } from './authHeaderProvider'

export interface DescribeEndpoint {
  <T>(objectName:string, headers?:TrackIdAndEntityIdsHeader): Promise<T>
}

export const describeEndpoint = (axiosInstance: AxiosInstance, authHeaderProvider: AuthHeaderProvider):DescribeEndpoint => {
  return async <T>(objectName:string, headers?:TrackIdAndEntityIdsHeader):Promise<T> => {
    const authHeader = await authHeaderProvider(headers?.['Zuora-Track-Id'] || '')
    const { data } = await axiosInstance.get(`/v1/describe/${objectName}`, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        ...headers
      }
    })
    return data
  }
}
