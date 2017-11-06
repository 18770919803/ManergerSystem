## mongoDB 数据库基本操作

```
//进入环境(在bin下开命令行窗口)
>mongo
//创建数据库(数据库名称为 <mydb>)
>use mydb
//要检查当前选择的数据库使用命令 db
>db
//所创建的数据库（mydb）不存在于列表中。要显示的数据库，需要至少插入一个文档进去。
>db.movie.insert({"name":"yiibai tutorials"})
//如果想查询数据库列表，那么使用命令 show dbs.
>show dbs
//删除当前数据库
>db.dropDatabase()
```

