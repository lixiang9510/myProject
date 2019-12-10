<template>
	<div class="Header">
		<input 
		type="text"
		placeholder="请输入任务，按回车提交" 
		>
	</div>
</template>

<script>
	export default {
		name:'Header'
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

