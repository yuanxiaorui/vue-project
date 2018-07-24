import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList () {
  var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  var data02 = JSON.stringify({'comm': {'ct': 24, 'cv': 10000}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': 200, 'sex': -100, 'genre': -100, 'index': 1, 'sin': 0, 'cur_page': 1}}})
  var data = Object.assign({}, commonParams, {
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    callback: 'jsonpCallback',
    data: data02
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  var data = Object.assign({}, commonParams, {
    format: 'jsonp',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
