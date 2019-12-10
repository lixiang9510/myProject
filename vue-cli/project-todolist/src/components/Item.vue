<template>
	<div class="Item">
		<input type="checkbox" v-model="todo.done">
		<span>{{todo.task}}</span>
		<button>删除</button>
	</div>
</template>

<script>
	export default {
		name:'Item',
		props:{
			todo:Object
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
	.Item:hover span{
		color: #ff6700;
	}
</style>

