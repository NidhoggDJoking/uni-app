<template>
	<view>
		<view class="top">
			<image :src="img"></image>
			<view class="details">
				<text>{{dataList.name}}</text>
				<text>{{dataList.specialtyName}}</text>
				<text>￥{{dataList.price/100}}</text>
			</view>
		</view>
		<uni-transition :mode-class="['slide-left']" :show="distribution == '由商家发货'">
			<view class="address" v-show="distribution == '由商家发货'" @click="seletAddress">
				<text>{{address.userName}}</text>
				<text>{{address.provinceName}} - {{address.cityName}} - {{address.countyName}}</text>
				<text>{{address.detailInfo}}</text>
			</view>
		</uni-transition>
		<view class="middle">
			<view class="item" @click="receiving">
				<text>配送方式</text>
				<view class="flow"></view>
				<text class="right">{{distribution}}</text>
			</view>
			<view class="item" @click="bil">
				<text>发票</text>
				<view class="flow"></view>
				<text class="right">{{invoice}}</text>
			</view>
			<view class="item">
				<input v-model="mark" placeholder="备注"></input>
			</view>
		</view>
		<view class="food">
			<text class="money"> 合计:<text class="red">￥{{num * dataList.price/100}}</text></text>
			<text class="num"> 共计{{num}}件</text>
			<button class="submission" @click="submission">确认订单</button>
		</view>
		<uni-popup ref="popupone" type="bottom">
			<view class="popcomtent">
				<view class="popitem" @click="receivingType(1)">自提</view>
				<view class="popitem" @click="receivingType(2)">由商家发货</view>
			</view>
		</uni-popup>
		<uni-popup ref="popuptwo" type="bottom">
			<view class="popcomtent">
				<view class="popitem" @click="bilType(1)">需要开票</view>
				<view class="popitem" @click="bilType(2)">不需要开票</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	export default {
		components: {
			uniPopup,
			uniTransition
		},
		onLoad(option) {
			this.id = option.id;
			this.num = option.count || 0;
			this.getDate();
		},
		data() {
			return {
				id: '',
				num: 0,
				img: '',
				token: '',
				dataList: [],
				mark: '',
				payment: {},
				userInfo: {},
				invoice: "不需要开票",
				distribution: "选择配送方式",
				address: {
					userName: '姓名',
					provinceName: '省',
					cityName: '市',
					countyName: '区/县',
					detailInfo: '详情地址',
					telNumber: '158123456789'
				},
				bli: {},
				result: {}
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
			setting() {
				uni.openSetting({
					success(res) {}
				});
			},
			submission() {
				var that = this;
				if (this.distribution != "自提") {
					if (this.address.userName == '姓名') {
						uni.showToast({
							icon: 'none',
							title: '请选择收货地址',
							duration: 1500
						});
						return;
					}
				}
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						console.log(res);
						that.userInfo = res.data;
						that.prePay();
					},
					fail() {
						console.log('userInfo获取失败');
						uni.showModal({
							title: '用户信息获取失败',
							content: '请登录',
							success: function(res) {
								if (res.confirm) {
									uni.switchTab({
										url: '../user/my'
									});
								} else if (res.cancel) {
									console.log('userInfo获取失败->用户点击取消');
								}
							}
						});
					}
				});
				console.log(this.mark);
				if (this.distribution == "由商家发货") {
					console.log(this.address);
				}
				if (this.invoice == "需要开票") {
					console.log(this.bli);
				}
			},
			prePay() {
				var that = this;
				this.result.payType = "wechat";
				this.result.tradeType = "JSAPI";
				this.result.clientIp = '175.0.185.198';
				this.result.memberId = that.userInfo.id;
				this.result.contactPerson = this.address.userName;
				this.result.contactMobile = this.address.telNumber;
				this.result.contactAddress = this.address.provinceName + this.address.cityName + this.address.countyName + this.address
					.detailInfo
				this.result.shippingType = this.distribution == "自提" ? 0 : 1;
				this.result.shopId = this.dataList.specialtyId;
				this.result.shopName = this.dataList.name;
				this.result.productId = this.dataList.id;
				this.result.supplierId = this.dataList.supplierId;
				this.result.supplierName = this.dataList.supplierName;
				this.result.productInstId = 0;
				this.result.productName = this.dataList.name;
				this.result.cover = this.dataList.cover;
				this.result.price = this.dataList.price * this.num;
				this.result.amount = this.num;
				this.result.customerRemark = this.mark == "" ? " " : this.mark;
				this.result.customerInfo = [{
					idNo: that.userInfo.idNo,
					name: that.userInfo.name,
					mobile: that.userInfo.mobile
				}];
				if (this.invoice == "需要开票") {
					this.result.invoice = this.bli;
					this.result.invoice.remarks = null;
				} else {
					this.result.invoice = null;
				}
				console.log(this.result);
				this.weChatOrder();
			},
			weChatOrder() {
				var that = this;
				uni.getStorage({
					key: 'token',
					success: function(res) {
						console.log(res);
						that.token = res.data;
						uni.request({

							url: that.baseUrl + '/etrip/api/app/et/specialties/order/appointment1',
							method: 'POST',
							data: that.result,
							header: {
								'Authorization': that.token, //自定义请求头信息
							},
							success: (res) => {
								that.payment = res.data.content;
								console.log(that.payment);
								uni.requestPayment({
									// provider: 'wxpay',
									timeStamp: that.payment.timeStamp,
									nonceStr: that.payment.nonceStr,
									package: that.payment.package,
									signType: 'MD5',
									paySign: that.payment.paySign,
									success: function(res) {
										console.log('success:', res);
									},
									fail: function(err) {
										console.log('fail:', err);
									}
								});
							}
						});
					}
				});
			},
			receiving() {
				this.$refs.popupone.open()
			},
			seletAddress() {
				var that = this;
				uni.chooseAddress({
					success(res) {
						that.address = res;
					}
				})
			},
			receivingType(type) {
				var that = this;
				if (type == 1) {
					this.distribution = "自提";
				} else {
					this.distribution = "由商家发货";
					uni.chooseAddress({
						success(res) {
							that.address = res;
						},
						fail(err) {
							if (err.errMsg == 'chooseAddress:fail auth deny') {
								uni.showModal({
									title: "未获取权限",
									content: "请在设置面板里开启必要的权限",
									success: function(res) {
										if (res.confirm) {
											that.setting();
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							}
						}
					})
				}
				this.$refs.popupone.close()
			},
			bil() {
				this.$refs.popuptwo.open()
			},
			bilType(type) {
				var that = this;
				if (type == 1) {
					// this.invoice = "需要开票";
					uni.chooseInvoiceTitle({
						success(res) {
							that.bli = res;
							that.invoice = res.title;
							// console.log(res.type);
							// console.log(res.title);
							// console.log(res.taxNumber);
							// console.log(res.companyAddress);
							// console.log(res.telephone);
							// console.log(res.bankName);
							// console.log(res.bankAccount);
						},
						fail(err) {
							if (err.errMsg == 'chooseInvoiceTitle:fail auth deny') {
								uni.showModal({
									title: "未获取权限",
									content: "请在设置面板里开启必要的权限",
									success: function(res) {
										if (res.confirm) {
											that.setting();
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							}
						}
					})
				} else {
					this.invoice = "不需要开票";
				}
				this.$refs.popuptwo.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.top {
		width: calc(100% -20px);
		height: 85px;
		box-shadow: 0px 2px 3px 0px #f1f1f1;
		padding: 10px 10px 10px 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.details {
			width: 55%;

			text {
				display: block;
				color: #333333;
				font-size: 14px;
			}

			text:nth-child(1) {
				font-weight: 600;
				font-size: 17px;
				height: 30px;
				line-height: 25px;
			}

			text:nth-child(2) {
				color: #f98562;
				height: 20px;
				margin-left: 2px;
			}

			text:nth-child(3) {
				color: red;
				font-size: 13px;
				height: 30px;
				line-height: 30px;
				letter-spacing: 1px;
			}
		}

		image {
			width: 33%;
			height: 80px;
			border-radius: 7px;
		}
	}

	.address {
		width: 90%;
		margin: 10px auto;
		padding: 13px;
		box-shadow: 0px 1px 5px 0px #f1f1f1;

		text:nth-child(1) {
			display: block;
			font-size: 15px;
			height: 25px;
			line-height: 25px;
			font-weight: 600;
		}

		text:nth-child(2) {
			color: #333333;
			font-size: 13px;
			height: 20px;
			line-height: 20px;
			display: block;
		}

		text:nth-child(3) {
			color: #333333;
			display: block;
			font-size: 13px;
			height: 20px;
			line-height: 20px;
		}
	}

	.middle {
		width: 94.7%;
		margin: 10px 2.65%;

		.item {
			height: 45px;
			width: 100%;
			border-bottom: 1px solid rgb(240, 240, 240);

			input {
				margin-left: 10px;
				line-height: 45px;
				height: 45px;
				font-size: 13px;
				color: #717171;
			}

			text {
				line-height: 45px;
				float: left;
				font-size: 15px;
				color: #323233;
				margin-left: 10px;
			}

			.right {
				float: right;
				margin-left: 0px;
				margin-right: 15px;
				font-size: 13px;
				color: #666666;
				font-weight: 400;
			}

			.flow {
				float: right;
				width: 15px;
				height: 15px;
				margin-right: 5px;
				margin-top: 15px;
				background: url("http://yxx.h-etrip.com/app/assets/img/faceRight.png") 0 0/100% no-repeat;
				background-size: 15px 15px;
			}
		}

	}

	.food {
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 0;
		box-shadow: 0px -2px 3px 0px #eaeaea;
		background: #fff;

		.money {
			line-height: 50px;
			font-size: 14px;
			color: #484848;
			margin-left: 11px;
		}

		.num {
			line-height: 50px;
			font-size: 13px;
			color: #484848;
			margin-left: 20px;
		}

		.red {
			color: red;
			margin-left: 5px;
			font-size: 13px;
		}

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

	.popcomtent {
		width: 100%;
		background: #fff;

		.popitem {
			text-align: center;
			height: 45px;
			line-height: 44px;
			border-bottom: 1px solid rgb(240, 240, 240);
			font-size: 16px;
			color: #323233;
		}
	}
</style>
