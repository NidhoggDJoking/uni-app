<template>
	<view class="content">

		<view class="item">
			<text>姓名：</text>
			<input v-model="form.name" type="text" maxlength="7" placeholder="请输入姓名" />
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
			<button type="primary" @click="save()">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
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
				form: {
					name: '',
					phone: '',
					email: '',
					idcard: '',
				},
				data: []
			}
		},
		methods: {
			save() {
				if (!this.form.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入号码',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				if (!this.form.email) {
					uni.showToast({
						title: '请输入邮箱',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				if (!this.form.idcard) {
					uni.showToast({
						title: '请输入证件号码',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				console.log(this.form);
				this.data.push(this.form)
				console.log(this.data);
				var test = JSON.stringify(this.data)
				uni.setStorage({
					key: 'traveler',
					data: test,
					success: function() {
						uni.showToast({
							title: '添加成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
							    delta: 1
							});
						}, 2000);
					},
					fail: function() {},
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
		bottom: 18px;
		width: 94%;
		margin-left: 3%;
	}

	button {}
</style>
