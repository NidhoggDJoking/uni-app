<template>
	<scroll-view :scroll-y="true" @scrolltolower="lower">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in topData" :key="index" @click="godetails(item.id)">
							<image :src="getSrc(item)" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
			<view class="itemlist">
				<view class="item" v-for="(item,index) in dataList" :key="index" @click="godetails(item.id)">
					<view class="item-left">
						<image :src="getSrc(item)" :lazy-load="true"></image>
					</view>
					<view class="item-rigt">
						<text class="one">{{item.name}}</text>
						<text class="two">{{item.address}}</text>
						<text class="three"><text class="red">￥{{(item.price/100)}}</text>起</text>
					</view>
				</view>
			</view>
		
	</scroll-view>
</template>

<script>
	export default {
		onLoad() {
			this.getData();
		},
		data() {
			return {
				topData: [],
				dataList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				// this.httpRequest({
				// 	url: '/etrip/api/app/et/hotels/hot?areaId=' + this.areaCode,
				// 	method: 'GET',
				// }).then(res => {
				// 	this.topData = res.data.content;
				// });
				this.httpRequest({
					url: '/etrip/api/app/et/hotels?pageNo=0&pageSize=99&areaIds=' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content.content;
					this.topData = res.data.content.content.slice(-5);
				});
			},
			godetails(id) {
				var url = './stayDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			lower(){
				// console.log("7777");
			},
			regular(text) {
				if (text) {
					return text.replace(/Text\:/gi, "");
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.demo{
		// position: fixed;
	}
	.swiper {
		height: 200px;
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}
	scroll-view{
		// height: 1000px;
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
					font-weight: 600;
					color: #353535;
					margin-top:5px;
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

				.three {
					font-size: 12px;
					color: #666;
					margin: 15px 0 15px 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					.red{
						font-size: 13px;
						color: red;
						margin-right: 4px;
					}
				}
			}
		}
	}
</style>
