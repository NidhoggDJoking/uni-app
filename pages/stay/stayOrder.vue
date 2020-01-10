<template>
	<view>
		<view class="top">
			<image :src="img"></image>
			<view class="details">
				<text>{{dataList.roomType[0].name}}</text>
				<text>{{dataList.roomType[0].outline}} ㎡</text>
				<text>可住{{dataList.roomType[0].peopleNum}}人</text>
			</view>
		</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'"
		 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<view class="foot">
			<view class="item" @click="onShowDatePicker('range')">
				<text>住宿时间</text>
				<view class="flow"></view>
				<view class="right">{{range[0]}} - {{range[1]}}</view>
			</view>
			<view class="item">
				<text>房间数</text>
				<view class="flow"></view>
				<uni-number-box @change="bindChange" class="add" :min="1" :max="10"></uni-number-box>
			</view>
			<view class="item" @click="bil">
				<text>发票</text>
				<view class="flow"></view>
				<view class="right">{{invoice}}</view>
			</view>
		</view>
		<text class="h3">入住人信息</text>
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
		<uni-popup ref="popuptwo" type="bottom">
			<view class="popcomtent">
				<view class="popitem" @click="bilType(1)">需要开票</view>
				<view class="popitem" @click="bilType(2)">不需要开票</view>
			</view>
		</uni-popup>
		<view class="food">
			<text class="money">合计:<text class="red">￥{{dataList.roomType[0].price/100 * num * time}}</text></text>
			<text class="num"></text>
			<button class="submission" @click="submission">确认订单</button>
		</view>
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniNumberBox,
			MxDatePicker,
			uniPopup
		},
		onLoad(option) {
			this.hotelId = option.hotel;
			this.roomId = option.room;
			this.getData();
			this.init();
		},
		data() {
			return {
				img: 'http://cdn.yxx.h-etrip.com/etrip/console/images/16603?w',
				hotelId: '',
				roomId: '',
				num: '',
				name: '',
				phone: '',
				idcard: '',
				showPicker: false,
				// date: '2019/01/01',
				// datetime: '2019/01/01 15:00:12',
				range: ['2019-01-01', '2019-01-02'],
				// rangetime: ['2019/01/01 14:00', '2019/01/02 13:59'],
				type: 'rangetime',
				value: '',
				time: 1, // 住宿天数
				invoice: "不需要开票",
				bli: {},
				dataList: {},
				userInfo: {},
				token: '',
				clients: [],
				result: {}

			}
		},
		methods: {
			// 当前日期初始化
			init() {
				let date = new Date();
				this.range[0] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				let date2 = new Date(new Date().valueOf() + 1 * 24 * 60 * 60 * 1000);
				this.range[1] = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
			},
			getData() {
				console.log(this.hotelId, this.roomId);
				this.httpRequest({
					url: `/etrip/api/app/et/hotels/inst/${this.hotelId}?roomDefId=${this.roomId}`,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content;
					this.img = this.getSrc(res.data.content.roomType[0]);
				});
			},
			submission() {
				var that = this;
				if (!this.name || !this.phone || !this.idcard) {
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整',
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
			},
			bindChange(value) {
				this.num = value
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
			setting() {
				uni.openSetting({
					success(res) {}
				});
			},
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					console.log(e.date);
					console.log((e.date[1] - e.date[0]) / 86400000);
					this.time = (e.date[1] - e.date[0]) / 86400000 || 1;

				}
			},
			prePay() {
				var that = this;
				var clients = [{
					idNo: that.idcard,
					name: that.name,
					mobile: that.phone
				}];
				this.result.clientIp = '175.0.185.198';
				this.result.tradeType = "JSAPI";
				this.result.payType = "wechat";
				this.result.memberId = this.userInfo.id;
				this.result.contactPerson = this.userInfo.name;
				this.result.contactMobile = this.userInfo.mobile;
				this.result.contactAddress = null;
				this.result.supplierId = this.dataList.roomType[0].roomInst[0].supplierId;
				this.result.supplierName = this.dataList.roomType[0].roomInst[0].supplierName;
				this.result.customerInfo = this.clients;
				this.result.shopId = this.dataList.roomType[0].roomInst[0].hotelId;
				this.result.shopName = this.dataList.roomType[0].roomInst[0].hotelName;
				this.result.productId = this.dataList.roomType[0].roomInst[0].roomDefId;
				this.result.productInstId = this.dataList.roomType[0].roomInst[0].id;
				this.result.productName = this.dataList.roomType[0].name;
				this.result.cover = this.dataList.roomType[0].cover;
				this.result.checkInDate = this.range[0] + " 00:00:01";
				this.result.checkOutDate = this.range[1] + " 00:00:01";
				this.result.shippingType = 0;
				this.result.price = this.dataList.roomType[0].price * this.num * this.time;
				this.result.amount = this.num;
				this.result.customerRemark = "";
				this.result.invoice = null;
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
							url: that.baseUrl + '/etrip/api/app/et/hotels/order/appointment1',
							method: 'POST',
							data: that.result,
							header: {
								'Authorization': that.token, //自定义请求头信息
							},
							success: (res) => {
								console.log(res);
								that.payment = res.data.content;
								console.log(that.payment);
								uni.requestPayment({
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
							},
							fail(err) {
								console.log(err);
							}
						});
					}
				});
			},
		},
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
		margin-top: 12px;
		margin-right: 15px;
		font-size: 13px;
		color: #666666;
		font-weight: 400;
	}

	.add {
		// height: 45px;
		// line-height: 45px;
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
