<template>
	<div class="Footer">
		<input type="checkbox" v-model="allDone" >
		<span>{{todoDone}}/{{allTodo}}</span>
		<button @click="handleDleAllDone">删除已经完成任务</button>
	</div>
</template>

<script>
	export default {
		name:'Footer',
		props:{
			todos:Array,
			selectAllDone:Function,
			delAllDone:Function
		},
		computed:{
			allTodo(){
				return this.todos.length
			},
			todoDone(){
				let allDone = 0;
				this.todos.forEach(item=>{
					if(item.done){
						allDone++
					}
				})
				return allDone
			},
			allDone:{
				get(){
					return (this.allTodo == this.todoDone) && (this.allTodo != 0)
				},
				set(value){
					this.selectAllDone(value)
				}
			}
		},
		methods:{
			handleDleAllDone(){
				this.delAllDone()
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

