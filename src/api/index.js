import { prefix } from './base'
import { request } from './config'

// post
export const addIntentionApi = (data) => request({
  url: `${prefix}/security/intentionReport/insertIntentionTransactionReport`,
  method: 'POST',
  data
})

// get
export const getListApi = (params) => request({
  url: `${prefix}/security/commissionScheme/queryPage`,
  method: 'GET',
  params
})
