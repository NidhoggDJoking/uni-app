<template>
	<view class="tickets-order">
		<view class="foot">
			<view class="item">
				<text>门票时间</text>
				<view class="flow"></view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="right uni-input">{{date}}</view>
				</picker>
			</view>
			<view class="item">
				<text>购买数量</text>
				<view class="flow"></view>
				<uni-number-box @change="bindChange" class="add" :min="1" :max="ticket[0].ticketInst.length"></uni-number-box>
			</view>
		</view>
		<text class="h3">取票人信息</text>
		<view class="login-card">
			<text>姓名：</text>
			<input v-model="name" placeholder="请输入姓名" type="text" maxlength="10" />
		</view>
		<view class="login-card">
			<text>手机号：</text>
			<input v-model="phone" placeholder="请输入手机号" type="number" maxlength="11" />
		</view>
		<view class="login-card">
			<text>身份证号：</text>
			<input v-model="idcard" placeholder="请输入身份证号" type="number" maxlength="18" />
		</view>
		<view class="foodCard">
			<button class="submission" @click="submission">确认订单</button>
			<text class="money"> 合计:<text class="red">￥{{value * ticket[0].ticketDef.price/100}}</text></text>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		onLoad(option) {
			this.id = option.id;
			this.getDetail();
		},
		components: {
			uniNumberBox,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userInfo: {},
				token: '',
				result: {},
				date: currentDate,
				value: 0,
				id: '',
				photo: "",
				spot: "",
				ticket: [],
				name: '',
				phone: '',
				idcard: '',
				payment: {}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value;
				console.log(e);
			},
			getDetail() {
				let opts = {
					url: '/etrip/api/app/et/spot/inst/' + this.id,
					method: 'get'
				};
				this.httpRequest(opts).then((res) => {
					this.photo = res.data.content.photo;
					this.spot = res.data.content.spot;
					this.ticket = res.data.content.ticket;
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindChange(value) {
				this.value = value
			},
			getInstId() {
				let num = this.value - 1;
				return this.ticket[0].ticketInst[num].id;
			},
			submission() {
				var that = this;
				if (!this.name || !this.phone || !this.idcard) {
					uni.showToast({
						icon: 'none',
						title: '请将取票人信息填写完整',
						duration: 1500
					});
					return;
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
				console.log(this.name, this.phone, this.idcard);
				console.log(this.date);
				console.log(this.value);
				console.log(this.id);
			},
			prePay() {
				var that = this;
				this.result.payType = "wechat";
				this.result.tradeType = "JSAPI";
				this.result.clientIp = '175.0.185.198';
				this.result.memberId = this.userInfo.id;
				this.result.contactPerson = this.name;
				this.result.contactMobile = this.phone;
				this.result.contactAddress = null;
				this.result.supplierId = this.spot.supplierId;
				this.result.supplierName = this.spot.supplierName;
				this.result.shopId = this.ticket[0].ticketInst[0].spotId;
				this.result.shopName = this.ticket[0].ticketDef.spotName;
				this.result.productId = this.ticket[0].ticketDef.id;
				this.result.productName = this.ticket[0].ticketDef.name;
				this.result.shippingType = 0;
				this.result.amount = this.value;
				this.result.checkInDate = this.date + " 00:00:01";
				this.result.checkOutDate = this.date + " 23:59:59";
				this.result.customerRemark = "";
				this.result.price = this.value * this.ticket[0].ticketDef.price;
				this.result.invoice = null;
				this.result.customerInfo = [{
					idNo: that.userInfo.idNo,
					name: that.userInfo.name,
					mobile: that.userInfo.mobile
				}];
				this.result.productInstId = this.getInstId();
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
							url: that.baseUrl + '/etrip/api/app/et/spot/order/appointment1',
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
		}
	}
</script>

<style scoped lang="less">
	.h3 {
		width: 89%;
		display: block;
		margin-left: 5.5%;
		margin-top: 20px;
		padding-bottom: 10px;
		font-size: 17px;
		font-weight: 700;
		border-bottom: 2px solid rgb(240, 240, 240);
	}

	.foot {
		background: #fff;
		border-radius: 8px;
		width: 94.7%;
		margin: 10px 2.65%;
	}

	.item {
		height: 45px;
		width: 100%;
		border-bottom: 1px solid rgb(240, 240, 240);

	}

	.item>text {
		line-height: 45px;
		float: left;
		font-size: 15px;
		font-family: PingFang-SC-Medium;
		color: #333;
		margin-left: 10px;
	}

	.item .right {
		float: right;
		margin-left: 0px;
		margin-right: 15px;
		font-size: 13px;
		color: #666666;
		font-weight: 400;
	}

	.add {
		height: 45px;
		line-height: 45px;
		display: inline-block;
		margin-top: 4px;
		float: right;
		margin-top: 4px;
	}

	picker {
		line-height: 45px;
	}

	.flow {
		float: right;
		width: 15px;
		height: 15px;
		margin-right: 10px;
		margin-top: 15px;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceRight.png") 0 0/100% no-repeat;
		background-size: 15px 15px;
	}

	.login-card {
		margin: 0 auto;
		padding-top: 7px;
		padding-bottom: 7px;
		width: 89%;
		height: 35px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid rgb(240, 240, 240);

		text {
			width: 28%;
			height: 100%;
			font-size: 14px;
			line-height: 35px;
		}

		input {
			font-size: 13px;
			width: 60%;
		}

		button {
			border: 1px solid #f8673b;
			width: 72px;
			height: 27px;
			line-height: 25px;
			color: #f8673b;
			background: none;
			font-size: 12px;
			padding-left: 4px;
			padding-right: 4px;
			border-radius: 1px;
			position: static;
		}


	}

	.foodCard {
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
			margin-right: 16px;
			float: right;
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
</style>
