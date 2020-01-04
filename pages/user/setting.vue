<template>
	<view class="content">
		<view class="out">
			<button @click="out()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {

			}
		},
		methods: {
			out() {
				uni.removeStorage({
					key: 'userInfo',
					success: function(res) {
						console.log('success');
						uni.showToast({
							title: '退出成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/my'
							});
						}, 2000);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.out {
		position: fixed;
		bottom: 30px;
		width: 86%;
		margin-left: 7%;
	}

	button {
		color: #fff;
		background: #f8673b;
	}
</style>
