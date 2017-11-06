# node.js认识学习二：__dirname获取当前模块文件所在目录的完整绝对路径

在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

在应用程序根目录下新建app.js文件，其中代码如下所示。
var testModule1=require('./test/testModule.js');

在应用程序根目录下新建一个test子目录，在该目录下新建一个testModule.js文件，其中代码如下所示。
console.log(__dirname);