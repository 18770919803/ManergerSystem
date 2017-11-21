var conns = require("../database/app-pooling");
var auditLog = require("../controller/auditLog-api");
var users = {
    userName:"",
    userPwd:"",
    state:"",
    login:function (req, res, next) {
        users.userName = req.body.userName;
        users.userPwd = req.body.userPwd;
        conns.conn.query("SELECT * FROM userinfo  where user_name=?",
            [users.userName],
            function (err, result) {
                if (err) {
                    throw err;
                }
                ;
                if (result.length > 0) {
                    result.forEach(function (v, i) {
                        if (users.userPwd == result[i].user_pwd) {
                            users.state=1;
                            res.redirect('/index');

                        } else {
                            users.state=0;
                            res.json({error: '密码错误'});
                        }
                    });
                } else {
                    users.state=0;
                    res.json({error: '用户名不存在'});
                }
                auditLog.insertAudit(req, res,users.state);
            });

    },
    updatePwd:function (req, res, next) {
    var passwordY = req.body.passwordY;
    var passwordN = req.body.passwordN;

    var editKeySql = "update userinfo set user_pwd=? where user_pwd=? and user_name=?";
    if(passwordY!=users.userPwd){
        res.json({error: '原密码错误'});
    }else{
            conns.conn.query(editKeySql, [passwordN,passwordY,users.userName],
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    ;
                    res.json({success: '提交成功'});
                });
        }

            }
}

module.exports = users;