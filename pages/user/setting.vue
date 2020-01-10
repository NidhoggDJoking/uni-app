<template>
	<view class="content">
		<view class="item" @click="seting">
			<text>设置</text>
			<view class="flow"></view>
		</view>
		<view class="out">
			<button @click="out()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			out() {
				uni.removeStorage({
					key: 'userInfo',
					success: function(res) {
						console.log('success');
						uni.showToast({
							title: '退出成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: './my'
							});
						}, 2000);
					}
				});
			},
			seting(){
				uni.openSetting({
				  success(res) {
				    console.log(res.authSetting)
				  }
				});
			}
		}
	}
</script>

<style scoped>
	.out {
		position: fixed;
		bottom: 30px;
		width: 86%;
		margin-left: 7%;
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
		margin-left: 20px;
	}

	.flow {
		float: right;
		width: 15px;
		height: 15px;
		margin-right: 10px;
		margin-top: 15px;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceRight.png") 0 0/100% no-repeat;
	}

	button {
		color: #fff;
		background: #f8673b;
	}
</style>
