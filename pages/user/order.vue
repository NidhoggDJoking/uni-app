<template>
	<view>
		<view class="nav">

			<view :class="{ active: star == 0 }" @click="change(0)">待付款</view>
			<view :class="{ active: star == 1 }" @click="change(1)">已付款</view>
			<view :class="{ active: star == 2 }" @click="change(2)">已完成</view>
		</view>
		<view class="list">
			<uni-card mode="basic" :is-shadow="true" v-for="(item,index) in data" :key="index" :extra="getStatus(item.status)"
			 :title="changeArray(item.type)" v-if="item.status == star">
				<text class="title">{{item.title}}</text>
				<text class="count">购买数量 ：{{item.count}}</text>
				<text class="date">游玩日期 : {{getTime(item.start || item.create)}}</text>
				<text class="right">￥{{item.price/100}}</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		onLoad() {
			var that = this;
			uni.getStorage({
				key: 'token',
				success: function(res) {
					that.token = res.data;
				}
			});
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					that.id = res.data.id;
					that.getData();
				},
			});
		},
		data() {
			return {
				payStatus: {
					"name": "支付状态",
					"options": [{
							"value": 9,
							"label": "已取消"
						},
						{
							"value": 0,
							"label": "待支付"
						},
						{
							"value": 1,
							"label": "待使用"
						},
						{
							"value": 2,
							"label": "已完成"
						}
					]
				},
				star: 0,
				id: '',
				data: [],
				token: '',
				status: ''
			}
		},
		methods: {
			getData() {
				var that = this;
				uni.request({
					url: this.baseUrl + '/etrip/api/app/et/orders/customer/' + this.id,
					method: "GET",
					header: {
						'Authorization': that.token,
					},
					success: (res) => {
						console.log(res);
						this.data = res.data.content;
					}
				});
			},
			change(num) {
				this.star = num;
			},

			getTime(sj) {
				return sj.slice(0, 10);
			},
			getStatus(status) {
				switch (status) {
					case 0:
						return "待支付";
						break;
					case 1:
						return "已完成";
						break;
					case 2:
						return "已完成";
						break;
					case 9:
						return "已取消";
						break;
					default:
						return "";
				}
			},
			//遍历数组
			changeArray(type) {
				switch (type) {
					case 1:
						return "门票";
						break;
					case 2:
						return "线路";
						break;
					case 3:
						return "定制";
						break;
					case 4:
						return "特产";
						break;
					case 5:
						return "住宿";
						break;
					default:
						return "";
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.nav {
		display: flex;
		justify-content: space-around;
		height: 28px;
		line-height: 25px;
		width: 100%;

		.active {
			border-bottom: 2px solid #f8673b;
		}
	}

	.list {
		text {
			display: block;
			font-size: 13px;
			height: 21px;
			line-height: 21px;
		}

		.title {
			font-size: 14px;
			font-weight: 600;
			height: 25px;
			line-height: 25px;
		}

		.right {
			float: right;
			color: red;
			font-size: 14px;
		}
	}
</style>
