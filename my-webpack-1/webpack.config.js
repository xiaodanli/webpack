var webpack = require("webpack");
/*CommonsChunkPlugin插件用于提取多个入口文件的公共脚本部分*/
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	/*插件项*/
	plugins:[commonsPlugin],
	/*项目入口文件*/
	entry:'./entry.js',
	/*项目出口文件*/
	output:{
		path:__dirname,
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:'style!css'}
		]
	},
	plugins:[
		new webpack.BannerPlugin('This file is created by xiaodan')
	]
}