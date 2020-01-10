<template>
	<div>
		<!-- 地图 -->
		<div class="mapdetails-map" @click="hide">
			<!-- 地图详情锚点 -->
			<div class="mapdetails-anchor">
				<ul>
					<li class="mapdetails-anchor01 anchor" @click.stop="toggle(1)"></li>
					<li class="mapdetails-anchor02 anchor" @click.stop="toggle(2)"></li>
					<li class="mapdetails-anchor03 anchor" @click.stop="toggle(3)"></li>
					<li class="mapdetails-anchor04 anchor" @click.stop="toggle(4)"></li>
					<li class="mapdetails-anchor05 anchor" @click.stop="toggle(5)"></li>
					<li class="mapdetails-anchor06 anchor" @click.stop="toggle(6)"></li>
					<li class="mapdetails-anchor07 anchor" @click.stop="toggle(7)"></li>
					<li class="mapdetails-anchor08 anchor" @click.stop="toggle(8)"></li>
					<li class="mapdetails-anchor09 anchor" @click.stop="toggle(9)"></li>
				</ul>
			</div>
			<div class="mapdetails-details" v-if="isShow">
				<!-- 地点锚点简介 -->
				<div class="mapdetails-anchor-intro" style="top:11%;right:1.5%;" v-show="num == 1">
					<div class="mapdetails-anchor-intro-top">思蒙丹霞</div>
					<div class="mapdetails-anchor-intro-content">思蒙，素有“小桂林”之称，风光优美，民风淳朴，十里碧水丹霞，新潇湘八景之一。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:11%;left:1.5%;" v-show="num == 2">
					<div class="mapdetails-anchor-intro-top">豪侠坪村</div>
					<div class="mapdetails-anchor-intro-content">豪侠坪村历史悠久，人才辈出，风光旖旎，古迹众多，文化底蕴深厚，是江南尤其是湘西豪宅大院存留最好的古村落。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:13%;left:30%;" v-show="num == 3">
					<div class="mapdetails-anchor-intro-top">五保田村</div>
					<div class="mapdetails-anchor-intro-content">五保田村落始建于清代，距今有300多年历史。地处雪峰山、武陵山的崇山峻岭中，东接溆浦，南连怀化。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:8%;left:8%;" v-show="num == 4">
					<div class="mapdetails-anchor-intro-top">芷江受降纪念坊</div>
					<div class="mapdetails-anchor-intro-content">芷江受降纪念坊建于1946年2月，是中国人民抗日战争胜利的标志，是世界反法西斯战争胜利的重要历史见证，更是世界上惟一一座二战胜利纪念标志建筑——被称为“中国凯旋门”
						。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:10%;left:10%;" v-show="num == 5">
					<div class="mapdetails-anchor-intro-top">南方葡萄沟</div>
					<div class="mapdetails-anchor-intro-content">南有雪峰山脉，北有武陵山区，独特的生态环境和气候条件，孕育了拥有纯正中国血统的湘珍珠刺葡萄，打破了酿酒葡萄“金腰带”的神话，被称为“南方葡萄沟”。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:20%;left:15%;" v-show="num == 6">
					<div class="mapdetails-anchor-intro-top">黔阳古城</div>
					<div class="mapdetails-anchor-intro-content">黔阳古城至今绵延2200 多年，是全国保存最完好的明清古城之一，也是中国难得留存下来的、最具原真风貌的隐逸之都。 </div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:25%;left:25%;" v-show="num == 7">
					<div class="mapdetails-anchor-intro-top">洪江古商城</div>
					<div class="mapdetails-anchor-intro-content">洪江自唐宋以来便成为了西南地区的繁华商埠，素有“湘西明珠”、“小南京”、“西南大都会”之称，在海内外享有“中国第一古商城”之美誉。
					</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:30%;left:18%;" v-show="num == 8">
					<div class="mapdetails-anchor-intro-top">高椅古村</div>
					<div class="mapdetails-anchor-intro-content">高椅古村因其三面环山一面临水，地形宛如一把太师椅而得名，至今仍较完整地保存着明清时期古民居建筑上百栋。</div>
				</div>
				<div class="mapdetails-anchor-intro" style="top:40%;left:4%;" v-show="num == 9">
					<div class="mapdetails-anchor-intro-top">地笋苗寨</div>
					<div class="mapdetails-anchor-intro-content">地笋苗寨，古朴自然的苗族聚居地，因《爸爸去哪儿2》在此拍摄而知名于世，让这个古老的苗寨焕发了新的生机。 </div>
				</div>
				<!-- 地点锚点图片 -->
				<div class="mapdetails-anchor-pic" v-show="num == 1">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa5.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb5.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 2">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa2.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb2.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 3">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa6.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb6.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 4">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa3.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb3.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 5">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa7.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb7.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 6">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa8.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb8.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 7">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa4.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb4.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 8">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa10.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb10.jpg" alt=""></li>
					</ul>
				</div>
				<div class="mapdetails-anchor-pic" v-show="num == 9">
					<ul>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desa1.jpg" alt=""></li>
						<li><img src="http://test2.h-etrip.com/app/assets/img/guide3/desb1.jpg" alt=""></li>
					</ul>
				</div>
			</div>
			<div class="mapdetails-foot">
				<p>怀化市</p>
				<p>怀化，位于湖南西南部，为大湘西中心，是一座多民族聚居的山水生态中心“城市”，被誉为“一座会呼吸的城市”。</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				num: 0
			}
		},
		methods: {
			toggle: function(num) {
				this.isShow = true;
				this.num = num;
			},
			hide() {
				this.isShow = false;
			}
		}
	}
</script>

<style lang="less">
	.mapdetails-map {
		height: 662px;
		background-color: pink;
		background: url("http://test2.h-etrip.com/app/assets/img/guideMap3.png") no-repeat;
		background-size: 100%;
	}

	.mapdetails-map {
		position: relative;

		.anchor {
			position: absolute;
			width: 17.5px;
			height: 17.5px;
			background: url("http://test2.h-etrip.com/app/assets/img/TabsDestinationFocus.png") no-repeat;
			background-size: 100%;
		}

		.mapdetails-anchor01 {
			top: 28.5%;
			left: 72.2%;
		}

		.mapdetails-anchor02 {
			top: 34.3%;
			left: 29.5%;
		}

		.mapdetails-anchor03 {
			top: 37.5%;
			left: 59.5%;
		}

		.mapdetails-anchor04 {
			top: 42%;
			left: 26%;
		}

		.mapdetails-anchor05 {
			top: 47.2%;
			left: 37.7%;
		}

		.mapdetails-anchor06 {
			top: 51%;
			left: 35.8%;
		}

		.mapdetails-anchor07 {
			bottom: 43%;
			right: 46%;
		}

		.mapdetails-anchor08 {
			bottom: 38.5%;
			right: 52.5%;
		}

		.mapdetails-anchor09 {
			bottom: 28%;
			right: 79.3%;
		}
	}

	.mapdetails-foot {
		position: absolute;
		bottom: -15px;
		width: 100%;
		height: 180px;
		border-radius: 30px 30px 0 0;
		box-shadow: 0 -0.08rem 0.2rem 0.1rem rgba(153, 153, 153, .5);
		background-color: #fff;

		:first-child {
			font-size: 16px;
			padding: 30px 20px 15px 20px;
		}

		:last-child {
			font-size: 15px;
			padding-left: 20px;
			padding-right: 20px;
			color: #7C7C7C;
		}
	}

	.mapdetails-map {
		position: relative;

		.mapdetails-anchor-intro {
			position: absolute;
			width: 200px;
			background-color: #fff;

			.mapdetails-anchor-intro-top {
				width: 100%;
				height: 45px;
				line-height: 45px;
				text-align: center;
				font-size: 18px;
				color: #fff;
				background-color: #F8673B;
			}

			.mapdetails-anchor-intro-content {
				font-size: 14px;
				margin: 15.5px 15.75px 0 15.75px;
				padding-bottom: 20px;
			}
		}

		.mapdetails-anchor-pic {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 155px;
			z-index: 1;
			border-radius: 25px 25px 0 0;
			background-color: #fff;
			// display: flex;
			justify-content: space-around;

			ul {
				li {
					width: 43%;
					display: inline-block;
					margin: 0 2% 0 5%;
				}

				li:last-child {
					margin: 0 5% 0 2%;
				}

				img {
					width: 100%;
					float: left;
					height: 130px;
					border-radius: 7px;
					margin-top: 15px;
					display: inline-block;
				}
			}
		}
	}
</style>
