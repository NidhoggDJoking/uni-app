<template>
	<view>
		<view class=".image" @click="test">
			<image mode="aspectFill" :src="src">
			</image>
		</view>
		<!-- <view class="membrane"></view> -->
		<uni-icons @click="test" class="icon" type="plusempty" size="83" color="#fff"></uni-icons>
		<button @click="updata">确定</button>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		onLoad() {
			var that = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					console.log(res.data);
					that.userInfo = res.data;
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		data() {
			return {
				src: '',
				token: "",
				userInfo: {},

			};
		},
		methods: {
			test() {
				var that = this;
				uni.chooseImage({
					count: 1, // 上传图片数量-默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths[0]);
						that.src = res.tempFilePaths[0];
					}
				});
			},
			updata() {
				if (this.src == "") {
					uni.showToast({
						icon:'none',
						title: '请选择上传的图片',
						duration: 1500
					});
					return;
				}
				var that = this;
				uni.getStorage({
					key: 'token',
					success: function(res) {
						console.log("3800");
						that.token = res.data;
						uni.uploadFile({
							url: that.baseUrl + '/etrip/api/app/upload/files',
							filePath: that.src,
							name: 'file',
							fileType: 'image',
							header: {
								'Authorization': that.token, //自定义请求头信息
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data.content);
								console.log("su", uploadFileRes.data);
								console.log(JSON.parse(uploadFileRes.data).content[0]);

								uni.request({
									url: that.baseUrl + '/etrip/api/app/security/profile',
									data: JSON.parse(uploadFileRes.data).content[0],
									method: "POST",
									header: {
										'Authorization': that.token, //自定义请求头信息
									},
									success: (res) => {
										console.log(res.data);

										that.userInfo.profile = res.data.content.profile

										uni.setStorage({
											key: 'userInfo',
											data: that.userInfo,
											success: function() {
												uni.showToast({
													title: '修改成功',
													duration: 2000
												});
												uni.switchTab({
													url: '/pages/user/my'
												});
											}
										});

									},
									fail(err) {
										uni.showToast({
											icon:'none',
											title: '图片替换失败',
											duration: 1500
										});
									}
								});
							},
							fail: (err) => {
								uni.showToast({
									icon:'none',
									title: '图片上传失败，请重新上传',
									duration: 1500
								});
							}
						});
					},
					fail() {
						uni.showToast({
							icon:'none',
							title: '请登录后操作',
							duration: 1500
						});
					}
				});

			}
		}
	}
</script>

<style>
	.image {
		width: 150px;
		height: 150px;
		margin: 0 auto;
		display: block;
		background: #f5f5f5;
		border-width: 0.02667rem;
		border-style: dashed;
		border-color: #c3c3c3;
		position: absolute;
		transform: translate(-50%, -50%);
		top: 40%;
		left: 50%;
	}

	/* .membrane{
		width: 150px;
		height: 150px;
		position: absolute;
		transform: translate(-50%, -50%);
		top: 40%;
		left: 50%;
		-webkit-clip-path: circle(50% at 50% 50%);
		clip: circle(50% at 50% 50%);
		opacity: 0.9;
		background: #4646467a;
	} */
	image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		-webkit-clip-path: circle(50% at 50% 50%);
		clip: circle(50% at 50% 50%);
		opacity: 0.9;
	}

	button {
		position: fixed;
		bottom: 12px;
		width: 94%;
		margin-left: 3%;
		color: #fff;
		background: #f8673b;

	}

	.icon {
		position: absolute;
		transform: translate(-50%, -50%);
		top: 40%;
		left: 50%;
	}
</style>
