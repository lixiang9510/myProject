

import Vue from 'vue';

import VueRouter from 'vue-router';

//引入模块组件
import Home from '../pages/Home/Home.vue'
import Card from '../pages/Card/Card.vue'
import Me from '../pages/Me/Me.vue'

Vue.use(VueRouter)

export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/card",component:Card},
		{path:"/me",component:Me},
		{path:"/",redirect:"/home"}
	]
})