<template>
	<div class="BottomNav">
		<ul class="nav-wrap">
			<li class="nav-item">
				<router-link class="nav-item-link" to="/home" 
				:class="{active:$route.path.includes('/home')}"
				>
					<i class="fa fa-home"></i>
					<span>首页</span>
				</router-link>	
			</li>
			<li class="nav-item">
				<router-link class="nav-item-link" to="/card"
				:class="{active:$route.path.includes('/card')}"
				>
					<i class="fa fa-star"></i>
					<span>购物车</span>
				</router-link>	
			</li>
			<li class="nav-item">
				<router-link class="nav-item-link" to="/me"
				:class="{active:$route.path.includes('/me')}"
				>
					<i class="fa fa-user"></i>
					<span>个人中心</span>
				</router-link>	
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:"BottomNav"
	}
</script>
<style scoped lang="less">
	.BottomNav{
		position: fixed;
		left: 0;
		bottom:0;
		width: 100%;
		.nav-wrap{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			background-color: #ccc;
			.nav-item{
				list-style: none;
				margin: 10px 0px;
				.nav-item-link{
					display: flex;
					flex-direction: column;
					.rem(font-size,20);
					text-align: center;
					color: #333;
				}
				.active{
					color: #f21;
				}
			}
		}
	}
</style>