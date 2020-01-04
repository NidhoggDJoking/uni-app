<template>
	<view>
		<view class="page-section swiper">
			<image :src="getImgUrl(dataList)" />
		</view>
		<text class="name">{{dataList.name}}</text>
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
				id: ',',
				dataList: [],
			}
		},
		methods: {
			getData() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/funs/' + this.id;
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

<style scoped>
	.swiper image {
		width: 100%;
	}

	.text {
		background: #fff;
		padding: 20px;
	}

	.name {
		margin-left: 20px;
		height: 30px;
		line-height: 40px;
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}
</style>
