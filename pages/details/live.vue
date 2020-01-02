<template>
	<view>
		<view class="page-section swiper">
		       <video :src="videoSrc" />
		</view>
		<view class="text" v-html="dataList.outline"></view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
	    data() {
	        return {
				id:'',
				dataList:[],
				videoSrc:'',
				videoUrl:'http://cdn.yxx.h-etrip.com/etrip/console/files/'
	        }
	    },
		methods:{
			getData(){
				let url = 'https://m.h-etrip.com/etrip/api/app/et/spot/videos/' + this.id;
				uni.request({
				    url: url,
				    success: (res) => {
				        this.dataList = res.data.content;
						this.videoSrc = this.videoUrl+res.data.content.file.id
				    }
				});
			},
			getImgUrl(data) {
			     return this.getSrc(data);
			},
		}
	}
</script>

<style>
	video{
		width: 100%;
	}
	.text{
		background: #fff;
		padding: 20px;
	}
</style>
