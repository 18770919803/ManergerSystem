/**
 * Created by Administrator on 2017/11/8.
 */
var mysql = require('mysql');
//创建一个连接池
var conns = {
    conn: mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'logmanager',
        port: 3306
    }),
//执行sql语句
    selectSQL: "show variables like 'wait_timeout'",
    query: function () {
        conns.conn.query(conns.selectSQL, function (err, rows, res) {
            if (err) {
                console.log("POOL ==> " + err);
                return;
            }
            console.log(new Date());
            console.log(res);
        });
    }
};
//conns.query();
//setInterval(conns.query, 5000);
module.exports = conns;
