<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="playList">
      <div>
      <div class="slider-wrapper" v-if="recommendList.length>0">
        <slider>
        <div :key="item.id" v-for="item in recommendList">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl" @load="_loadImage()" />
          </a>
        </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" @click="selectItem(item)" v-for="item in playList" :key="item.dissid">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div v-show="!playList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getPlayList} from 'api/recommend'
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [playListMixin],
  data () {
    return {
      recommendList: [],
      playList: []
    }
  },
  components: {
    Loading,
    Slider,
    Scroll
  },
  created () {
    // 模拟慢网速
    /* setTimeout(() => {
      this._getRecommend()
    }, 3000) */
    this._getRecommend()
    // 模拟慢网速
    /* setTimeout(() => {
      this._getPlayList()
    }, 2000) */
    this._getPlayList()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendList = res.data.slider
          // console.log(res.data.slider)
        }
      })
    },
    _getPlayList () {
      getPlayList().then((res) => {
        if (res.code === ERR_OK) {
          this.playList = res.data.list
        }
      })
    },
    _loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
