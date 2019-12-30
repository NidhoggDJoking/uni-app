<template>
	<view class="content">
		<image class="headimg" src="http://cdn.yxx.h-etrip.com/etrip/console/images/9031?w=600"></image>
	<uni-grid :column="3" :show-border="false"  :square="false">
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	    <uni-grid-item>
	        <text class="text">文本</text>
	    </uni-grid-item>
	</uni-grid>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {uniGrid,uniGridItem},
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
			},
			goTo(){
				uni.navigateTo({
				    url: 'hello'
				});
			}
		}
	}
</script>

<style  scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.headimg{
		width: 100%;
		height: 225px;
	}

	
</style>
