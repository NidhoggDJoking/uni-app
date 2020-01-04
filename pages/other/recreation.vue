<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in dataList" :key="index">
							<image :src="getImgUrl(item)" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<text class="h3">专属推荐</text>

		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getImgUrl(item)"></image>
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
					url: 'https://m.h-etrip.com/etrip/api/app/page/block?code=mobile.area.fun.recommendation',
					success: (res) => {
						this.dataList = res.data.content.content;
					}
				});
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/et/funs?pageNo=0&pageSize=20&areaIds=2220',
					success: (res) => {
						this.itemList = res.data.content.content;
					}
				});
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			godetails(id) {
				var url = '../details/recreation?id=' + id;
				uni.redirectTo({
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
		margin: 15px 0 0px 15px;
	}

	.itemlist {
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
