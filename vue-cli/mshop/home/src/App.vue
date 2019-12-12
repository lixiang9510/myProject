<template>
	<div class="App">

		<router-view></router-view>
		<BottomNav />

	</div>
</template>

<script>
	import BottomNav from './components/BottomNav/BottomNav'
	export default {
		name:'App',
		components:{
			BottomNav
		}
	}
</script>

<style lang="less">
//使用less 安装 npm i less --save-dev
/*
npm install moduleName # 安装模块到项目目录下 
npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。
npm install -save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
npm install -save-dev moduleName # -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
*/
	.App{
		p{
			.rem(font-size,24)		}
	}
</style>