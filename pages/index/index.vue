<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		// 页面生命周期
		onLoad() {
			console.log('监听页面加载，其参数为上个页面传递的数据，参数类型为Object(用于页面传参)');
		},
		onShow(){
			console.log('监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面');
			this.getDate();
		},
		onReady(){
			console.log('监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发');
		},
		onHide(){
			console.log('监听页面隐藏');
		},
		onUnload(){
			console.log('监听页面卸载');
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			getDate(){
				uni.request({
				    url: 'http://yxx.h-etrip.com:9092/etrip/api/app/page/block?code=mobile.index.top-swiper',
				    success: (res) => {
				        console.log(res.data);
				        this.title = 'request success';
				    }
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
