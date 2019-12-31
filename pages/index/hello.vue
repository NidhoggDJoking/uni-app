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
		<text class="h3">当季热门</text>
		<view class="grid">
			<view v-for="(item,index) in dataList" :key="index">
				<image :src="getImgUrl(item)" />
				<view class="scenicwrap"><text>{{item.title}}</text></view>
			</view>
		</view>
		<view class="itemlist">
			<view class="item" v-for="(item,index) in itemList" :key="index" @click="godetails(item.id)">
				<view class="item-left">
					<image :src="getImgUrl(item)"></image>
				</view>
				<view class="item-rigt">
					<text class="one">{{item.name}}</text>
					<text class="two">{{item.sellPoint}}</text>
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
				    url: 'http://yxx.h-etrip.com:9092/etrip/api/app/page/block?code=mobile-area-spot-top-swiper',
				    success: (res) => {
				        this.dataList = res.data.content.content.slice(0,4);
				    }
				});
				uni.request({
				    url: 'http://yxx.h-etrip.com:9092/etrip/api/app/et/spot?areaIds=2220&pageNo=0&pageSize=50',
				    success: (res) => {
				        this.itemList = res.data.content.content;
				    }
				});
			},
			getImgUrl(data) {
			     return this.getSrc(data);
			},
			godetails(id){
				var url = '../details/scenic?id=' + id ;
				uni.redirectTo({
				    url: url
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.swiper{
		height: 200px;
	}
	.swiper image{
		width: 100%;
	}
	.h3{
		font-size: 19px;
		font-weight: 600;
		color: #666;
		display: block;
		margin: 15px 0 15px 12px;
	}
	.grid{
		width: calc(100% - 20px);
		padding: 0 10px;
		display: flex;
		justify-content:space-around;
		margin-top: 14px;
		border-bottom: 5px solid #f7f8fa;
		flex-wrap: wrap;
	
	}
	.grid > view{
		width: 47.5%;
		height: 108px;
		margin-bottom: 10px;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			border-radius:7px;
		}
		.scenicwrap{
			position: absolute;
			bottom: 0;
			width: 100%;
			border-radius:0 0 7px 7px;
			line-height: 23px;
			color: #fff;
			background: rgba(0, 0, 0, 0.6);
			text{
				font-size: 13px;
				margin-left: 5px;
			}
		}
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
				}
			}
		}
	}
</style>
