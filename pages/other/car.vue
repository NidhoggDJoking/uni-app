<template>
	<view>
		<view class="uni-padding-wrap">
		    <view class="page-section swiper">
		            <view class="page-section-spacing">
		                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
		                        <swiper-item v-for="(item,index) in dataList" :key="index">
		                            <image :src="getImgUrl(item)" />
								</swiper-item>
						</swiper>
					</view>
			</view>	
		</view>
		<text class="h3">推荐车辆</text>

		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getImgUrl(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.name}}</text>
					<text class="two">{{item.outline}}</text>
				</view>
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
				dataList:[],
				itemList:[],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getDate(){
				uni.request({
				    url: 'https://m.h-etrip.com/etrip/api/app/page/block?code=moblie.area.rent-car.top-swiper',
				    success: (res) => {
				        this.dataList = res.data.content.content;
				    }
				});
				uni.request({
				    url: 'https://m.h-etrip.com/etrip/api/app/et/rents?pageNo=0&pageSize=20&areaIds=2220',
				    success: (res) => {
				        this.itemList = res.data.content.content;
				    }
				});
			},
			getImgUrl(data) {
			     return this.getSrc(data);
			},
			godetails(id){
				var url = '../details/car?id=' + id ;
				uni.redirectTo({
				    url: url
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.swiper{
		height: 250px;
	}
	.swiper image{
		width: 100%;
		height: 100%;
	}
	.h3{
		font-size: 19px;
		font-weight: 600;
		color: #666;
		display: block;
		margin: 15px 0 0px 12px;
	}
	.itemlist{
		margin-top: 10px;
		.item{
			display: flex;
			padding: 10px;
			justify-content:space-around;
			.item-left{
				width: 43%;
				image{
					width: 100%;
					height: 100px;
					border-radius: 5px;
				}
			}
			.item-rigt{
				width: 50%;
				.one{
					font-size: 15px;
					display: block;
				}
				.two{
					font-size: 12px;
					color: #666;
					display: block;
					margin: 10px 0 10px 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
