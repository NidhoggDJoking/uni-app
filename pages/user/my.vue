<template>
	<view class="father">
		<view class="topbg">
			<view class="card"></view>
		</view>
		<view class="card">
			<image mode="aspectFill" :src="userInfo.avatarUrl" @click="head"></image>
			<text v-if="userInfo.nickName =='' ">登录后可查看更多</text>
			<text v-if="userInfo.nickName !='' " class="nick">{{userInfo.nickName}}</text>
			<!-- <button v-show="userInfo.nickName =='' " class="login" @getuserinfo="onGotUserInfo" open-type="getUserInfo">登录/注册</button> -->
			<button v-show="userInfo.nickName =='' " class="login" @getphonenumber="onGetPhoneNumber" open-type="getPhoneNumber">登录/注册</button>
		</view>
		<view class="foot">
			<view class="toolTitle">常用工具</view>
			
			<navigator :url="'/pages/user/order'">
				<view class="item">
						<text>订单</text>
						<view class="flow"></view>
				</view>
			</navigator>
			
			<navigator :url="'/pages/user/info'">
				<view class="item">
					<text>我的资料</text>
					<view class="flow"></view>
				</view>
			</navigator>

			<navigator :url="'/pages/user/traveler'">
				<view class="item">
					<text>常用出行人</text>
					<view class="flow"></view>
				</view>
			</navigator>

			<!-- <view class="item">
					<text>我的发票</text>
					<view class="flow"></view>
				</view> -->

			<!-- <navigator :url="'/pages/user/receiving'"> -->
			<view class="item" @click="selectAddress">
				<text>收货地址</text>
				<view class="flow"></view>
			</view>
			<!-- </navigator> -->

			<!-- <view class="item">
					<text>我的消息</text>
					<view class="flow"></view>
			</view> -->

			<navigator :url="'/pages/user/setting'">
				<view class="item">
					<text>设置</text>
					<view class="flow"></view>
				</view>
			</navigator>

		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			console.log(this.userInfo);
			var that = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					// console.log(res);
					that.userInfo.nickName = res.data.name;
					that.userInfo.avatarUrl = that.getSrc(res.data.profile)
				},
				fail() {
					that.userInfo = {
						nickName: '',
						avatarUrl: '',
					}
				}
			});
			// 页面加载获取code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// console.log(loginRes);
					that.code = loginRes.code;
					that.sessionKey();
				}
			});
		},
		data() {
			return {
				userInfo: {
					nickName: '',
					avatarUrl: '',
				},
				code: '',
				sessionKeyData: {},
				phoneNumber: '',
				voucher: ''
			}
		},
		methods: {
			// 获取微信用户基本信息
			onGotUserInfo(res) {
				// console.log(res);
				if (res.detail.errMsg == "getUserInfo:fail auth deny") return;
				var that = this;
				setTimeout(function() {
					that.userInfo = res.detail.userInfo
				}, 2000);
				uni.setStorage({
					key: 'userInfo',
					data: res.detail.userInfo,
					success: function() {
						uni.showLoading({
							title: '正在登录',
							duration: 2000
						});
						setTimeout(function() {
							uni.showToast({
								title: '登录成功',
								duration: 1500
							});
						}, 2000);
					}
				});
			},
			// 获取微信用户号码
			onGetPhoneNumber(e) {
				// console.log("onGetPhoneNumber", e.detail);
				this.getMobilePhone(e)
			},
			// 点击收货地址(微信支持的)
			selectAddress() {
				var that = this;
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
			},
			// 获取session_key
			sessionKey() {
				var that = this;
				this.httpRequest({
					url: '/etrip/api/app/security/wx/xcx?code=' + this.code,
					method: 'GET',
				}).then(res => {
					// console.log('sessionKey:', res.data.content);
					that.sessionKeyData = res.data.content
				});
			},
			// 解密手机号码&返回验证码
			getMobilePhone(e) {
				var data = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					session_key: this.sessionKeyData.sessionKey,
					openid: this.sessionKeyData.openid
				}
				console.log(data);
				this.httpRequest({
					url: '/etrip/api/app/security/mobilePhone',
					method: 'POST',
				}, data).then(res => {
					// console.log('getMobilePhone:', res);
					this.phoneNumber = JSON.parse(res.data.result).phoneNumber;
					this.voucher = res.data.voucher;
					console.log(this.phoneNumber);
					console.log(this.voucher);
					this.getLogin()
				});
			},
			// 登录
			getLogin() {
				let data = {
					'mobile': this.phoneNumber.toString(),
					'voucher': this.voucher.toString()
				};

				var that = this;
				uni.request({
					url: this.baseUrl + '/etrip/api/app/security/login',
					method: 'POST',
					data: {
						'mobile': this.phoneNumber.toString(),
						'voucher': this.voucher.toString()
					},
					success: (res) => {
						// console.log(res);
						that.userInfo.nickName = res.data.content.name;
						that.userInfo.avatarUrl = that.getSrc(res.data.content.profile)
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						uni.setStorage({
							key: 'userInfo',
							data: res.data.content,
							success: function() {
								console.log('success');
							}
						});
						// console.log(res.header.Authorization);
						uni.setStorage({
							key: 'token',
							data: res.header.Authorization,
							success: function() {
								console.log('success');
							}
						});
					}
				});
			},
			// 授权设置
			setting() {
				uni.openSetting({
					success(res) {}
				});
			},
			// 头像
			head(){
				uni.navigateTo({
					url: './head'
				});
			}
		}
	}
</script>

<style>
	.father {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #f7f8fa;
	}

	.topbg {
		width: 100%;
		height: 220px;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceTop.png") 0 0/100% no-repeat #f7f8fa;
	}

	.card {
		background: #fff;
		border-radius: 5px;
		height: 120px;
		width: 94.7%;
		margin: 0 2.65%;
		top: 6rem;
		position: absolute;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceInfoTop.png") 0 0/100% no-repeat #FFFFFF;
	}

	.login {
		width: 50%;
		font-size: 0.7rem;
		border-radius: 40px;
		display: block;
		color: #fff;
		height: 28px;
		background: #f8673b;
		text-align: center;
		border: 0;
		margin: 0 auto;
	}

	.card>image {
		width: 3.8rem;
		height: 3.8rem;
		border-radius: 50%;
		background: center/cover no-repeat #fd6a4e;
		background-size: 100%;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0.05333rem 0.5rem rgba(255, 255, 255, 0.68);
	}

	.card>text {
		margin-top: 2.3rem;
		margin-bottom: 0.7rem;
		text-align: center;
		font-size: 0.7rem;
		color: #000;
		display: block;
	}

	.card>.nick {
		margin-top: 50px;
		text-align: center;
		font-size: 15px;
		display: block;
		font-weight: 700;
		color: #666;
		letter-spacing: 1px;
	}

	.foot {
		background: #fff;
		border-radius: 8px;
		padding-bottom: 40px;
		width: 94.7%;
		margin: 10px 2.65%;
	}

	.toolTitle {
		width: 170px;
		height: 13px;
		padding-top: 13px;
		margin: auto auto 20px;
		font-size: 16px;
		color: #333;
		font-family: PingFang-SC-Bold;
		font-weight: 700;
		text-align: center;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceTools.png") 0 100%/100% no-repeat;
		line-height: 15px;

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

	.flow {
		float: right;
		width: 15px;
		height: 15px;
		margin-right: 10px;
		margin-top: 15px;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceRight.png") 0 0/100% no-repeat;
	}
</style>
