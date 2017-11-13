/**
 * Created by Administrator on 2017/11/8.
 */
var mysql = require('mysql');
//创建一个连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database:'logmanager',
    port: 3306
});
//执行sql语句
var selectSQL ="show variables like 'wait_timeout'";
    function query(){
        pool.query(selectSQL, function (err,rows, res) {
            if (err) {
                console.log("POOL ==> " + err);
                return;
            }

            console.log(new Date());
            console.log(res);
        });
    }
    query();
    setInterval(query, 5000);
