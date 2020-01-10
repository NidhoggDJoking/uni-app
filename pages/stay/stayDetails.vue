<template>
	<view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in dataList.photo" :key="index">
						<image :src="getSrc(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<text class="name">{{dataList.hotel.name}}</text>
		<view class="address">
			<uni-icons style="display: block;" type="location-filled" size="15" color="#f8673b"></uni-icons>
			<text>{{dataList.hotel.address}}</text>
		</view>
		<view class="address">
			<uni-icons style="display: block;" type="star-filled" size="15" color="#f8673b"></uni-icons>
			<text>营业:{{dataList.hotel.workTime}}</text>
		</view>
		<view class="address">
			<uni-icons style="display: block;" type="phone-filled" size="15" color="#f8673b"></uni-icons>
			<text>电话:{{dataList.hotel.telephone}}</text>
		</view>
		<view class="money">
			<text class="red">￥{{dataList.hotel.price/100}}</text>起
		</view>
		<view class="hr"></view>
		<view class="home-content" v-for="(item,index) of dataList.roomType" :key="index">
			<view class="left-img">
				<image src="http://cdn.yxx.h-etrip.com/etrip/console/images/0?w=600"></image>
			</view>
			<view class="right-item">
				<view class="one">
					<text>{{item.name}}</text>
					<text class="line">门市价: ￥{{item.oldPrice/100}}</text>
				</view>
				<view class="two">
					<text>{{item.outline?item.outline:25}}㎡</text>
					<text class="red">￥{{item.price/100}}</text>
				</view>
				<view class="three">
					<button v-if="item.roomInst.length > 0" @click="goOrder(index)">预定</button>
					<button v-if="item.roomInst.length <= 0" class="noRoom">已满</button>
				</view>
			</view>
		</view>
		<view class="room-bottom">
			<text class="des-title">房屋详情</text>
			<text>{{dataList.hotel.description}}</text>
		</view>
		<view class="room-bottom">
			<text class="des-title">设备配套</text>
			<text>{{dataList.hotel.server || '设备齐全' }}</text>
		</view>
		<view class="room-bottom">
			<text class="des-title">入住须知</text>
			<text>{{dataList.hotel.notice || '暂无'}}</text>
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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			getData() {
				this.httpRequest({
					url: '/etrip/api/app/et/hotels/date/inst/' + this.id,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content;
				});
			},
			goOrder(index){
				// console.log(this.dataList.roomType[index].id);
				// console.log(index);
				var url = './stayOrder?hotel=' + this.id + '&room=' + this.dataList.roomType[index].id;
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
	.name {
		margin-left: 20px;
		height: 30px;
		line-height: 40px;
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}
	.address {
		display: flex;
		align-items: center;
		margin: 5px 15px;
	}

	.address>text {
		margin: 4px 0 0 3px;
		font-size: 14px;
		color: #717171;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.money {
		margin: 10px 0 10px 20px;
		font-size: 14px;
		color: #717171;
	}
	.hr {
		width: 100%;
		height: 4px;
		background: #f8f9fa;
	}
	.red {
		color: red;
		margin-right: 3px;
	}
	.home-content {
		width: calc(100% - 30px);
		padding: 5px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 105px;
		border-bottom: 4px solid #f8f9fa;
		.left-img {
			width: 40%;
			height: 90%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.right-item {
			margin-top: 5px;
			width: 55%;
			height: 90%;
			color: #666;
			font-size: 13px;

			.one {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.line {
					text-decoration: line-through;
				}
			}

			.two {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 16px 0;
				font-size: 13px;
			}

			.three {
				button {
					width: 55px;
					height: 22px;
					color: #fff;
					border-radius: 20px;
					padding: 0px 10px;
					background: #f8673b;
					font-size: 12px;
					line-height: 22px;
					display: inline-block;
					float: right;
				}

				.noRoom {
					background: linear-gradient(270deg, #a8a8a8 0, #d4d4d4 100%);
				}
			}
		}
	}

	.room-bottom {
		padding: 10px 20px 10px 20px;
		border-bottom: 4px solid #f8f9fa;
		;

		text {
			font-size: 13px;
			color: #222222;
		}

		.des-title {
			display: block;
			font-size: 17px;
			font-weight: 600;
			height: 35px;
			line-height: 30px;
		}
	}
</style>
