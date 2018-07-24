import axios from 'axios'
import {commonParams} from './config'

export function getToplist () {
  const url = '/api/getTopList'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getTopListCP (topid) {
  const url = '/api/getTopListCp'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: top,
    topid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
