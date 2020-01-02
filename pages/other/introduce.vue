<template>
    <view>
		<image class="topimg" :src="img"></image>
		<view class="card">
			<text class="title">{{name}}</text>
			<text>
				{{title}}
			</text>
		</view>
		<view class="text" v-html="textData"></view>
    </view>
</template>

<script>
    export default {
		onShow(){
		},
		mounted() {
			this.getDate();
		},
        data() {
            return {
				textData:"",
				img:"",
				title:"",
				name:","
            }
        },
		methods: {
			getDate(){
				uni.request({
				    url: 'https://m.h-etrip.com/etrip/api/app/et/areas/2220',
				    success: (res) => {
				        this.textData = res.data.content.content;
						this.img = this.getImgUrl(res.data.content);
						this.title = res.data.content.summary;
						this.name = res.data.content.name;
				    }
				});
			},
			 getImgUrl(data) {
			      return this.getSrc(data);
			 },
		}
    }
</script>

<style scoped>
.topimg{
	width: 100%;
	height: 230px;
}
.card{
	width: 78%;
	background: #fff;
	box-shadow: 0 0 1rem 0rem #cdd4e4;
	border-radius: 0.6rem;
	margin: auto;
	position: relative;
	top: -2rem;
	padding: 1rem;
}
.title{
	text-align: center;
	font-weight: 600;
	font-size: 18px;
	display: block;
	margin-bottom: 10px;
}
.text{
	background: #fff;
	padding: 20px;
}
</style>
