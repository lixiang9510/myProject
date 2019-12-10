<template>
	<div class="App">
		<p>你好</p>
		<Logo />
		<Message />
	</div>
</template>

<script>
	import Logo from './components/Logo.vue';
	import Message from './components/Message.vue';
	export default {
		name:'App',
		components:{
			Logo,
			Message
		}
	}
</script>

<style>
	p{
		color: red;
	}
</style>