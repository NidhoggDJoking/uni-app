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
			<text>详细地址：</text>
			<input v-model="form.address" type="text" maxlength="50" placeholder="请输入详细地址" />
		</view>

		<view class="item">
			<text>邮政编码：</text>
			<input v-model="form.zip" type="number" maxlength="6" placeholder="请输入邮政编码" />
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
				key: 'receiving',
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
					address: '',
					zip: '',
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
				if (!this.form.address) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				if (!this.form.zip) {
					uni.showToast({
						title: '请输入邮政编码',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				console.log(this.form);
				this.data.push(this.form)
				uni.setStorage({
					key: 'receiving',
					data: this.data,
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
</style>
