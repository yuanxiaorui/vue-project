<template>
<div class="singer" ref="singer">
  <listview :data="singers" @select="selectSinger" ref="list"></listview>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'
import Listview from '@/base/listview/listview'
import {playListMixin} from 'common/js/mixin'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins: [playListMixin],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getsingerList()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getsingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this.normalizeSinger(res.data.list)
          console.log('处理过后的歌手列表：', this.singers)
        }
      })
    },
    normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        // 将前10条数据给hot
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 剩余数据组装
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      // 得到有序列表
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/^[a-zA-Z]+$/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
