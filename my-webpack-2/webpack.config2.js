var webpack = require("webpack");
/*CommonsChunkPlugin插件用于提取多个入口文件的公共脚本部分,然后生成一个common.js来方便多页面之间进行复用*/
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	/*插件项*/
	plugins:[commonsPlugin],
	/*页面入口文件配置*/
	entry:{
		page1:'./page1',
		page2:['./entry1','./entry2']
	},
	/*入口文件输出配置*/
	output:{
		path:'dist/js/page',
		filename:'[name].bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:'style!css'},
			// 图片文件使用 url-loader来处理，小于8kb的直接转为base64
			{test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
		]
	},
	//其它解决方案配置
	resolve:{
		/*查找module的话从这里开始查找*/
		root:"/Users/LTT/Mapplication/Downloads/webpack/my-webpack-2",//绝对路径
		// 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions:['','.js','.json','.scss'],
		// 模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias:{
			AppStore:'js/stores/AppStores.js',
			ActionType:'js/actions/ActionType.js',
			AppAction:'js/actions/AppAction.js'
		}
	}
}