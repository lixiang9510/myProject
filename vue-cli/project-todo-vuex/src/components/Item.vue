<template>
	<div 
	class="Item"
		:style="{backgroundColor:bgColor}"
		@mouseenter="handleShow(true)"
		@mouseleave="handleShow(false)" 
	>
		<input type="checkbox" v-model="todo.done">
		<span>{{todo.task}}</span>
		<button
			v-show="isShow"
			@click="handleDel"
		>删除</button>
	</div>
</template>

<script>
	export default {
		name:'Item',
		props:{
			todo:Object,
			index:Number

		},
		data(){
			return {
				bgColor:'#fff',
				isShow:false
			}
		},
		methods:{
			handleShow(flag){
				this.bgColor = flag ? "#ccc" : "#fff"
				this.isShow = flag
			},
			handleDel(){
				if(window.confirm('您确定要删除'+this.todo.task+'这条任务吗？')){
					// this.delTodo(this.index)
					this.$store.dispatch('delTodo',this.index)
				}
				
			}
		}
	}
</script>

<style scoped>
	.Item{
		box-sizing: border-box;
		width: 100%;
		height: 40px;
		border:1px dashed #aaa;
		margin-bottom: 10px;
	}
	.Item input{
		float: left;
		margin-top: 10px;
		width: 20px;
		height: 20px;
	}
	.Item span{
		box-sizing: border-box;
		float: left;
		height: 40px;
		line-height: 40px;
		margin-left: 10px;
	}
	.Item button{
		float: right;
		height: 20px;
		text-align: center;
		color: red;
		margin-top: 10px;
	}
</style>

