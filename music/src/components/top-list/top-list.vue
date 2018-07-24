<template>
    <transition name="slide">
        <music-list :title="title"  :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/music-list'
import {getTopListCP} from 'api/rank'
export default {
  components: {
    MusicList
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.toplist.topTitle
    },
    bgImage () {
      return this.toplist.picUrl
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
      console.log('ooo:', this.toplist.id)
      getTopListCP(this.toplist.id).then((res) => {
        console.log('jj:', res)
      })
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
