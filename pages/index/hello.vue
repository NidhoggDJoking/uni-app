<template>
	<view>
		<view class="uni-padding-wrap">
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
		                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-red">A</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-green">B</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-blue">C</view>
		                        </swiper-item>
		                    </swiper>
		                </view>
		            </view>
		        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				            indicatorDots: true,
				            autoplay: true,
				            interval: 2000,
				            duration: 500
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.swiper{
		height: 200px;
	}
</style>
