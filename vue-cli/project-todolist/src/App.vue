<template>
	<div class="App">
		<h2>TODO LIST</h2>
		<Header />
		<List :todos="todos"/>
		<Footer />
	</div>
</template>

<script>
	import Header from './components/Header.vue';
	import List from './components/List.vue';
	import Footer from './components/Footer.vue';
	export default {
		name:'App',
		components:{
			Header,
			List,
			Footer
		},
		data(){
			return {
				todos:[
					{task:'学习',done:false},
					{task:'看电影',done:true},
					{task:'打篮球',done:false}
				]
			}
		}
	}
</script>

<style>
	.App{
		width: 800px;
		height: 600px;
		border:1px solid black;
		margin: 50px auto;
	}
	.App h2{
		width: 100%;
		text-align: center;
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
	}
</style>