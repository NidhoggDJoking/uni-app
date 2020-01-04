<template>
	<view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in photo" :key="index">
						<image :src="getImgUrl(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<text class="name">{{dataList.name}} :</text>
		<view class="text" v-html="dataList.description"></view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
		data() {
			return {
				id: '',
				dataList: {},
				photo: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/rents/' + this.id;
				uni.request({
					url: url,
					success: (res) => {
						this.dataList = res.data.content;
						this.spot = res.data.content.spot;
						this.photo = res.data.content.photos;
						console.log(this.photo);
					}
				});
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
		}
	}
</script>

<style scoped>
	.swiper {
		height: 200px;
	}

	.swiper image {
		width: 100%;
	}

	.text {
		background: #fff;
		padding: 5px 20px 20px 20px;
	}

	.name {
		margin-left: 20px;
		height: 30px;
		line-height: 40px;
		font-size: 17px;

	}
</style>
