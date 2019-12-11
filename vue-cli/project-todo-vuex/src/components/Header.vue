<template>
	<div class="Header">
		<input 
		type="text"
		placeholder="请输入任务，按回车提交" 
		v-model="task"
		@keyup.enter="handleAdd"
		
		>
	</div>
</template>

<script>
	export default {
		name:'Header',
		props:{
			addTodo:Function
		},
		data(){
			return {
				task:''
			}
		},
		methods:{
			handleAdd(){
				const task = this.task.trim();
				if(!task){
					alert("不能输入空的任务");
					return;
				}
				const todo = {
					task,
					done:false
				}
				// console.log(this.$store)//上面有个dispatch方法
				this.$store.dispatch('addTodo',todo)
				this.task = ''
			}
		}
	}
</script>

<style scoped>
	.Header input{
		box-sizing: border-box;
		width: 100%;
		height: 40px;
		border:1px solid #aaa;
		text-align: center;
		margin-bottom: 20px;
	}
</style>

