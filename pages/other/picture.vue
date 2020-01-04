<template>
	<view>
		<view class="nav">
			<view :class="{ active: star == 0 }" @click="change(0)">风光</view>
			<view :class="{ active: star == 1 }" @click="change(1)">美食</view>
			<view :class="{ active: star == 2 }" @click="change(2)">建筑</view>
			<view :class="{ active: star == 3 }" @click="change(3)">人文</view>
		</view>
		<view class="picture" v-for="(item,index) in dataList" :key="index" v-show="index == star">
			<view class="content" v-for="(item2,index2) in item.content" :key="index2">
				<image :src="getImgUrl(item2)" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getValue
	} from '@/common/public'
	export default {
		onLoad() {
			this.getDate();
		},
		data() {
			return {
				star: 0,
				dataList: [],
			}
		},
		methods: {
			change(num) {
				this.star = num;
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			getDate() {
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/et/areas/album/2220',
					success: (res) => {
						this.dataList = res.data.content;
						console.log(this.dataList);
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.nav {
		display: flex;
	}

	.nav>view {
		width: 25%;
		text-align: center;
		height: 35px;
		line-height: 35px;
	}

	.active {
		border-bottom: 2px solid red;
	}

	image {
		width: calc(100% -20px);
		height: 260px;
		margin: 10px auto;
		display: block;
		border-radius: 10px;
		box-shadow: 0px 1px 4px #c7c7c7;
	}
</style>
