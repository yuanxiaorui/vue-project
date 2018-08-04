import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// const state = {
//     count: 1
// }

// const mutations = {
//     add: function(state, n) {
//         state.count+=n
//     },
//     reduce(state) {
//         state.count-=1
//     }
// }

// const getters = {
//     count: function(state) {
//         // return state.count+=100
//         return state.count
//     }
// }

// const actions = {
//     addActions(context) {
//         setTimeout(() => {
//             context.commit('add',10)
//         },1000)
//         console.log('我比reduce提前执行');
//     },
//     reduceAction({commit}) {
//         commit('reduce')
//     }
// }


// state
const state = {
	level: '第一周', //活动周数
	itemNum: 1, // 第几题
	allTime: 0,  //总共用时
	timerId: '', //定时器
	itemDetail: [
        {
            "topic_id": 20,
            "active_topic_id": 4,
            "type": "ONE",
            "topic_name": "题目一",
            "active_id": 1,
            "active_title": "欢乐星期五标题",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [
            {
			"topic_answer_id": 1,
			"topic_id": 20,
			"answer_name": "答案aaaa",
			"is_standard_answer": 0
            }, {
                "topic_answer_id": 2,
                "topic_id": 20,
                "answer_name": "正确答案",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 3,
                "topic_id": 20,
                "answer_name": "答案cccc",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 4,
                "topic_id": 20,
                "answer_name": "答案dddd",
                "is_standard_answer": 1
            }
        ]
	    }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目二",
            "active_id": 1,
            "active_title": "欢乐星期五标题",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [
                {
                "topic_answer_id": 5,
                "topic_id": 21,
                "answer_name": "答案A",
                "is_standard_answer": 1
                }, {
                    "topic_answer_id": 6,
                    "topic_id": 21,
                    "answer_name": "答案B",
                    "is_standard_answer": 0
                }, {
                    "topic_answer_id": 7,
                    "topic_id": 21,
                    "answer_name": "正确答案",
                    "is_standard_answer": 0
                }, {
                    "topic_answer_id": 8,
                    "topic_id": 21,
                    "answer_name": "答案D",
                    "is_standard_answer": 0
                }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目三",
            "active_id": 1,
            "active_title": "欢乐星期五标题",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 9,
                "topic_id": 21,
                "answer_name": "测试A",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 10,
                "topic_id": 21,
                "answer_name": "BBBBBB",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 11,
                "topic_id": 21,
                "answer_name": "CCCCCC",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 12,
                "topic_id": 21,
                "answer_name": "正确答案",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目四",
            "active_id": 1,
            "active_title": "欢乐星期五标题",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 13,
                "topic_id": 21,
                "answer_name": "正确答案",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 14,
                "topic_id": 21,
                "answer_name": "A是错的",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 15,
                "topic_id": 21,
                "answer_name": "D是对的",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 16,
                "topic_id": 21,
                "answer_name": "C说的不对",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "欢乐星期五标题",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
			"topic_answer_id": 17,
			"topic_id": 21,
			"answer_name": "错误答案",
			"is_standard_answer": 1
		}, {
			"topic_answer_id": 18,
			"topic_id": 21,
			"answer_name": "正确答案",
			"is_standard_answer": 0
		}, {
			"topic_answer_id": 19,
			"topic_id": 21,
			"answer_name": "错误答案",
			"is_standard_answer": 0
		}, {
			"topic_answer_id": 20,
			"topic_id": 21,
			"answer_name": "错误答案",
			"is_standard_answer": 0
		}]
        }
    ],
	answerid: [], //答案id
}

// mutations
const REMBER_TIME = 'REMBER_TIME'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const REMBER_ANSWER = 'REMBER_ANSWER'
const ADD_ITEMNUM = 'ADD_ITEMNUM'
const mutations = {
    [REMBER_TIME](state) {
		// state.timer = setInterval(() => {
            state.allTime++; //总共用时
		// }, 1000)
    },
    /*
	初始化信息，
	 */
	[INITIALIZE_DATA](state) {
		state.itemNum = 1; //第几题
		state.allTime = 0; //总共用时
		state.answerid = [];
    },
    //记录答案
	[REMBER_ANSWER](state, id) {
		state.answerid.push(id);
    },
    //点击进入下一题
	[ADD_ITEMNUM](state, num) {
		state.itemNum += num;
	}
}

// action
//初始化信息
const actions = {
    initializeData({commit}) {
        commit('INITIALIZE_DATA');
    },
    rembertimes({ commit,state }) {
        clearInterval(state.timerId)
        state.timerId = setInterval(function(){
            commit('REMBER_TIME');
        },1000)
    },
    addNum({ commit, state }, id) {
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})