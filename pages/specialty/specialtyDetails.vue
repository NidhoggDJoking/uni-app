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
		<view class="foot">
			<button class="submission" @click="submission">选择</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="foot-card">
				<view class="popup-top">
					<image :src="img"></image>
					<view class="popupName">
						<text class="popName">{{dataList.name}}</text>
						<text class="price">￥{{dataList.price/100}}</text>
						<text class="num">库存{{dataList.count}}包</text>
					</view>
					<text class="fork" @click="close">×</text>
				</view>
				<view class="pedometer">
					<text class="addNum">购买数量</text>
					<uni-number-box class="add" @change="bindChange" :min="1" :max="dataList.count"></uni-number-box>
				</view>
				<button class="order" @click="goOrder">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniPopup,
			uniNumberBox,
		},
		onLoad(option) {
			this.id = option.id;
			this.getDate();
		},
		data() {
			return {
				dataList: {},
				img: '',
				id: '',
				count: 1,
				value: 0,
			}
		},
		methods: {
			getDate() {
				this.httpRequest({
					url: '/etrip/api/app/et/specialties/product/' + this.id,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content;
					this.img = this.getSrc(res.data.content);			
				});

			},
			submission() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			bindChange(value){
				this.value = value
			},
			goOrder(){
				var url = './specialtyOrder?id=' + this.id + '&count=' + this.value;
				uni.navigateTo({
					url: url
				});
			}
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
			left: 20px;
			top: 15px;
			position: absolute;
			font-size: 16px;
			font-weight: 600;
			color: #333;
		}

		.money {
			right: 20px;
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

	.foot {
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 0;
		box-shadow: 0px -2px 3px 0px #eaeaea;
		background: #fff;
		.submission {
			display: block;
			float: right;
			background: #f8673b;
			border-radius: 0px;
			height: 100%;
			line-height: 50px;
			width: 150px;
			color: #fff;
		}
	}

	.foot-card {
		z-index: 100;
		width: 100%;
		height: 250px;
		background: #fff;
		.popup-top {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 16px 10px 5px 10px;
			height: 90px;
			border-bottom: 1px solid #ebedf0;
			image {
				width: 33%;
				height: 80px;
				border-radius: 7px;
			}
			.popupName {
				width: 60%;
				.popName {
					display: block;
					height: 35px;
					line-height: 25px;
					font-weight: 600;
					margin-top: 10px;
					font-size: 17px;
				}
				.price {
					color: red;
					font-size: 15px;
					font-weight: 500;
				}
				.num {
					font-size: 12px;
					color: #333333;
					margin-left: 15px;
				}
			}
			.fork {
				font-size: 19px;
				position: absolute;
				right: 10px;
				top: 10px;
				color: #505050;
			}
		}
		.pedometer{
			width: calc(100% - 40px);
			padding:20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.addNum{
				font-size: 14px;
				color: #333333;
			}
			.add{
			}
		}
		.order{
			width: 97%;
			height: 50px;
			color: #fff;
			background: linear-gradient(to right, rgb(253, 128, 39), rgb(255, 40, 40));
		}
	}
</style>
