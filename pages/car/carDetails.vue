<template>
	<view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in photo" :key="index">
						<image :src="getImgUrl(item)"/>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<text class="name">{{dataList.name}} :</text>
		<view class="table">
			<text>{{dataList.variableBox}} - {{dataList.personCount}}座</text>
			<text>{{dataList.rentName}}</text>
		</view>
		<view class="table2">
			<text class="money"><text class="red">￥{{dataList.price/100}}</text>起/天</text>
			<view class="telphone">
				<uni-icons style="display: block;" type="phone-filled" size="12" color="#f8673b"></uni-icons>
				<text class="phone">{{phone}}</text>
			</view>
		</view>
		<view class="text" v-html="dataList.description"></view>
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
				dataList: {},
				photo: [],
				phone:"",
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/rents/' + this.id;
				let url2 = 'https://m.h-etrip.com/etrip/api/app/et/rents/product/' + this.id;
				uni.request({
					url: url,
					success: (res) => {
						this.dataList = res.data.content;
						this.spot = res.data.content.spot;
						this.photo = res.data.content.photos;
						console.log(this.photo);
					}
				});
				uni.request({
					url: url2,
					success: (res) => {
						console.log(res.data);
						this.phone = res.data.telephone;
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
		height: 100%;
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
		font-weight: 600;
	}
	.table{
		padding: 0 20px;
		display: flex;
		font-size: 15px;
		color: #333333;
		align-items: center;
		justify-content: space-between;
	}
	.table2{
		padding: 0 20px;
		display: flex;
		font-size: 15px;
		color: #333333;
		align-items: center;
		justify-content: space-between;
	}
	.telphone{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.phone{
		margin-left: 4px;
		font-size: 12px;
		margin-top: 5px;
	}
	.money{
		display: flex;
		justify-content: space-between;
		margin: 18px 0 12px 0;
		font-size: 14px;
		color: #222222;
	}
	.red{
		font-weight: 600;
		color: red;
		margin-right: 3px;
	}
</style>
