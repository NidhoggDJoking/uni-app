<template>
	<view>
		<!-- <image src="http://yxx.h-etrip.com/app/assets/img/liveBgI.png" /> -->
		<image src="http://cdn.yxx.h-etrip.com/etrip/console/images/20611?w=600" />
		<text class="title">热门直播</text>
		<view class="list">
			<view class="card" v-for="(item,index) in dataList" :key="index" @click="godetails(item.id)">
				<image :src="getImgUrl(item)"></image>
				<text>{{item.title}}</text>
				<text class="details">{{item.description}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getData();
		},
		data() {
			return {
				dataList: [],
				areaCode:'2220',
			}
		},
		methods: {
			getData() {
				uni.request({
					url: 'https://m.h-etrip.com/etrip/api/app/et/spot/videos?pageNo=0&pageSize=99&sort=create_time%20desc',
					success: (res) => {
						let hot = res.data.content.content;
						hot.forEach(data=>{
							if (this.hasArea(data.areaIds)>-1){
								this.dataList.push(data)
							}
						})
					}
				});
			},
			// 判断areaCodes中是否包含了areaCoded调用此方法
			hasArea(areaCodes){
				return areaCodes.indexOf(this.areaCode);
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			godetails(id) {
				var url = './liveDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	image {
		width: 100%;
		height: 185px;
	}

	.title {
		display: block;
		margin: 10px 15px 0 15px;
		font-weight: 700;
		color: #4C4C4C;
	}

	.list {
		padding: 15px;
	}

	.card {
		width: 100%;
		margin-bottom: 18px;

		image {
			width: 100%;
			height: 145px;
			border-radius: 7px;
		}

		text {
			display: block;
			color: #666666;
			font-size: 14px;
			margin: 5px;
		}

		.details {
			font-size: 13px;
			color: #999999;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
