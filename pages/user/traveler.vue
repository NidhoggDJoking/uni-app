<template>
	<view class="content">
		<text class="empty" v-if="data.length == 0 ">暂无数据</text>
		<view class="list" v-if="data.length != 0 ">
			<view class="card" v-for="(item,index) in data" :key="index">
				<text class="name">姓名：{{item.name}}</text>
				<text class="phone">手机号码：{{item.phone}}</text>
				<text class="address">身份证号：{{item.idcard}}</text>
			</view>
		</view>
<!-- 		<view v-for="(item,index) in data" :key="index">
			<uni-card :title="item.name" mode="basic" :is-shadow="true" :extra="item.phone" >
				那是一个秋意盎然、金风送爽的日子,我和父母一起来到了位于上师大旁的康健园.一踏进公园,一股浓郁的桂香扑鼻而来,泌人心脾,让我心旷神怡,只见一朵朵开得正烈的金色桂花,迎风而立,仿佛在向我招手.我们追着这桂香,走进了清幽的公园.
			</uni-card>
		</view> -->
		<view class="add">
			<button @click="add()">添加</button>
		</view>
	</view>
</template>

<script>
	// import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		// components: {
		// 	uniCard
		// },
		onShow() {
			var that = this;
			uni.getStorage({
				key: 'traveler',
				success: function(res) {
					that.data = JSON.parse(res.data);
				},
				fail(err) {}
			});
		},
		data() {
			return {
				data: [

				]
			}
		},
		methods: {
			add() {
				uni.navigateTo({
					url: '/pages/user/traveler_add'
				});
			}
		}
	}
</script>

<style scoped>
	.content {
	/* 	position: fixed;
		top: 0;
		left: 0;
		background: #f7f8fa; */
		width: 100%;
		height: 100%;
	}

	.empty {
		display: block;
		margin-top: 45px;
		font-size: 16px;
		color: #333333;
		width: 100%;
		text-align: center;
	}

	.add {
		position: fixed;
		bottom: 18px;
		width: 94%;
		margin-left: 3%;
	}

	button {
		color: #fff;
		background: #f8673b;
	}

	.list {
		padding: 0 10px;
	}

	.card {
		background: #fff;
		width: 100%;
		min-height: 100px;
		border-radius: 5px;
		margin: 10px auto;
		box-shadow: 0 0 4px rgb(230, 230, 230);
		font-size: 14px;
	}

	.name {
		padding-top: 10px;
		padding-left: 10px;
		display: block;
		border-bottom: 1px solid #f7f8fa;
		height: 25px;
		line-height: 20px;
		color: #333333;
	}
	.phone{
		display: block;
		padding: 10px 10px 0 10px;
		color: #333333;
		font-size: 13px;
	}
	.address {
		display: block;
		padding: 10px;
		color: #333333;
		font-size: 13px;
	}
</style>
