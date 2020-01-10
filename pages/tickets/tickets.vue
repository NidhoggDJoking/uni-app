<template>
	<view class="ticketsContent">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in photo" :key="index">
						<image :src="getImgUrl(item)" />
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="top">
			<text class="title">{{spot.name}}</text>
			<text class="level">{{StarLevel(spot.starLevel)}}</text>
			<text class="satisfaction">{{spot.satisfaction || 98}}%满意</text>
			<view class="flex">
				<uni-icons type="location-filled" size="18" color="#f2826a"></uni-icons>
				<text class="address">{{spot.adress}}</text>
			</view>
		</view>
		<view style="height:40px" v-if="ticket"></view>
		<view class="tickets-intro-reserve">
			<block v-for="(item, index) in ticket" :key="index">
				<view>
					<text class="name">{{item.ticketDef.name}}</text>
					<text class="price">门市价：￥{{computePrice(item.ticketDef.ext ? item.ticketDef.ext.marketPrice : item.ticketDef.price/100)}}</text>
				</view>
				<view class="intro-reserve-price">
					<text>{{item.ticketDef.ext?item.ticketDef.ext.explain:' '}}</text>
					<text>￥{{computePrice((item.ticketDef.price/100))}}</text>
				</view>

				<div class="intro-reserve-con">
					<p>预定结束时间:</p>
					<span>{{item.ticketDef.endBookTime}}</span>
				</div>
				<div class="intro-reserve-con">
					<p>使用方法:</p>
					<span>{{item.ticketDef.useInstructions}}</span>
				</div>

				<div class="intro-reserve-time">
					<div class="reserve-time">
						<!--<span>{{item.ticketDef.endBookTime}}</span>
			              <span>{{item.ticketDef.useInstructions}}</span>-->
					</div>
					<text class="button" @click="goOrder()">预定</text>
				</div>

				<view class="tabClass">
					<text class="tabOne" :class="{ active: star == 0 }" @click="changeTable(0)">景点介绍</text>
					<text class="tabTwo" :class="{ active: star == 1 }" @click="changeTable(1)">预定须知</text>
				</view>
				<view class="content">
					<view class="introduce" v-show="star == 0" v-html="spot.description"></view>
					<view class="introduce" v-show="star == 1" v-html="spot.bookNotice"></view>
				</view>
			</block>

		</view>


	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		onLoad(option) {
			this.id = option.id;
			this.getDetail()
			this.getStarLevel()
		},
		data() {
			return {
				id: '',
				photo: "",
				spot: "",
				cipher: [],
				ticket: [],
				autoplay: true,
				interval: 2000,
				duration: 500,
				star: 0,
			};
		},
		methods: {
			getDetail() {
				let opts = {
					url: '/etrip/api/app/et/spot/inst/' + this.id,
					method: 'get'
				};
				this.httpRequest(opts).then((res) => {
					this.photo = res.data.content.photo;
					this.spot = res.data.content.spot;
					this.ticket = res.data.content.ticket;
					console.log(this.ticket)
				})
			},
			getImgUrl(data) {
				return this.getSrc(data);
			},

			getStarLevel() {
				var that = this
				uni.getStorage({
					key: 'enums',
					success: function(res) {
						let enums = res.data;
						enums = JSON.parse(res.data)
						enums = enums["et.spot.star-level"].options
						for (let item of enums) {
							that.cipher.push({
								value: item.value,
								label: item.label
							});
						}

					}
				})

			},

			StarLevel(star) {
				for (let item of this.cipher) {
					if (item.value == star) {
						return item.label;
					}
				}
				return "";
			},

			computePrice(params) {
				let price = params.toFixed(2);
				return price;
			},
			changeTable(num) {
				this.star = num
			},
			goOrder() {
				var url = './ticketsOrder?id=' + this.id;
				uni.navigateTo({
					url: url
				});
			}

		}
	}
</script>

<style lang="less">
	.content {}

	.swiper {
		height: 200px;
	}

	.swiper image {
		width: 100%;
	}

	.top {
		position: absolute;
		top: 180px;
		width: 100%;
		background: #fff;
		border-radius: 15px 15px 0 0;
	}

	.title {
		padding-left: 20px;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		font-weight: 400;
		//display: block;
	}

	.level {
		font-size: 10px;
		color: #999;
		display: inline-block;
		margin-left: 20px;
	}

	.satisfaction {
		font-size: 10px;
		color: #999;
		display: inline-block;
		margin-right: 20px;
		float: right;
		line-height: 50px;
	}

	.flex {
		padding-left: 17px;
		display: flex;
		align-items: center;

	}

	.address {
		color: #737373;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		max-width: 85%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		margin-left: 3px;
	}

	.tickets-intro-reserve {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		padding-top: 20px;

		.name {
			font-size: 13px;
			line-height: 30px;
		}

		.price {
			text-decoration: line-through;
			font-size: 10px;
			color: #999;
			display: inline-block;
			float: right;
			line-height: 30px;
		}
	}

	.intro-reserve-price {
		display: flex;
		justify-content: space-between;
		font-size: 11px;
		color: #f92525;
		margin-top: 10px;
	}

	.intro-reserve-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px 0;

		text {
			font-size: 11px;
			display: inline-block;
		}

		.border {
			font-size: 11px;
			color: #fcab5b;
			padding: 3px 3px;
			border: 1px solid #fcab5b;
			border-radius: 20px;
		}
	}

	.intro-reserve-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.5rem 0;

		p {
			font-size: 0.8rem;
			color: #949494;
		}

		span {
			font-size: 0.6rem;
			color: #fcab5b;
			padding: 0.2rem 0.5rem;
			border: 0.05rem solid #fcab5b;
			border-radius: 1rem;
		}
	}

	.intro-reserve-time {
		display: flex;
		justify-content: space-between;
		padding: 0rem 0 1rem 0;

		.reserve-time {
			span {
				font-size: 0.6rem;
				color: #fcab5b;
				padding: 0.2rem;
				margin-right: 0.5rem;
				border: 0.01rem solid #fcab5b;
			}
		}

		.button {
			width: 4rem;
			height: 1.5rem;
			line-height: 1.5rem;
			font-size: 0.9rem;
			letter-spacing: 0.04rem;
			background: linear-gradient(270deg, #f49c55 0, #f8673b 100%);
			border-radius: 1rem;
			color: #fff;
			text-align: center;
		}
	}

	.active {
		color: rgb(247, 110, 65);
		border-bottom: 1px solid rgb(247, 110, 65);
	}

	.tabClass {
		display: flex;
		justify-content: space-around;
		padding: 0rem 0 1rem 0;

		text {
			font-size: 11px;
			color: #7d7e80;
		}
	}
</style>
