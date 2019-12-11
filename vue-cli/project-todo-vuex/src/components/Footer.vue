<template>
	<div class="Footer">
		<input type="checkbox" v-model="allDone" >
		<span>{{todoDone}}/{{allTodo}}</span>
		<button @click="handleDleAllDone">删除已经完成任务</button>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'Footer',
		computed:{
			...mapGetters([
				'allTodo',
				'todoDone'
			]),
			allDone:{
				get(){
					return this.$store.getters.allDone
				},
				set(value){
					// this.selectAllDone(value)
					this.$store.dispatch('selectAllDone',value)
				}
			}
		},
		methods:{
			handleDleAllDone(){
				// this.delAllDone()
				if(window.confirm('您确定删除所有已经完成任务吗')){
					this.$store.dispatch('delAllDone')
				}
			}
		}
	}
</script>

<style scoped>
	.Footer{
		box-sizing: border-box;
		width: 100%;
		height: 40px;
		border:1px dashed #aaa;
		margin-top: 60px;
	}
	.Footer input{
		float: left;
		margin-top: 10px;
		width: 20px;
		height: 20px;
	}
	.Footer span{
		box-sizing: border-box;
		float: left;
		height: 40px;
		line-height: 40px;
		margin-left: 10px;
	}
	.Footer button{
		float: right;
		height: 20px;
		text-align: center;
		color: red;
		margin-top: 10px;
	}
	.Footer:hover span{
		color: #ff6700;
	}
</style>

