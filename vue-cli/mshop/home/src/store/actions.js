

import {
	getHomeProducts
} from '../api'

export default {
	async getHomeProducts({commit}){
		const products = await getHomeProducts()
		commit('getHomeProducts',{products})
	}
}