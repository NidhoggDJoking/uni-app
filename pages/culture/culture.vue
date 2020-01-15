<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in dataList" :key="index" :style="{backgroundImage:'url('+getSrc(item)+')'}" @click="godetails(item.id)">
							<!-- <image :src="getSrc(item)" /> -->
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getSrc(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.title}}</text>
					<view class="address">
						<text class="two">{{item.relationalSpot}}</text>
					</view>
					<text class="three">{{item.summary}}</text>
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
				this.httpRequest({
					url: '/etrip/api/app/et/article/cultures?pageNo=0&pageSize=99&areaIds=' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.itemList = res.data.content.content;
					this.dataList = res.data.content.content.slice(10,15);
				});
			},
			godetails(id) {
				var url = '../culture/cultureDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
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

	.itemlist {
		margin-top: 12px;

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
					font-size: 17px;
					display: block;
					margin-top: 5px;
					font-weight: 600;
					max-width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #3b3b3b;
				}

				.address {
					display: flex;
					align-items: center;
				}

				.two {
					font-size: 12px;
					color: #666;
					display: block;
					margin: 9px 0 9px 0px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.three {
					font-size: 13px;
					color: #666;
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
