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
		<text class="h3">当季热门</text>
		<view class="grid">
			<view v-for="(item,index) in dataList2" :key="index" @click="godetails(item.id)">
				<image :src="getSrc(item)" />
				<view class="scenicwrap"><text>{{item.name}}</text></view>
			</view>
		</view>
		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getSrc(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.name}}</text>
					<text class="two">开放时间：{{item.workTime}}</text>
					<text class="three">{{item.sellPoint}}</text>
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
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/page/block?code=mobile-area-spot-top-swiper',
					success: (res) => {
						// this.dataList = res.data.content.content.slice(0, 4);
						// this.dataList2 = res.data.content.content.slice(-4);
					}
				});
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/et/spot?areaIds=2220&pageNo=0&pageSize=50',
					success: (res) => {
						this.itemList = res.data.content.content;
						this.dataList = res.data.content.content.slice(-10, -4);
						this.dataList2 = res.data.content.content.slice(-4);
					}
				});
			},
			godetails(id) {
				var url = './scenicDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			top(data){
				var len = data.url.split("/").length;
				var id = data.url.split("/")[len - 1];
				var url = './scenicDetails?id=' + id;
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
		color: #666;
		display: block;
		margin: 15px 0 15px 12px;
	}

	.grid {
		width: calc(100% - 20px);
		padding: 0 10px;
		display: flex;
		justify-content: space-around;
		margin-top: 14px;
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
				margin-left: 5px;
				max-width: 85%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.itemlist {
		margin-top: 10px;

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
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin: 10px 0 10px 0;
				}
				.three{
					font-size: 12px;
					color: #666;
					margin: 10px 0 10px 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
