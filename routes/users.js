var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url = require('url');
var async = require('async');
//login page
router.get('/', function(req, res, next) {
    res.render('login');
});
//home page
router.get("/index",function(req, res, next) {
    res.render('index');
});
//Log access  page
router.get('/ajax/access-log', function(req, res, next) {
    res.render('ajax/access-log');
});
//log audit page
router.get('/ajax/audit-log', function(req, res, next) {
    res.render('ajax/audit-log');
});
// edit password page
router.get('/ajax/edit-password', function(req, res, next) {
    res.render('ajax/edit-password');
});
// filter keyword page
router.get('/ajax/keyword-filter', function(req, res, next) {
    res.render('ajax/keyword-filter');
});
// add filter keyword page
router.get('/ajax/keyword-filter-add', function(req, res, next) {
    res.render('ajax/keyword-filter-add');
});
//edit filter keyword page
router.get('/ajax/keyword-filter-edit', function(req, res, next) {
    res.render('ajax/keyword-filter-edit');
});

var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database:'logmanager',
    port: 3306
});
router.post('/login',function(req,res,next){
    var userName=req.body.userName;
    var userPwd=req.body.userPwd;
    conn.query("SELECT * FROM userinfo  where user_name=?",
        [userName],
        function(err, result)
    {
        if(err)
        {
            throw err;
        };
        if(result.length>0){
            result.forEach(function(v,i){
                if( userPwd==result[i].user_pwd){
                    res.redirect('/index');
                }else{
                    res.json({ error: '密码错误' });
                }
            });
        }else{
            res.json({ error: '用户名不存在' });
        }
    });
});
module.exports = router;
