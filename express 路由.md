## express 路由

### 一、使用查询字符串应用路由参数

```
var express = require('express');
var url = require('url');
var app = express();
app.get("/find",function(req,res){
  var url_parents=url.parse(req.url,true);
  var query=url_parts.query;
  res.send('Finding Book:Author'+query.author+'Title'+query.title);
})

```

### 二、使用正则表达式应用路由参数(不太喜欢这种写法，如果有比较结构化的数据不建议用)

```
app.get(/^\/book\/(\w+)\:(\w+)?$/,function(req,res){
  res.send('Get Book: Chapter: ' +req.params[0]+'Page: ' +req.param[1]);
})
```

### 三、使用已定义的参数来应用路由参数

