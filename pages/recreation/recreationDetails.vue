<template>
	<view>
		<view class="page-section swiper">
			<image :src="getImgUrl(dataList)" />
		</view>
		<text class="name">{{dataList.name}}</text>
		<view class="address">
			<uni-icons style="display: block;" type="location-filled" size="15" color="#f8673b"></uni-icons>
			<text>{{dataList.address}}</text>
		</view>
		<view class="address">
			<uni-icons style="display: block;" type="star-filled" size="15" color="#f8673b"></uni-icons>
			<text>营业:{{dataList.workTime}}</text>
		</view>
		<view class="money">
			<text class="red">￥{{dataList.averagePrice/100}}</text>人均
		</view>
		<view class="text" v-html="dataList.description"></view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniIcons},
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
	.address{
		display: flex;
		align-items: center;
		margin: 5px 20px;
		/* justify-content: center; */
	}
	.address>text{
		margin: 2px 0 0 2px;
		font-size: 14px;
		color: #717171;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.money{
		margin:10px 0 0 20px;
		font-size: 14px;
		color: #717171;
	}
	.red{
		color: red;
		margin-right: 3px;
	}
</style>
