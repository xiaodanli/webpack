var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	devtool:'source-map',//配置生成source  map，选择合适的选项
	devServer:{
		//contentBase:"./public",//本地服务器所加载的页面所在的目录
		colors:true,//终端中输出结果为彩色
		//historyApiFallback:true,//不跳转
		inline:true,//实时刷新
		port:1235,  //设置默认监听端口，如果省略，默认为8080
		hot:true
	},
	plugins: [
        new ExtractTextPlugin("[name].css",{allChunks:true}) 
        /*new ExtractTextPlugin([id:string],filename:string,[options])
		1.该插件实例的唯一标志，一般不会传的，起自己会生成
		2.文件名：可以是[name]、[id]、[contenthash]
			[name]:将会和entry中的chunk文件名一样
			[id]:将会和entry中chunk的id一样
			[contenthash]:根据内容生成的hash值

			1》在entry:'./main.js',只有一个
			new ExtractTextPlugin("style.bundle.css") 
			在这里指定了一个固定的名字，那么将会生成style.bundle.css文件
			2》在entry有多个，需要使用[name] [id]这种方式来命名
			entry:{
				"script":'./src/entry.js',
				"bundle":'./src/entry2.js'
			}
			new ExtractTextPlugin("[name].css")
			这时候变会生成两个css文件，一个是script.css，另一个是bundle.css
			那些[id]、[contenthash]也是一个道理。
		3.options
			allchunk:是否将所有额外的chunk都压缩成一个文件
			disabled:禁止使用插件
			1》allchunk将所有分离的文件的样式全都压缩到一个文件上
		*/,
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false,
			},
			sourceMap:true
		}),
		new webpack.optimize.CommonsChunkPlugin({name: "commons", filename: "commonsjs.js"})
	],
	entry:{
		"script":'./src/entry1.js',
		"bundle":'./src/entry2.js'
	},
	output:{
		path:'./dist',//输出文件的保存路径  "__dirname"是nodejs中的一个全局变量，它指向当前执行脚本所在的目录
		filename:'[name].js'//输出文件的名称
	},
	module:{
		loaders:[
			{	/* test:一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
				   loader：loader的名称（必须）
				   include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
				   query：为loaders提供额外的设置选项（可选）
				*/
				/*loaders:['babel?presets[]=es2015'],*/
				test:/\.js$/,
				loader:'babel',
				query:{
					presets:['es2015']
				},
				exclude:/node_modules/
			},
			{ 
				test: /\.css$/, 
				loader: ExtractTextPlugin.extract(['css','postcss']) 
			},
			{
				test:/\.(jpg|png|gif|svg)$/i,
				loader:[
					
				]
			}
		]
	},
	postcss: [autoprefixer()]
}