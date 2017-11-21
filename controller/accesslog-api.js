var conns = require("../database/app-pooling");
var user = require("../controller/user-api");
var getIp = require("../node_modules/getIp/getIp");
var moment = require('moment');
function checkSql(sql,url,ip,userName,starttime,endtime,boolean,page) {
    if(url!=null&&typeof (url)!='undefined'&&url!=''){
        sql=sql+" and access_url like '%"+url+"%'";
    };
    if(ip!=null&&typeof (ip)!='undefined'&&ip!='' ){
        sql=sql+" and access_ip ='"+ip+"'";
    };
    if(userName!=null&&typeof (userName)!='undefined'&&userName!=''){
        sql=sql+" and user_name like '%"+userName+"%'";
    };
    if(starttime!=null&&endtime!=null&&typeof (starttime)!='undefined'&&typeof (endtime)!='undefined'&&starttime!=''&&endtime!=''){
        sql=sql+"  and access_time BETWEEN  '"+starttime+"' AND '"+endtime+"'";
    };
    if(boolean==true) {
        sql=sql+"  ORDER BY access_id DESC limit " + ((page - 1) * 20) + ",20 ";
    };
    return sql;
}
var accLog = {
    //搜索+列表
    selectAcclog: function (req, res, next) {
        var endtime = req.query.endTime==null||typeof (req.query.endTime)=='undefined'||req.query.endTime==''?moment(new Date()).format("YYYY-MM-DD HH:mm:ss"):moment(req.query.endTime+" 23:59:59", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        var ip = req.query.ip;
        var starttime =req.query.startTime==null||typeof (req.query.startTime)=='undefined'||req.query.startTime==''?moment('1970-01-01', "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"):moment(req.query.startTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        var userName =req.query.username;
        var url =req.query.url;
        var page = req.query.page;
        var records = 0;
        var allSql ="select count(*) as counts from accesslog where 1=1";
        var keySql ="select * from  accesslog where 1=1";
        var checkSql_01=checkSql(allSql,url,ip,userName,starttime,endtime,false,page);
        var checkSql_02=checkSql(keySql,url,ip,userName,starttime,endtime,true,page);
        conns.conn.query(checkSql_01, function (err, result) {
            if (err) {
                throw err;
            }
            ;
            if (result.length > 0) {
                records = result[0].counts;
            } else {
                records = 0;
            }
            ;
            conns.conn.query(checkSql_02,
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    ;
                    if (result.length > 0) {

                        res.json({
                            page: page,
                            total: Math.ceil(records / 20),
                            records: records,
                            rows: result
                        });
                    } else {
                        res.json({error: '抱歉，找不到相关结果！'});
                    }
                });
        });

    },
    insertAcclog: function (req, res, next) {
        var accessIp = getIp.getClientIp(req);
        var accessUrl = req.body.url;
        var accessTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        //var userName = req.body.name;
        var userName = user.userName;
        console.log(userName);
        var addKeySql = "insert into accesslog (access_time,user_name,access_ip,access_url) values (?,?,?,?)";
        conns.conn.query(addKeySql, [accessTime, userName, accessIp,accessUrl],
            function (err, result) {
                if (err) {
                    throw err;
                }
                ;
                res.json({success: '提交成功'});
            });
    }
};
module.exports = accLog;