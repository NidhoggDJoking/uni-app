<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in dataList" :key="index" @click="godetails(item.id)">
							<image :src="getSrc(item)" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<text class="h3">专属推荐</text>
		<view class="grid">
			<view v-for="(item,index) in dataList2" :key="index" @click="godetails(item.id)">
				<image :src="getSrc(item)" />
				<view class="scenicwrap"><text>{{item.name}}</text></view>
			</view>
		</view>
		<!-- <text class="h3">专属推荐</text> -->
		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getSrc(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.name}}</text>
					<text class="two">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getDate();
		},
		data() {
			return {
				dataList: [],
				dataList2: [],
				itemList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getDate() {
				// this.httpRequest({
				// 	url: '/etrip/api/app/page/block?code=mobile.index.restaurant.top-swiper',
				// 	method: 'GET',
				// }).then(res => {
				// 	this.dataList = res.data.content.content;
				// });
				this.httpRequest({
					url: '/etrip/api/app/et/restaurants?pageNo=0&pageSize=20&areaIds=' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.itemList = res.data.content.content;
					this.dataList = res.data.content.content.slice(-8,-4);
					this.dataList2 = res.data.content.content.slice(-4);
				});
				// this.httpRequest({
				// 	url: '/etrip/api/app/page/block?code=mobile.index.restaurant.recommend',
				// 	method: 'GET',
				// }).then(res => {
				// 	this.dataList2 = res.data.content.content.slice(0, 4);
				// });
			},
			godetails(id) {
				var url = './foodDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			top(data){
				var len = data.url.split("/").length;
				var id = data.url.split("/")[len - 1];
				var url = './foodDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.swiper {
		height: 200px;
	}
	.swiper image {
		width: 100%;
		height: 100%;
	}
	.h3 {
		font-size: 19px;
		font-weight: 600;
		color: #4e4e4e;
		display: block;
		width: 100%;
		text-align: center;
		margin: 15px 0 10px 0px;
	}
.grid {
		width: calc(100% - 20px);
		padding: 10px;
		display: flex;
		justify-content: space-around;
		border-bottom: 5px solid #f7f8fa;
		flex-wrap: wrap;
	}
	.grid>view {
		width: 47.5%;
		height: 108px;
		margin-bottom: 10px;
		position: relative;
		image {
			width: 100%;
			height: 100%;
			border-radius: 7px;
		}
		.scenicwrap {
			position: absolute;
			bottom: 0;
			width: 100%;
			border-radius: 0 0 7px 7px;
			line-height: 25px;
			color: #fff;
			background: rgba(0, 0, 0, 0.6);

			text {
				display: block;
				font-size: 13px;
				margin-left: 6px;
				max-width: 90%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.itemlist {
		// margin-top: 10px;
		.item {
			display: flex;
			padding: 10px;
			justify-content: space-around;
			.item-left {
				width: 43%;
				image {
					width: 100%;
					height: 100px;
					border-radius: 5px;
				}
			}
			.item-rigt {
				width: 50%;
				.one {
					font-size: 15px;
					display: block;
				}
				.two {
					font-size: 12px;
					color: #666;
					display: block;
					margin: 10px 0 10px 0;
				}
			}
		}
	}
</style>
