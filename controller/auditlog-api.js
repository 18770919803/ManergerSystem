var conns = require("../database/app-pooling");
var user = require("../controller/user-api");
var getIp = require("../node_modules/getIp/getIp");
var moment = require('moment');
function nextStep(req, res,result,state,boolean){
    ress=result;
    auditLog.insertText(req, res,state,boolean);
}
function errHandle(err){
    console.log(err);
};
var auditLog = {
    checkSql: function (sql, module, result, ip, userName, starttime, endtime, boolean, page) {
        if (module != null && typeof (module) != 'undefined' && module != '') {
            sql = sql + " and audit_module = '" + module + "'";
        }
        ;
        if (result != null && typeof (result) != 'undefined' && result != '') {
            sql = sql + " and audit_result = '" + result + "'";
        }
        ;
        if (ip != null && typeof (ip) != 'undefined' && ip != '') {
            sql = sql + " and audit_ip ='" + ip + "'";
        }
        ;
        if (userName != null && typeof (userName) != 'undefined' && userName != '') {
            sql = sql + " and user_name like '%" + userName + "%'";
        }
        ;
        if (starttime != null && endtime != null && typeof (starttime) != 'undefined' && typeof (endtime) != 'undefined' && starttime != '' && endtime != '') {
            sql = sql + "  and audit_time BETWEEN  '" + starttime + "' AND '" + endtime + "'";
        }
        ;
        if (boolean == true) {
            sql = sql + "  ORDER BY audit_id DESC limit " + ((page - 1) * 20) + ",20 ";
        }
        ;
        return sql;
    },
    insertText: function (req, res,state,boolean) {
        var auditIp = getIp.getClientIp(req);
        var auditTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        var auditModule = ress;
        var auditAction = boolean == false ? '登陆' : '注销';
        var auditResult = state == 1 ? '成功' : '失败';
        var auditMessage = auditAction + auditResult;
        var userName = boolean==true?user.userName:req.body.userName;
        var addKeySql = "insert into auditlog (audit_time,user_name,audit_ip,audit_module,audit_action,audit_result,audit_message) values (?,?,?,?,?,?,?)";
        conns.conn.query(addKeySql, [auditTime, userName, auditIp, auditModule, auditAction, auditResult, auditMessage],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                ;
            });
    },
    selectAudit: function (req, res, next) {
        var module = decodeURIComponent(req.query.module);
        var result = decodeURIComponent(req.query.result);
        var endtime = req.query.endtime == null || typeof (req.query.endtime) == 'undefined' || req.query.endtime == '' ? moment(new Date()).format("YYYY-MM-DD HH:mm:ss") : moment(req.query.endtime + " 23:59:59", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        var ip = req.query.ip;
        var starttime = req.query.starttime == null || typeof (req.query.starttime) == 'undefined' || req.query.starttime == '' ? moment('1970-01-01', "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss") : moment(req.query.starttime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        var userName = req.query.userName;
        var page = req.query.page;
        var records = 0;
        var allSql = "select count(*) as counts from auditlog where 1=1";
        var keySql = "select * from  auditlog where 1=1";
        var checkSql_01 = auditLog.checkSql(allSql, module, result, ip, userName, starttime, endtime, false, page);
        var checkSql_02 = auditLog.checkSql(keySql, module, result, ip, userName, starttime, endtime, true, page);
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
    selectModuleId: function (req, res,module_id,state,boolean) {
        var allSql = "select module_name as moduleName from  module where module_id=?";
        var module_id = module_id;
        var returnResult = "";
        conns.conn.query(allSql, [module_id], function (err, result) {
            if (err) {
                errHandle(err);
                return;
            }
            ;
            if (result.length > 0) {
                returnResult = result[0].moduleName;
                nextStep(req, res,returnResult,state,boolean);

            } else {
                console.log('抱歉，找不到相关结果！');
            }
            ;
        });
    },
    insertAudit: function (req, res,state) {
        auditLog.selectModuleId(req, res,req.body.moduleId,state,false);
    },
    pullout: function (req, res, next) {
        auditLog.selectModuleId(req, res,req.body.moduleId,req.body.state,true);
    },
    selectModule: function (req, res, next) {
        var allSql = "select module_name as moduleName from  module";
        conns.conn.query(allSql, function (err, result) {
            if (err) {
                throw err;
            }
            ;
            if (result.length > 0) {
                res.json(result);
            } else {
                res.json({error: '抱歉，找不到相关结果！'});
            }
            ;
        });
    }
};
module.exports = auditLog;