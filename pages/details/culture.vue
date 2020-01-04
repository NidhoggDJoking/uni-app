<template>
	<view>
		<view class="page-section swiper">
			<image :src="getImgUrl(dataList)" />
		</view>
		<view class="text" v-html="dataList.content"></view>
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
				id: ',',
				dataList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/article/cultures/' + this.id;
				uni.request({
					url: url,
					success: (res) => {
						this.dataList = res.data.content;
					}
				});
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
		}
	}
</script>

<style>
	.swiper image {
		width: 100%;
	}

	.text {
		background: #fff;
		padding: 20px;
	}
</style>
