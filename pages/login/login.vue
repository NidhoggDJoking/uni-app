<template>
	<view class="bg">
		<view class="card">
			<view class="login-card">
				<text>手机号：</text>
				<input v-model="number" placeholder="请输入手机号" type="number" />
			</view>
			<view class="login-card">
				<text>验证码：</text>
				<input v-model="password" placeholder="请输入验证码" type="number" />
				<button v-show="state" @click="setSms()">获取验证码</button>
				<button v-show="!state" class="verification">{{timeOut}}</button>
			</view>
			<button class="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var that = this;
			// 获取code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					that.code = loginRes.code;
					that.getAccessToken()
				}
			});
		},
		data() {
			return {
				number: '15773594340',
				password: '',
				code: '',
				state: true,
				timeOut: 60
			}
		},
		methods: {
			setSms() {
				if (!this.number) return;
				this.password = "";
				this.state = false;
				this.setTimeOut();
			},
			// 获取token
			getAccessToken() {
				console.log(this.code);
				this.httpRequest({
					url: '/etrip/api/app/security/wx/web/access/token?code=' + this.code,
					method: 'GET',
				}).then(res => {
					console.log(res);
					if (res.data.success) {
						let codedata = {
							mobile: this.name,
							thirdOpenId: res.data.content.thirdOpenId,
							accessToken: res.data.content.accessToken
						};
						console.log(codedata);
					}
				});
			},
			// 倒计时
			setTimeOut() {
				let timer = setTimeout(() => {
					this.setTimeOut();
					if (this.timeOut > 0) {
						this.timeOut--;
					}
				}, 1000);
				if (this.timeOut <= 0) {
					this.timeOut = 60;
					this.state = true;
					clearTimeout(timer);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('http://yxx.h-etrip.com/app/assets/img/LoginBgI.png') 0 0 / cover no-repeat;
		;
	}

	.card {
		width: 88%;
		height: 200px;
		margin: 100px auto 10px;
		border-radius: 8px;
		background: #fff;

		.login-card {
			margin: 0 auto;
			padding-top: 17px;
			width: 88%;
			height: 35px;
			display: flex;
			justify-content: flex-start;
			align-items: center;

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

			.verification {
				color: #828282;
				border: 1px solid #828282;
			}
		}

		.login-card:nth-child(2) {
			padding-top: 17px;
			padding-bottom: 10px;
			border-bottom: 1px solid #ebedf0;

			input {
				width: 35%;
			}
		}
	}

	.login {
		margin-top: 20px;
		width: 85%;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		color: #fff;
		background: linear-gradient(to right, rgb(253, 128, 39), rgb(255, 40, 40));
	}
</style>
