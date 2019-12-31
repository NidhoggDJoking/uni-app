<template>
	<view class="content">
		<image class="headimg" src="http://cdn.yxx.h-etrip.com/etrip/console/images/9031?w=600"></image>
		<view class="grid">
			<navigator :url="'/pages/other/introduce'">
			<view>
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav1.png"></image>
				<text>简介</text>
			</view>
			</navigator>
			<view>
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav2.png"></image>
				<text>景点</text>
			</view>
			<navigator :url="'/pages/other/food'">
			<view>
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav3.png"></image>
				<text>美食</text>
			</view>
			</navigator>
<!-- 			<view>
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav3.png"></image>
				<text>特产</text>
			</view> -->
			<view>
				<image src="http://yxx.h-etrip.com/app/assets/img/desNav10.png"></image>
				<text>图库</text>
			</view>
		</view>
		      <view class="destinationContentMap">
		        <view class="desMapTitle">
		          <text class="tripCity">嗨游怀化</text>
		          <text class="readMore">
		              怡人之地多了一个你
		              <text> </text>
		          </text>
		        </view>
		        <view class="desMapBanner">
		            <image src="http://yxx.h-etrip.com/app/assets/img/desMap.png"/>
		        </view>
		      </view>
			  <view class="destinationContentMap">
			    <view class="desMapTitle">
			      <text class="tripCity">文化特色</text>
			      <text class="readMore">
			          多姿多彩的文化特色等你发现 
			          <text> </text>
			      </text>
			    </view>
			    <view class="desMapList">
					<view class="listCard" v-for="(item,index) in dataList" :key="index" @click="godetails(item.id)">
						<text>{{item.title}}</text>
						<image :src="getImgUrl(item)" />
					</view>
			    </view>
			  </view>
	</view>
</template>

<script>
	export default {
		// 页面生命周期
		onLoad() {
			// console.log('监听页面加载，其参数为上个页面传递的数据，参数类型为Object(用于页面传参)');
		},
		onShow(){
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
				dataList:[],
			}
		},
		methods: {
			getDate(){
				uni.request({
				    url: 'http://yxx.h-etrip.com:9092/etrip/api/app/et/article/cultures/list?areaId=2220',
				    success: (res) => {
				        // console.log(res.data);
				        this.dataList = res.data.content;
				    }
				});
			},
			 getImgUrl(data) {
			      return this.getSrc(data);
			 },
			 godetails(id){
				 var url = '../details/culture?id=' + id ;
				 uni.redirectTo({
				     url: url
				 });
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

	.headimg{
		width: 100%;
		height: 225px;
	}
	.grid{
		width: 100%;
		display: flex;
		justify-content:space-around;
		padding-bottom: 10px;
		border-bottom: 5px solid #f7f8fa;
	}
	.grid  image{
		width: 45px;
		height: 45px;
	}
	.grid text{
		display: inherit;
		text-align: center;
		font-size: 13px;
		color: #666;
	}
	  .destinationContentMap {
	    width: 95%;
	    margin: 25px auto 0;
	    .desMapTitle {
	      width: 95%;
	      margin: 0 auto;
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
	        font-size: 1rem;
	      }
	      .readMore {
	        font-size: 14px;
	        color: #999;
	        text {
	          display: inline-block;
	          width: 18px;
	          height: 18px;
	          background: url("http://yxx.h-etrip.com/app/assets/img/homeRight.png") no-repeat;
	          background-size: 100% 100%;
	          position: relative;
	          top: 5px;
	          margin-left: 10px;
	        }
	      }
	    }
	    .desMapBanner {
	      padding: 8px;
	      image {
	        width: 100%;
	      }
	    }
		.desMapList{
			padding: 5px;
			.listCard{
				width: 100%;
				height: 260px;
				box-shadow: 0px 1px 4px #c7c7c7;
				border-radius:7px;
				margin-bottom: 10px;
				text{
					display: flex;
					align-items: center;
					color: #666;
					font-size: 15px;
					line-height: 30px;
					margin-left: 10px;
				}
				image {
				  padding: 12px;
				  width: calc(100% - 24px);
				  height: 200px;
				}
			}
		
		}
	  }
</style>
