<template>
    <section>
        <!-- <h3 style="background: #ff0;margin-left:10rem;color:red">{{$store.state.count}}</h3> -->
        <!-- <h3 style="background: #ff0;margin-left:10rem;color:red">{{count}}</h3> -->
        <!-- <button @click="$store.commit('add',10)">count加1</button>
        <button @click="$store.commit('reduce')">count减1</button> -->

        <!-- <button @click="add(10)">count加1</button>
        <button @click="reduce">count减1</button> -->

        <!-- <button @click="addActions">count加1</button>
        <button @click="reduceAction">count减1</button> -->

		
    	<header class="top_tips">
    		<span class="num_tip" v-if="fatherComponent==='home'">{{level}}</span>
            <span class="num_tip" v-if="fatherComponent==='item'">{{itemNum}}</span>
    	</header>
        <div v-if="fatherComponent==='home'">
            <div class="home_logo item_container_style"></div>
            <router-link to="item" class="start button_style" ></router-link>
        </div>
        <div  v-if="fatherComponent==='item'">
    		<div class="item_back item_container_style">
    			<div class="item_list_container">
    				<header class="item_title">{{itemDetail[itemNum-1].topic_name}}</header>
    				<ul>
    					<li  class="item_list"
						v-for="(item,index) in itemDetail[itemNum-1].topic_answer"
						:key="index"
						@click="choosed(index, item.topic_answer_id)"
						>
							<span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
    						<span class="option_detail">{{item.answer_name}}</span>
    					</li>
    				</ul>
    			</div>
    		</div>
			<span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
    		<span class="submit_item button_style" v-else @click="submitAnswer"></span>
    	</div>
        <div style="position:absolute;top:0;left:0;color:red"><router-link to="score">点击进入score页面</router-link></div>
    </section>    
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
	props: ['fatherComponent'],
	data () {
		return {
			choosedNum: null, //选中答案索引
			choosedId:null //选中答案id
		}
	},
    // 方法一：通过computed的计算属性直接赋值
    // computed: {
        // count() {
        //     return this.$store.state.count
        // }
    // }
    // 方法二:通过mapState的对象来赋值
    // computed:mapState({
    //     count: state => state.count
    // })
    // 方法三:通过mapState的数组来赋值
    computed:{
        // ...mapState(['count']),
        // 方法1：getter
        // count() {
        //     return this.$store.getters.count
        // }
        // 方法2：用mapGetters简化模板写法
		// ...mapGetters(['count'])
		...mapState([
			'level','itemNum','itemDetail','timerId'
		])
    },
    methods: {
        // ...mapMutations([
        //     'add',
        //     'reduce'
        // ]),
        // ...mapActions([
        //     'addActions',
        //     'reduceAction'
		// ])
		...mapActions([
			'initializeData','addNum'
		]),
		chooseType(type) {
			switch(type) {
				case 0 : return 'A';
				case 1 : return 'B';
				case 2 : return 'C';
				case 3 : return 'D'
			}
		},
		choosed (index,answerId) {
			this.choosedNum = index;
	  		this.choosedId = answerId;
		},
		nextItem() {
			if (this.choosedNum!==null) {
				this.choosedNum = null
				//保存答案, 题目索引加一，跳到下一题
	  			this.addNum(this.choosedId)
			} else {
				alert('你还没有选择答案！')
			}
		},
		//到达最后一题，交卷，请空定时器，跳转分数页面
		submitAnswer() {
			if (this.choosedNum !== null) {
	  			this.addNum(this.choosedId)
	  			clearInterval(this.timerId)
	  			this.$router.push('score')
  			}else{
  				alert('您还没有选择答案哦')
  			}
		}
	},
	created() {
		if (this.fatherComponent=='home') {
			this.initializeData();
		}
	}
}
</script>
<style lang="less" scoped>
.top_tips{
		position: absolute;
		height: 7.35rem;
		width: 3.25rem;
		top: -1.3rem;
		right: 1.6rem;
		background: url(../images/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		z-index: 10;
		.num_tip{
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
	}
	.item_container_style{
		height: 11.625rem;
		width: 13.15rem;
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;
		left: 1rem;
	}	
	.home_logo{
		background-image: url(../images/1-2.png);
		background-size: 13.142rem 100%;
		background-position: right center;
	}
	.item_back{
		background-image: url(../images/2-1.png);
		background-size: 100% 100%;
	}
	.button_style{
        display: block;
        height: 2.1rem;
        width: 4.35rem;
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%;
        margin-left: -2.4rem;
        background-repeat: no-repeat;
	}
	.start{
        background-image: url(../images/1-4.png);
    }
    .next_item{
    	background-image: url(../images/2-2.png);
    }
    .submit_item{
    	background-image: url(../images/3-1.png);
    }
    .item_list_container{
    	position: absolute;
    	height: 7.0rem;
    	width: 8.0rem;
    	top: 2.4rem;
    	left: 3rem;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 0.65rem;
		color: #fff;
		line-height: 0.7rem;
	}
	.item_list{
		font-size: 0;
		margin-top: 0.4rem;
		width: 10rem;
		span{
			display: inline-block;
			font-size: 0.6rem;
			color: #fff;
			vertical-align: middle;
		}
		.option_style{
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}
		.has_choosed{
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}
		.option_detail{
			width: 7.5rem;
			padding-top: 0.11rem;
		}
	}
</style>

