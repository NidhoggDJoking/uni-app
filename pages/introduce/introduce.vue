<template>
	<view>
		<image class="topimg" :src="img"></image>
		<view class="card">
			<text class="title">{{name}}</text>
			<text>
				{{title}}
			</text>
		</view>
		<view class="text" v-html="textData"></view>
	</view>
</template>

<script>
	export default {
		mounted() {
			this.getDate();
		},
		data() {
			return {
				textData: "",
				img: "",
				title: "",
				name: "",
			}
		},
		methods: {
			getDate() {
				this.httpRequest({
					url: '/etrip/api/app/et/areas/' + this.areaCode,
					method: 'GET',
				}).then(res => {
					this.textData = res.data.content.content;
					this.img = this.getSrc(res.data.content);
					this.title = res.data.content.summary;
					this.name = res.data.content.name;
				});
			},
		}
	}
</script>

<style scoped>
	.topimg {
		width: 100%;
		height: 230px;
	}

	.card {
		width: 78%;
		background: #fff;
		box-shadow: 0 0 1rem 0rem #cdd4e4;
		border-radius: 0.6rem;
		margin: auto;
		position: relative;
		top: -2rem;
		padding: 1rem;
	}

	.title {
		text-align: center;
		font-weight: 600;
		font-size: 18px;
		display: block;
		margin-bottom: 10px;
	}

	.text {
		background: #fff;
		padding: 0 20px 20px 20px;
	}
</style>
