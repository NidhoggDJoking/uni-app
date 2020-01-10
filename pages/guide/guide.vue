<template>
	<div>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in images" :key="index" @click="mapdetails()">
							<image :src="item.url" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 当地精品区域 -->
		<div class="local-boutique">
			<div class="boutique">当地精品</div>
			<div class="boutique-details">
				<div class="boutique-img" v-for=" (todo,index) in item" @click="mapdetails()" :key="index">
					<img :src="todo.imgUrl" alt />
					<p class="boutique-name">{{todo.name}}</p>
					<p>{{todo.detail}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {

		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				images: [{
						url: 'http://yxx.h-etrip.com/app/assets/img/guide7/yuanling.jpg'
					},
					{
						url: 'http://yxx.h-etrip.com/app/assets/img/guide6/hongjiangshi.jpg',
					},
					{
						url:'http://yxx.h-etrip.com/app/assets/img/guide6/jingzhou.jpg',
					},
					{
						url: 'http://yxx.h-etrip.com/app/assets/img/guide6/putaogou.jpg',
					}
				],
				item: [{

						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/chenxi.jpg',
						name: "辰溪",
						detail: "沅江、辰水交汇之处"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/hechen.jpg',
						name: "鹤城",
						detail: "五省通衢的战略要地"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/hongjiang.jpg',
						name: "洪江管理区",
						detail: "“小南京”、“小重庆”"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/hongjiangshi.jpg',
						name: "洪江市",
						detail: "中国天然氧吧"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/huitong.jpg',
						name: "会同",
						detail: "驰名全国的“广木之乡”"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/mayang.jpg',
						name: "麻阳",
						detail: "“中国长寿之乡”"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/tongdao.jpg',
						name: "通道",
						detail: "“南楚极地”、“百越襟喉”"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/xinhuang.jpg',
						name: "新晃",
						detail: "“中国湘西黄牛之乡”"
					}, 
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/jingzhou.jpg',
						name: "靖州",
						detail: "“中国杨梅之乡”、“茯苓之乡”"
					}, {
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/xupu.jpg',
						name: "溆浦",
						detail: "“湘西乌克兰”"
					}, 
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/yuanling.jpg',
						name: "沅陵",
						detail: "“湘西门户”"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/zhijiang.jpg',
						name: "芷江",
						detail: "抗战胜利历史名称"
					},
					{
						imgUrl: 'http://yxx.h-etrip.com/app/assets/img/guide6/putaogou.jpg',
						name: "中方",
						detail: "中国南方最大葡萄沟"
					}
				]
			};
		},
		methods: {
			mapdetails() {
				uni.navigateTo({
					url: './mapdetails'
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.swiper {
		height: 200px;
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}

	.local-boutique {
		width: calc(100% - 2rem);
		height: 100%;
		padding: 0 1rem;
	}

	.boutique {
		width: 100%;
		height: 32px;
		font-size: 20px;
		font-weight: 700;
		color: #4c4c4c;
		padding: 13px 0;
	}

	.boutique-details {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;

		.boutique-img {
			width: 48%;
			height: 200px;

			img {
				width: 100%;
				height: 121px;
				border-radius: 7px;
			}

			.boutique-name {
				font-size: 15px;
				color: #333;
				margin: 8px 0 5px 5px;
			}

			:last-child {
				font-size: 13px;
				color: #999;
				margin-left: 5px;
			}
		}
	}
</style>
