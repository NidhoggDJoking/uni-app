<template>
	<view class="content">
		<text class="empty" v-if="data.length == 0 ">暂无数据</text>
		<view class="list" v-if="data.length != 0 ">
			<view class="card" v-for="(item,index) in data" :key="index">
				<text class="name">姓名：{{item.name}}</text>
				<text class="phone">手机号码：{{item.phone}}</text>
				<text class="address">收货地址：{{item.address}}</text>
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
				key: 'receiving',
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
					url: '/pages/user/receiving_add'
				});

				// uni.authorize({
				//     scope: 'scope.address',
				//     success() {
				//         uni.chooseAddress({
				// 			success(res){
				// 				console.log(res);
				// 				// console.log(res.userName)
				// 				//     console.log(res.postalCode)
				// 				//     console.log(res.provinceName)
				// 				//     console.log(res.cityName)
				// 				//     console.log(res.countyName)
				// 				//     console.log(res.detailInfo)
				// 				//     console.log(res.nationalCode)
				// 				//     console.log(res.telNumber)
				// 			}
				// 		})
				//     }
				// })
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
		margin-bottom: 50px;
	}

	.card {
		background: #fff;
		width: 100%;
		min-height: 100px;
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
		font-size: 14px;
		font-weight: 600;
		color: #666;
	}

	.phone {
		display: block;
		padding: 10px 10px 0 10px;
		color: #777;
		font-size: 13px;
	}

	.address {
		display: block;
		padding: 10px;
		color: #333333;
		font-size: 13px;
		line-height: 20px;
		color: #777;
	}
</style>
