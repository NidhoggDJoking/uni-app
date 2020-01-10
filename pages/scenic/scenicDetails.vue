<template>
	<view class="content">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in photo" :key="index">
						<image :src="getImgUrl(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="top">
			<text class="title">{{spot.name}} :</text>
			<view class="flex">
				<uni-icons type="location-filled" size="18" color="#f2826a"></uni-icons>
				<text class="address">{{spot.adress}}</text>
			</view>
		</view>

		<view class="text" v-html="spot.description"></view>
		<view class="bookButton" v-if="spot.isBook == 1" @click="goTickets">
			<text>预定门票</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
		data() {
			return {
				id: '',
				dataList: [],
				photo: [],
				spot: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/spot/inst/' + this.id;
				uni.request({
					url: url,
					success: (res) => {
						this.dataList = res.data.content;
						this.spot = res.data.content.spot;
						this.photo = res.data.content.photo;
						console.log(this.photo);
					}
				});
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			goTickets() {
				var url = '../tickets/tickets?id=' + this.id;
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style scoped>
	.content {}

	.swiper {
		height: 200px;
	}

	.swiper image {
		width: 100%;
	}

	.text {
		border-top: 4px solid #ececec;
		margin-top: 65px;
		margin-bottom: 20px;
		background: #fff;
		padding: 15px 20px 20px 20px;
	}

	.top {
		position: absolute;
		top: 180px;
		width: 100%;
		background: #fff;
		border-radius: 15px 15px 0 0;
	}

	.title {
		padding-left: 20px;
		height: 50px;
		line-height: 50px;
		font-size: 17px;
		font-weight: 600;
		display: block;
	}

	.flex {
		padding-left: 17px;
		display: flex;
		align-items: center;

	}

	.address {
		color: #737373;
		font-size: 14px;
		font-weight: 400;
		height: 20px;
		line-height: 20px;
		max-width: 85%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		margin-left: 3px;
	}

	.bookButton {
		width: 100%;
		height: 50px;
		background: #f77042;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.bookButton text {
		width: 100%;
		height: 50px;
		line-height: 50px;
		color: #FFFFFF;
	}
</style>
