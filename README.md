<p align="center">
  <a href="https://github.com/NidhoggDJoking" target="_blank">
    <img width="130" src="https://github.com/NidhoggDJoking/VueCli/blob/master/src/image/Logo/Fox.png" alt="logo">
  </a>
</p>

<h1 align="center">勝利の法則は決まった！</h1>

### 官方文档链接：

 [文档](https://uniapp.dcloud.io/#) &nbsp; <a> 丨 </a> &nbsp; [API](https://uniapp.dcloud.io/api/#) &nbsp; <a> 丨 </a> &nbsp; [配置](https://uniapp.dcloud.io/collocation/pages)
 
</br>

#### HbuilderX 主题自定义v1.0

```
"[Zero]": {
	"toolBar.background": "#2c3535",
	"sideBar.background":"#282c35",
	"sideBar.border":"#b33939",
	"minimap.handle.background":"#55E6C1",
	"statusBar.foreground":"#fff",
	"statusBar.background":"#22a6b3",
	"scrollbarSlider.background":"#FD7272",
	"editorGroup.border":"#247517",
	"tab.activeBackground":"#1d1d1d",
	"tab.inactiveBackground":"#003850",
	"tab.hoverBackground":"#006f9e",
	"tab.activeBorder":"#000",
	"tab.border":"#004765",
	"terminal.background":"#25732e"
},

```
#### 基本目录结构

```
	main.js：Vue初始化入口文件.
	
	pages目录：业务页面文件存放目录.
	
	components目录：组件文件存放目录.
	
	pages.json：配置页面路由、导航条、选项卡等页面类信息.
	
	manifest.json：配置应用名称、appid、logo、版本等打包信息.
	
	App.vue：应用配置，用来配置App全局样式以及监听应用的生命周期.
	
	static目录：存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此.

```

#### 注意事项
```
	div 改成 view
	
	ul、li没有了，都用view替代
	
	span、font 改成 text
	
	a 改成 navigator
	
	img 改成 image
	
	input 还在，但type属性改成了confirmtype
	
	select 改成 picker
	
	iframe 改成 web-view
	
	form、button、checkbox、radio、label、textarea、canvas、video 这些还在。
```

#### 目录结构

```
	┌─components            uni-app组件目录
	│  └─comp-a.vue         可复用的a组件
	├─hybrid                存放本地网页的目录，详见
	├─platforms             存放各平台专用页面的目录，详见
	├─pages                 业务页面文件存放的目录
	│  ├─index
	│  │  └─index.vue       index页面
	│  └─list
	│     └─list.vue        list页面
	├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
	├─wxcomponents          存放小程序组件的目录，详见
	├─main.js               Vue初始化入口文件
	├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
	├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
	└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见

```

#### 微信小程序方面

```
	uni.login 失效
	使用小程序自身方法：
	<button @getuserinfo="onGotUserInfo" open-type="getUserInfo">登录</button>
	接收：
	onGotUserInfo(res) {}

``` 
   
#### 页面生命周期
 
```
		onLoad() {
			console.log('监听页面加载，其参数为上个页面传递的数据，参数类型为Object(用于页面传参)');
		},
		onShow() {
			console.log('监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面');
		},
		onReady(){
			console.log('监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发');
		},
		onHide(){
			console.log('监听页面隐藏');
		},
		onUnload(){
			console.log('监听页面卸载');
		},
		
```