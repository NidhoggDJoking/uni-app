<template>
	<view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in photo" :key="index">
						<image :src="getSrc(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="top">
			<text class="title">{{dataList.name}}</text>
			<view class="flex">
				<uni-icons type="location-filled" size="18" color="#f2826a"></uni-icons>
				<text class="address">{{dataList.address}}</text>
			</view>
		</view>
		<!-- <text class="name">{{dataList.name}} :</text> -->
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
				id: '',
				dataList: [],
				photo: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				this.httpRequest({
					url: '/etrip/api/app/et/restaurants/' + this.id,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content;
				});
				
				this.httpRequest({
					url: '/etrip/api/app/album/files?targetId=' + this.id + '&targetType=Restaurant&type=0',
					method: 'GET',
				}).then(res => {
					this.photo = res.data.content;
				});

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
		border-top: 4px solid #ececec;
		margin-top: 65px;
		background: #fff;
		padding: 15px 20px 20px 20px
	}
	.name {
		margin-left: 20px;
		height: 30px;
		line-height: 40px;
		font-size: 17px;
	}
	.top {
		
		position: absolute;
		top:180px;
		width:100%;
		background: #fff;
		border-radius:15px 15px 0 0;
	}
	.title{
		padding-left: 20px;
		height: 50px;
		line-height: 50px;
		font-size: 17px;
		font-weight: 600;
		display: block;
	}
	.flex{
		padding-left: 17px;
		display: flex;
		align-items: center;
	
	}
	.address{
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
</style>
