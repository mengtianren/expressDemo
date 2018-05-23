# expressDemo

* 博客管理接口基本搭建完毕 采用express+mongoose+mongoodb数据库实现接口api调用

# 如果需要服务器部署 建议使用pm2
# 下载完成之后
* ---确认本机或者服务器装有mongoodb,确保数据库能够正常运行
* ---确认根目录下db文件夹db.js里面mongoodb的地址及验证是否为自己使用的地址
* ---确认根目录下server.js里面session缓存用户token的mongodb路径是否为自己使用的地址

* npm install 安装依赖 或者使用yarn来安装
* npm start 运行项目

*项目采用部分es6语法并使用babel进行编译
* ---使用body-parser解析post请求里面的数据
* ---使用express-session缓存用户token
* ---使用cookie-parser 把服务器对应session的cookie缓存客户端
* ---使用connect-mongo 把用户登陆token放到mongoodb里面的某一个库里面

# 由于pm2不支持es6 import语法 所以要在本地编译一下 babel es2016 -d es2015/npm run build

# 部分用户接口
* /api/vi/user/register POST 注册接口params: phone,password
* /api/vi/user/login POST 注册接口params: phone,password
* /api/vi/user/getuser GET 获取博主信息接口 params:无
* /api/vi/user/list GET 获取所有用户信息接口 params:无、


#接口未梳理完 文档待补充
