<template>
	<div class="Footer">
		<input type="checkbox">
		<span>1/5</span>
		<button>删除已经完成任务</button>
	</div>
</template>

<script>
	export default {
		name:'Footer'
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

