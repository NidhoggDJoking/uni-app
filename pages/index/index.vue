<template>
	<view class="content">
		<view class="map">
			<image class="headimg" src="http://cdn.yxx.h-etrip.com/etrip/console/images/9031?w=600"></image>
			<text>怀化市</text>
		</view>
		<view class="grid">
			<navigator :url="'/pages/introduce/introduce'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav1.png"></image>
					<text>简介</text>
				</view>
			</navigator>
			<view @click="goScenic">
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav2.png"></image>
				<text>景点</text>
			</view>
			<navigator :url="'/pages/food/food'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav3.png"></image>
					<text>美食</text>
				</view>
			</navigator>
			<navigator :url="'/pages/stay/stay'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav4.png"></image>
					<text>住宿</text>
				</view>
			</navigator>
			<navigator :url="'/pages/recreation/recreation'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav5.png"></image>
					<text>娱乐</text>
				</view>
			</navigator>
		</view>
		<view class="grid">
			<navigator :url="'/pages/specialty/specialty'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav6.png"></image>
					<text>特产</text>
				</view>
			</navigator>
			<navigator :url="'/pages/live/live'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav7.png"></image>
					<text>直播</text>
				</view>
			</navigator>
			<navigator :url="'/pages/guide/guide'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav8.png"></image>
					<text>导览</text>
				</view>
			</navigator>
			<navigator :url="'/pages/car/car'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav9.png"></image>
					<text>租车</text>
				</view>
			</navigator>
			<navigator :url="'/pages/picture/picture'">
				<view>
					<image src="http://yxx.h-etrip.com/app/assets/img/desNav10.png"></image>
					<text>图库</text>
				</view>
			</navigator>
		</view>
		<view class="destinationContentMap">
			<view class="desMapTitle">
				<text class="tripCity">嗨游怀化</text>
				<navigator :url="'/pages/guide/guide'">
				<text class="readMore">
					怡人之地多了一个你
					<text> </text>
				</text>
				</navigator>
			</view>
			<view class="desMapBanner">
				<image src="http://yxx.h-etrip.com/app/assets/img/desMap.png" />
			</view>
		</view>
		<view class="destinationContentMap">
			<view class="desMapTitle">
				<text class="tripCity">文化特色</text>
				<navigator :url="'/pages/culture/culture'">
					<text class="readMore">
						多姿多彩的文化特色等你发现
						<text> </text>
					</text>
				</navigator>
			</view>
			<view class="desMapList">
				<view class="listCard" v-for="(item,index) in list" :key="index" @click="godetails(item.id)">
					<text>{{item.title}}</text>
					<image :src="getImgUrl(item)" />
				</view>
				<view class="look" v-if="dataList.length > page *5" @click="lookmore">
					<uni-icons type="refresh-filled" size="20" color="#f8673b"></uni-icons>
					<text class="more">点击查看更多</text>
				</view>
				<view class="look" v-if="dataList.length <= page * 5">
					<text class="more">没有更多了</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		// 页面生命周期
		onLoad() {
			// console.log('监听页面加载，其参数为上个页面传递的数据，参数类型为Object(用于页面传参)');
		},
		onShow() {
			// console.log('监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面');
			this.getDate();
		},
		// onReady(){
		// 	console.log('监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发');
		// },
		// onHide(){
		// 	console.log('监听页面隐藏');
		// },
		// onUnload(){
		// 	console.log('监听页面卸载');
		// },
		data() {
			return {
				title: 'Hello',
				dataList: [],
				list: [],
				page: 1
			}
		},
		methods: {
			getDate() {
				this.httpRequest({
					url: '/etrip/api/app/et/article/cultures/list?areaId=' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.dataList = res.data.content;
					this.list = res.data.content.slice(0, this.page * 5);
				});

				// uni.request({
				// 	url: 'https://m.h-etrip.com/etrip/api/app/et/article/cultures/list?areaId=2220',
				// 	success: (res) => {
				// 		this.dataList = res.data.content;
				// 	}
				// });
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},
			godetails(id) {
				console.log(id);
				var url = '../culture/cultureDetails?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			goScenic() {
				uni.switchTab({
					url: '/pages/scenic/scenic'
				});
			},
			lookmore() {
				this.page = this.page + 1;
				this.list = this.dataList.slice(0, this.page * 5)
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.map {
		position: relative;
		width: 100%;
		height: 235px;
	}

	.map>text {
		position: absolute;
		color: #fff;
		font-size: 15px;
		left: 15px;
		top: 20px;
	}

	.headimg {
		width: 100%;
		height: 225px;
	}

	.grid {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-bottom: 10px;
	}

	.grid image {
		width: 45px;
		height: 45px;
	}

	.grid text {
		display: inherit;
		text-align: center;
		font-size: 13px;
		color: #666;
	}

	.destinationContentMap {
		width: 95%;
		margin: 2px auto 0;
		border-top: 5px solid #f7f8fa;

		.desMapTitle {
			width: 95%;
			margin: 10px auto 0px;
			display: flex;
			justify-content: space-between;

			text {
				height: 40px;
				line-height: 40px;
				display: inline-block;
			}

			.tripCity {
				font-weight: 700;
				color: #333;
				font-size: 17px;
			}

			.readMore {
				font-size: 14px;
				color: #999;

				text {
					display: inline-block;
					width: 12px;
					height: 12px;
					background: url("http://yxx.h-etrip.com/app/assets/img/homeRight.png") no-repeat;
					background-size: 100% 100%;
					position: relative;
					top: 1px;
					margin-left: 10px;
				}
			}
		}

		.desMapBanner {
			padding: 8px;

			image {
				width: 100%;
				height: 225px;
			}
		}

		.desMapList {
			padding: 5px;

			.listCard {
				width: 100%;
				height: 272px;
				box-shadow: 0px 1px 4px #c7c7c7;
				border-radius: 7px;
				margin-bottom: 10px;

				text {
					display: flex;
					align-items: center;
					color: #666;
					font-size: 15px;
					line-height: 30px;
					padding-top: 10px;
					margin-left: 15px;
				}

				image {
					padding: 12px 15px;
					width: calc(100% - 30px);
					border-radius: 50px;
					height: 200px;
				}
			}

			.look {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.more {
				display: block;
				text-align: center;
				font-size: 15px;
				margin-left: 5px;
				color: #666;
			}
		}
	}
</style>
