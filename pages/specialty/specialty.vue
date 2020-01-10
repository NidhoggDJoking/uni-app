<template>
	<view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in imgList" :key="index" @click="godetails(item.id)">
						<image :src="getImgUrl(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="content">
			<view class="card" v-for="(item,index) in dataList" :key="index" @click="godetails(item.id)">
				<image :src="getImgUrl(item)"></image>
				<text>{{item.name}}</text></br>
				<text class="money">￥{{item.price/100}}</text>
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
				imgList: [],
				dataList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getDate() {
				// uni.request({
				// 	url: 'https://m.h-etrip.com/etrip/api/app/page/block?code=mobile-area-specialty-top-swiper',
				// 	success: (res) => {
				// 		this.imgList = res.data.content.content.slice(0, 4);
				// 	}
				// });
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/et/specialties?pageNo=0&pageSize=60&areaIds=2220',
					success: (res) => {
						this.dataList = res.data.content.content;
						this.imgList =  res.data.content.content.slice(-4);
					}
				});
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			godetails(id) {
				var url = './specialtyDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			top(data){
				var len = data.url.split("/").length;
				var id = data.url.split("/")[len - 1];
				var url = './specialtyDetails?id=' + id;
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

	.content {
		width: calc(100% - 24px);
		margin-top: 10px;
		padding: 12px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.card {
			display: block;
			height: 150px;
			width: 45%;
			box-shadow: 0px 1px 4px #c7c7c7;
			border-radius: 5px;
			margin-bottom: 10px;

			image {
				width: 100%;
				height: 100px;
				background: center/cover no-repeat #e7e7e7;
				border-radius: 5px 5px 0 0;
			}

			text {
				font-size: 14px;
				margin-left: 10px;
				color: #666;
			}

			.money {
				color: red;
				font-size: 12px;
			}
		}
	}
</style>
