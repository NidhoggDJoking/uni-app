<template>
	<view>
		<image class="topimg" :src="img"></image>
		<view class="card">
			<text class="name">{{dataList.name}}</text>
			<text class="money">￥ {{dataList.price/100}}</text>
		</view>
		<view class="details">
			<view class="item">
				<view class="left">品牌</view>
				<view class="rig">{{dataList.ext.brand}}</view>
			</view>
			<view class="item">
				<view class="left">分类</view>
				<view class="rig">{{dataList.ext.type}}</view>
			</view>
			<view class="item">
				<view class="left">商品名称</view>
				<view class="rig">{{dataList.name}}</view>
			</view>
			<view class="item">
				<view class="left">规格</view>
				<view class="rig">{{dataList.specifications}}</view>
			</view>
			<view class="item">
				<view class="left">产地</view>
				<view class="rig">{{dataList.ext.place}}</view>
			</view>
			<view class="item">
				<view class="left">成份</view>
				<view class="rig">{{dataList.ext.ingredients}}</view>
			</view>
			<view class="item">
				<view class="left">保质期</view>
				<view class="rig">{{dataList.ext.quality}}</view>
			</view>
			<view class="item">
				<view class="left">储存方法</view>
				<view class="rig">{{dataList.ext.storage}}</view>
			</view>
			<view class="item">
				<view class="left">质检书编号</view>
				<view class="rig">{{dataList.ext.certificateNumber}}</view>
			</view>
			<view class="item">
				<view class="left">物流</view>
				<view class="rig">{{dataList.ext.logistics}}</view>
			</view>
			<view class="item">
				<view class="left">客服电话</view>
				<view class="rig">{{dataList.ext.customerPhone}}</view>
			</view>
		</view>
		<view class="text" v-html="dataList.description"></view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id;
			this.getDate();
		},
		data() {
			return {
				dataList: {},
				img: '',
			}
		},
		methods: {
			getDate() {
				let url = 'https://m.h-etrip.com/etrip/api/app/et/specialties/product/' + this.id;
				uni.request({
					url: url,
					success: (res) => {
						this.dataList = res.data.content;
						this.img = this.getImgUrl(res.data.content);
					}
				});

			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
		}
	}
</script>

<style lang="less" scoped>
	.topimg {
		width: 100%;
		height: 230px;
		background: center/cover no-repeat #e7e7e7;
	}

	.card {
		width: 100%;
		height: 50px;
		position: relative;
		top: -20px;
		background: #fff;
		border-radius: 20px 20px 0 0;
		border-bottom: 5px solid #f7f8fa;

		.name {
			left: 15px;
			top: 15px;
			position: absolute;
			font-size: 16px;
			font-weight: 600;
			color: #333;
		}

		.money {
			right: 15px;
			top: 15px;
			position: absolute;
			color: red;

		}
	}

	.details {
		padding: 0 20px 10px 20px;

		.item {
			border-bottom: 1px solid #ebedf0;

			.left {
				display: inline-block;
				width: 50%;
				height: 35px;
				line-height: 35px;
				font-weight: 600;
				font-size: 13px;
			}

			.rig {
				display: inline-block;
				width: 50%;
				font-size: 13px;
			}
		}
	}

	.text {
		background: #fff;
		padding: 20px;
	}
</style>
