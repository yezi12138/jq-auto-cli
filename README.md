# jq-auto-cli手脚架



## 简介

> 为了加快开发速度，优化开发流程，基于**webpack**和**node的文件操作**插件，开发的一个打包jquery项目的手脚架。



## 功能介绍：

### 1：HTML

1. html自动注入依赖

### 2：JS

1. 支持ES6
2. 支持hack兼容IE8（可选功能）

### 3：CSS

1. css预处理（目前支持sass）
2. css自动补全前缀，兼容各浏览器
3. css文件的引入方式可选： 内嵌|外链（可选择功能）

### 4：图片

1. 低于`8192`大小的图片会被转成base64，其余正常输出

### 5：全局

1. 保存用户的设置，下次直接读取配置文件（可选择功能）
2. 开发环境热更新
3. 自动生成文件夹及对应文件
4. 自动生成文件读取模板（可选择功能）



## 手脚架安装

新建任意一个文件夹，进入命令行输入:

> git clone git@github.com:yezi12138/jq-auto-cli.git

安装对应依赖：

> npm i

**最好使用淘宝镜像：**

> cnpm i



## 自动生成文件(npm run generate)

**进入到手脚架的目录下**，进入命令行模式，输入：

> npm run generate



会出现指令，按照指令输入，如下: 

```
? 请指定需要生成文件的绝对路径:  C:\Users\yeyongqin\Desktop\pan
? 请指定模板的绝对路径(没有则生成空文件): C:\Users\yeyongqin\Desktop\mod
? 请输入需要生成的文件名，以,分割(index,list,arcticle):  index,list
? 请输入需要生成的文件名后缀，以,分割(js,css,html):  js,html
```

这个指令的意思为： 以`C:\Users\yeyongqin\Desktop\mod`目录下的mod文件为模板，在`C:\Users\yeyongqin\Desktop\pan`目录下创建对应的文件



**其中mod目录下规定文件名必须为`mod`**,后缀则为想创建的对应文件。如上面输入，我们想创建两个文件夹：

**JS**: `index.js` `list.js`

**HTML**:`index.html` `list.html `

则在模板目录下,创建文件: `mod.js`   `mod.html`即可

**如果没有配置模板的路径，则创建空文件**



## 开发模式

**进入到手脚架的目录下**，进入命令行模式，输入：

> npm run dev



按照提示输入即可。



## 生产模式

**进入到手脚架的目录下**，进入命令行模式，输入：

> npm run build



按照提示输入即可。



## 配置相关:

### 指令介绍

> 1. 请输入项目的绝对路径 // 项目的路径
> 2. 请选择入口文件 // html对应的入口文件，比如想要启动index.html文件，则入口文件为index.js，名字必须一样
> 3. 请选择打包后的文件夹名 // 文件打包后的目录名字，默认dist
> 4. 是否需要兼容旧版浏览器，导入polyfill // ES6转ES5的插件
> 5. 是否使用外联样式(否则为内嵌)  // css的导入方式
> 6. 是否打包静态资源到目录: // 目前规定根目录下的images， 将images复制到打包后的目录下
> 7. 请输入静态文件的publicPath // 资源的请求前缀，会替换资源的路径
> 8. 请输入监听的端口(默认8080) // 开发模式的预览端口
> 9. 是否保存设置，生成配置文件 // 是否保存上面的配置，如果保存，会在项目根目录生成base.config.js文件，下去启动直接读取配置文件的配置



### base.config.js

```javascript
module.exports = {
	"path": "D:\\company\\client_special\\2019\\06\\kang_hong_yao_ye\\wap",
	"entry": [ // 入口文件
		{
			"name": "arcticle",
			"path": "D:\\company\\client_special\\2019\\06\\kang_hong_yao_ye\\wap\\js\\arcticle.js",
			"suffix": ".js"
		},
		{
			"name": "index",
			"path": "D:\\company\\client_special\\2019\\06\\kang_hong_yao_ye\\wap\\js\\index.js",
			"suffix": ".js"
		},
		{
			"name": "list",
			"path": "D:\\company\\client_special\\2019\\06\\kang_hong_yao_ye\\wap\\js\\list.js",
			"suffix": ".js"
		},
		{
			"name": "test",
			"path": "D:\\company\\client_special\\2019\\06\\kang_hong_yao_ye\\wap\\js\\test.js",
			"suffix": ".js"
		}
	],
	"output": "dist", // 打包目录名
	"polyfill": false, // 注入hackES6
	"insetCSS": true, // 内嵌css
	"copyToDist": true, // 复制静态资源
	"publicPath": "https://image.39.net/client/khzy/wap/", // 资源公共路径
	"port": 8080, // 开发端口
	"save": true
}
```



## 更新日志：

### **版本： 1.1.8**

- [x] 完成出版
