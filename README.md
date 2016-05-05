## 如何开发
1. 运行以下命令安装Node Modules等依赖

    `./build.sh install`
    
2. 修改配置参数

    创建node-app/config/local.properties文件, 并增加相应配置。

    所有支持的配置参数见node-app/config/default.prooperties文件
    
    local.properties中的配置会覆盖掉default.properties中的配置
    
    local.properties没有相应配置时会使用default.properties中的配置

3. 运行以下命令启动NodeServer，启动时的端口配置在上一步中指定

	`./build.sh dev`

    运行成功后可以访问 [http://localhost:8090/](http://localhost:8090), 在文件改变后，浏览器会自动刷新

4. 【可选】如果使用了MockServer，可以运行mock-server/mock.js来启动该服务

## 目录结构
将Gulp使用的node modules与NodeServer使用的node modules分别存放

```
	    ├── bower.json  
	    ├── build.sh        // 包括运维打包，依赖下载，开发调试及调用Gulp Task等命令    
	    ├── dist	        // 打包后的目录     
	    ├── gulp	        // gulp打包代码,目录中包括gulp使用到的node modules  
	    ├── mock-server	    // MockServer源代码，MockServer所依赖的node modules可以复用同级目录下的node_modules   
	    ├── node-app	    // NodeServer源代码     
	    ├── node_modules    // NodeServer使用到的node modules   
	    ├── package.json    // NodeServer使用到的node modules 清单，不包含Gulp使用的node modules    
	    ├── README	        // README       
	    └── web		        // Web资源目录  
```


## 提供的命令
### build.sh提供的命令

提供的命令主要是：

1. 透明的调用gulp的命令

2. 方便运维和开发快速下载所有的node modules，如gulp打包的依赖，NodeServer的依赖等

```
	//安装node modules依赖
	./build.sh install

	//透明的调用gulp dev命令(见下文)
	./build.sh dev	

	//供运维人员使用，防止已存在的node_modules文件不正确，将会强制删除并重新下载，然后运行gulp命令(见下文)打包
	./build.sh run

	//所有在gulp中支持的task都可以使用./build进行调用
	./build.sh [task]
```
### Gulp提供的命令

1.gulp dev

供开发人员使用，将会使用nodemon模块启动NodeServer
    
当node-app代码有改动时，会自动重启NodeServer
    
在NodeServer每次启动，包括重启时，都会对JS代码进行质量检查，检查完毕后会在web/jshint目录下生成jshint.html，可以通过[http://localhost:8080/static/jshint/jshint.html](http://localhost:8080/static/jshint/jshint.html)访问

2.gulp

供运维人员使用，将会打包出dist目录，该目录结构如下
    
```

	    ├── node-app		// 经过压缩过的NodeServer源代码
	    ├── node_modules	// NodeServer使用到的node modules
	    ├── package.json	// NodeServer使用到的node modules 清单
	    └── web			// Web资源目录
    
```

3.gulp [task]

定义自定义的Gulp Task，该Task可以通过./build.sh调用

## 运维如何操作

1. 运行以下命令打包,将会生产dist目录

	`./build.sh run`

2. 配置服务参数

	创建local.properties文件, 根据相应环境, 修改配置参数

3. 启动服务
```

	// app.sh需要在dist目录下运行，否则会有问题
	cd dist
	./app.sh

```