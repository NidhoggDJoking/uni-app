<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="http://yxx.h-etrip.com/app/destination/delicious/2220"></web-view>
    </view>
</template>

<script>
    export default {
		mounted() {
			uni.showLoading({
			    title: '加载中'
			});
			setTimeout(function () {
			    uni.hideLoading();
			}, 5000);
		},
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		onLoad() {
	
		},
		onReady(){
		},
    }
</script>

<style>

</style>
