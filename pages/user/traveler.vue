<template>
	<view class="content">
		<text class="empty" v-if="data.length == 0 ">暂无数据</text>
		<view class="list" v-if="data.length != 0 ">
			<view class="card" v-for="(item,index) in data" :key="index">
				<text class="name">姓名：{{item.name}}</text>
				<text class="phone">手机号码：{{item.phone}}</text>
				<text class="address">电话：{{item.phone}}</text>
			</view>
		</view>
		<view class="add">
			<button @click="add()">添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			var that = this;
			uni.getStorage({
				key: 'traveler',
				success: function(res) {
					that.data = res.data;
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
		min-height: 170px;
		border-radius: 5px;
		margin: 10px auto;
		box-shadow: 0 0 4px rgb(230, 230, 230);
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
