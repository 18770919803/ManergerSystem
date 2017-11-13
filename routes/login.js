var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
/* GET users listing. */

var userMsg="";

var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database:'logmanager',
    port: 3306
});
conn.query("SELECT * FROM userinfo ",function(err, rows, fields)
{
    if(err)
    {
        throw err;
    }
    userMsg=rows;
});
router.post('/',function(req,res,next){
    router.set('json spaces',4);
    var name=req.body.name;
    var age=req.body.age;
    userMsg.forEach(function(v,i){
        if(name==userMsg[i].user_name && age==userMsg[i].user_pwd){
            res.redirect('/index');
        }else{
            return false;
        }
    });

});

module.exports = router;
