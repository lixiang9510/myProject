<template>
	<div class="List">
		<Item 
			v-for="(todo,index) in this.$store.state.todos"
			:todo="todo"
			:key="index"
			:index="index"
		/>
	</div>
</template>

<script>
	import Item from './Item.vue'
	export default {
		name:'List',
		components:{
			Item
		},

	}
</script>

<style scoped>
	
</style>

