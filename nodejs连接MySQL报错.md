# [nodejs连接MySQL，报错：ER_ACCESS_DENIED_ERROR:Access denied for user 'root'@'localhost' (using password: YES)](http://www.cnblogs.com/ddd-bcz/p/7217202.html)

- 我网上查了很多方法，说是用户名或者密码错误，但是我通过命令行和Navicat都能直接连接MySQL，但是通过nodejs就是连接不上，命令行中报了标题的那个错误，我也问了很多人，也都不是很清楚。
- 后来我想其他方法都能连接成功，仅仅是nodejs连接不上，是不是nodejs连接还需额外的配置，看了nodejs文档发现，并不需要。
- 我把我之前的 npm install [mysql@2.0.0-alpha9](mailto:mysql@2.0.0-alpha9) 卸载了，不带版本号进行了安装，发现就可以成功通过nodejs连接MySQL。