<template>
	<view class="content">

		<view class="item">
			<text>昵称：</text>
			<input v-model="form.name" type="text" placeholder="请输入姓名" />
		</view>

		<view class="item">
			<text>联系号码：</text>
			<input v-model="form.phone" type="number" maxlength="11" placeholder="请输入号码" />
		</view>

		<view class="item">
			<text>邮箱：</text>
			<input v-model="form.email" type="text" maxlength="50" placeholder="请输入邮箱" />
		</view>

		<view class="item">
			<text>证件号码：</text>
			<input v-model="form.idcard" type="idcard" maxlength="18" placeholder="请输入证件号码" />
		</view>

		<view class="save">
			<button type="primary" @click="save()">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var that = this;

			uni.getStorage({
				key: 'info',
				success: function(res) {
					that.form = res.data;
				},
				fail(err) {
					uni.getStorage({
						key: 'userInfo',
						success: function(res) {
							that.form.name = res.data.nickName;
						},
						fail(err) {
							console.log(err);
						}
					});
				}
			});
		},
		data() {
			return {
				form: {
					name: '',
					phone: '',
					email: '',
					idcard: '',
				},
			}
		},
		methods: {
			save() {

				console.log(this.form);
				uni.setStorage({
					key: 'info',
					data: this.form,
					success: function() {
						console.log('success');
						uni.showToast({
							title: '添加成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/index/my'
							});
						}, 2000);
					},
					fail: function() {
						console.log('fail');
					},
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {}

	.item {
		width: 100%;
		display: flex;
		align-content: space-around;
		align-items: center;
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #E7E7E7;

		text {
			padding-left: 10px;
			width: 100px;
		}

		input {}
	}

	.save {
		position: fixed;
		bottom: 8px;
		width: 94%;
		margin-left: 3%;
	}

	button {}
</style>
