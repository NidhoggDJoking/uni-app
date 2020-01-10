<template>
	<view class="content">

		<view class="item">
			<text>昵称：</text>
			<input v-model="form.name" type="text" maxlength="10" placeholder="请输入姓名" />
		</view>

		<view class="item">
			<text>联系号码：</text>
			<input v-model="form.mobile" type="number" maxlength="11" placeholder="请输入号码" />
		</view>

		<view class="item">
			<text>邮箱：</text>
			<input v-model="form.email" type="text" maxlength="50" placeholder="请输入邮箱" />
		</view>

		<view class="item">
			<text>证件号码：</text>
			<input v-model="form.idNo" type="idcard" maxlength="18" placeholder="请输入证件号码" />
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
				key: 'token',
				success: function(res) {
					console.log(res);
					that.token = res.data;
					uni.request({
						url: that.baseUrl + '/etrip/api/app/security/my/info',
						header: {
							'Authorization': that.token, //自定义请求头信息
						},
						success: (res) => {
							console.log(res);
							that.form.name = res.data.content.name
							that.form.mobile = res.data.content.mobile
							that.form.email = res.data.content.email
							that.form.idNo = res.data.content.idNo
						}
					});
				}
			});

		},
		data() {
			return {
				form: {
					name: '',
					mobile: '',
					email: '',
					idNo: '',
				},
				token: "",
			}
		},
		methods: {
			save() {
				var that = this;
				console.log(this.form);
				uni.getStorage({
					key: 'token',
					success: function(res) {
						console.log(res);
						that.token = res.data;
						uni.request({
							url: that.baseUrl + '/etrip/api/app/security/update/info',
							method: 'POST',
							data: that.form,
							header: {
								'Authorization': that.token, //自定义请求头信息
							},
							success: (res) => {
								console.log(res);
								uni.showToast({
									title: '修改成功！',
									duration: 1500
								});
								setTimeout(function() {
									uni.switchTab({
										url: '../user/my'
									});
								}, 1500);
							}
						});
					}
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

		input {
			font-size:13px;
			color: #222222;
		}
	}

	.save {
		position: fixed;
		bottom: 8px;
		width: 94%;
		margin-left: 3%;
	}

	button {}
</style>
