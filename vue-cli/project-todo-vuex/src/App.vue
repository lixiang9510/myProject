<template>
	<div class="App">
		<h2>TODO LIST</h2>
		<Header  />
		<List />
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
		methods:{
			addTodo(todo){
				this.todos.unshift(todo)
			},
			delTodo(index){
				this.todos.splice(index,1)
				// console.log(index)
			},
			selectAllDone(value){
				this.todos.forEach(item=>{
					item.done = value;
				})
			},
			delAllDone(){
				this.todos = this.todos.filter(item=>!item.done) //过滤出done是false的项
			}
		}
	}
</script>

<style>
	.App{
		width: 800px;
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