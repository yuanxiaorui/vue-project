<template>
    <div>
        <main-container father-component='item'></main-container>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import MainContainer from '../../components/main'
export default {
    name: 'home',
    components: {
        MainContainer
    },
    created() {
        //进入题目页面，开始计时
        this.rembertimes()
    },
    methods: {
        ...mapActions(['rembertimes'])
    }
}
</script>
<style>

</style>

