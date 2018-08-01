<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title"  :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/music-list'
import {getTopListCP} from 'api/rank'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
export default {
  components: {
    MusicList
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title () {
      return this.toplist.topTitle
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'toplist'
    ])
  },
  created () {
    this._getMusicList()
  },
  methods: {
    _getMusicList () {
      if (!this.toplist.id) {
        this.$router.push('/rank')
        return
      }
      getTopListCP(this.toplist.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.songlist)
        }
      })
    },
    _normalizeSong (list) {
      let ret = []
      list.forEach(item => {
        const musicData = item.data
        if (musicData.albummid && musicData.songmid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
