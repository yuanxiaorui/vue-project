<template>
    <scroll class="suggest"
            ref="suggest"
            :data="result"
            :pullup="pullup"
            @scrollToEnd="searchMore"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll"
        >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import noResult from 'base/no-result/no-result'
import {search} from 'api/search'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  components: {
    Scroll,
    Loading,
    noResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    // 获取搜索数据
    search () {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          // console.log('pp:', this.result)
          // 检查是否还有数据
          this.checkMore(res.data)
        }
      })
    },
    // 整理数据
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    // 整理歌曲数据
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        if (item.songid && item.albummid) {
          ret.push(createSong(item))
        }
      })
      return ret
    },
    // 获取icon
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    // 获取name
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          // console.log('pp:', this.result)
          // 检查是否还有数据
          this.checkMore(res.data)
        }
      })
    },
    // 检查是否还有更多数据
    checkMore (data) {
      const song = data.song
      if (!song.list.length || song.curnum + song.curpage * perpage >= song.totalnum) {
        this.hasMore = false
      }
    },
    // 点击跳转
    selectItem (item) {
      if (item.type === 'singer') {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      }
    },
    listScroll () {
      this.$emit('listScroll')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    query () {
      this.search()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
