import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyrics () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=4DB0BCCF596448AB75F6549C6ABF1090E08DE605BF26929BC8E319474C9A47C54E10F567532CC6721EEF990340642B974B42587CF926C932&guid=8837720230&uin=0&fromtag=66`
    // url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9786549520&vkey=CF590A504E92603EBA0857A1D6F5D9B67CB84396A12812FDCA65969ED975812BDD671F82F2EBAEE3BDD66CE345D28BA3786CC505E3A30C4B&uin=0&fromtag=38`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=7D5A020DA0F403E467BD2A67BB416A862950FFCE90EB2B2C253FFCF753D5DFB9E6D88D5F3BA871EC08DB95060056BE68872742CB72D99C63&guid=8837720230&uin=0&fromtag=66`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=E7918B8F490DC8589B7C3BD05D20683D5FA7D4A159433A4B67788342D5C88B70374519B4BAA201A5DE6CF39B8322719B4CF44B54701C1F93&guid=4403811611&uin=0&fromtag=66`
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
