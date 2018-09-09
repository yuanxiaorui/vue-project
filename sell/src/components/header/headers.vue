<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.header
  color: #fff
  background: #000
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size:0
    position relative
    .avatar
      display: inline-block
      vertical-align top
      img
        border-radius: 2px
    .content
      display: inline-block
      font-size: 14px
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          width: 30px
          height: 18px
          display inline-block
          vertical-align: top
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
            font-size: 18px
            color: rgb(255,255,255)
            font-weight: bold
            line-height: 18px
            margin-left: 6px
      .description
        font-size: 12px
        color: rgb(255,255,255)
        line-height: 12px
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size: 10px
          color: rgb(255,255,255)
          line-height: 10px
    .support-count
      position: absolute
      right: 12px
      bottom: 18px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        line-height: 24px
        font-size: 10px
        margin-right: 2px




</style>
