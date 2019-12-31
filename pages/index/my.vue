<template>
	<view class="father">
		<view class="topbg">
			<view class="card"></view>
		</view>
		<view class="card">
			<image></image>
			<text>登录后可查看更多</text>
			<button class="login">登录/注册</button>
		</view>
		<view class="foot">
			<view class="toolTitle">常用工具</view>
			<view class="item">
				<text>我的资料</text>
				<view class="flow"></view>
			</view>
			<view class="item">
				<text>常用出行人</text>
				<view class="flow"></view>
			</view>
			<view class="item">
				<text>我的发票</text>
				<view class="flow"></view>
			</view>
			<view class="item">
				<text>收货地址</text>
				<view class="flow"></view>
			</view>
			<view class="item">
				<text>我的消息</text>
				<view class="flow"></view>
			</view>
			<view class="item">
				<text>设置</text>
				<view class="flow"></view>
			</view>
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
			
		}
	}
</script>

<style>
	.father{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #f7f8fa;
	}
	.topbg{
		width: 100%;
		height: 200px;
		background:url("http://yxx.h-etrip.com/app/assets/img/faceTop.png") 0 0/100% no-repeat #f7f8fa;
	}
	.card{
		background: #fff;
		border-radius: 5px;
		height: 120px;
		width: 94.7%;
		margin: 0 2.65%;
		top: 5rem;
		position: absolute;
	}
	.login{
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
	.card > image{
	    width: 3.5rem;
	    height: 3.5rem;
	    border-radius: 50%;
	    background: center/cover no-repeat #e7e7e7;
	    background-size: 100%;
	    position: absolute;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    box-shadow: 0 0 0.05333rem 0.5rem #ffffffad;
	}
	.card > text{
		margin-top: 2.3rem;
		margin-bottom: 0.7rem;
		text-align: center;
		font-size: 0.7rem;
		color: #000;
		display: block;
	}
	.foot{
		background: #fff;
		border-radius: 5px;
		height: 340px;
		width: 94.7%;
		margin: 10px 2.65%;
	}
	.toolTitle{
		width: 158px;
		height: 13px;
		margin: auto auto 10px;
		font-size: 15px;
		color: #333;
		font-family: PingFang-SC-Bold;
		font-weight: 700;
		text-align: center;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceTools.png") 0 100%/100% no-repeat;
	}
	.item{
		height: 45px;
		width: 100%;
		border-bottom: 1px solid #e6e6e6;
	}
	.item > text{
		line-height: 45px;
		float: left;
		font-size: 12px;
		font-family: PingFang-SC-Medium;
		color: #333;
		margin-left: 10px;
	}
	.flow{
		float: right;
		width: 15px;
		height: 15px;
		margin-right: 10px;
		margin-top: 15px;
		background: url("http://yxx.h-etrip.com/app/assets/img/faceRight.png") 0 0/100% no-repeat;
	}
</style>
