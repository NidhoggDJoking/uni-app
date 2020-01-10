<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in dataList" :key="index" @click="top(item)">
							<image :src="getSrc(item)" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<text class="h3">专属推荐</text>

		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getSrc(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.name}}</text>
					<view class="address">
						<uni-icons type="location-filled" size="15" color="#f8673b"></uni-icons>
						<text class="two">{{item.address}}</text>
					</view>
					<text class="three"><text class="red">￥{{item.averagePrice/100}}</text>/人均</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
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
					url: '/etrip/api/app/page/block?code=mobile.area.fun.recommendation',
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content.content;
				});
				this.httpRequest({
					url: '/etrip/api/app/et/funs?pageNo=0&pageSize=20&areaIds=' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.itemList = res.data.content.content;
				});
			},
			godetails(id) {
				var url = './recreationDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			top(data) {
				var len = data.url.split("/").length;
				var id = data.url.split("/")[len - 1];
				var url = './recreationDetails?id=' + id;
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
		margin: 15px 0 5px 15px;
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
					margin-top: 5px;
					max-width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-weight: 500;
				}

				.address {
					display: flex;
					align-items: center;
				}

				.two {
					font-size: 12px;
					color: #666;
					display: block;
					margin: 15px 0 12px 5px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.three {
					font-size: 13px;
					color: #666;
				}

				.red {
					color: red;
					margin-right: 3px;
				}
			}
		}
	}
</style>
