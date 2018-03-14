/*
var sessions={};
var key='session_id';
var EXPIRES=20*60*1000;
var generate=function(){
    var session={};
    session.id=(new Date()).getTime()+Math.random();
    session.cookie={
        expire:(new Date()).getTime()+EXPIRES
    };
    sessions[session.id]=session;
    return session;
};
function qq (req,res){
    var id=req.cookies[key];
    if(!id){
        req.session=generate();
    }else{
        var session=sessions[id];
        if(session){
            if(session.cookie.expire>(new Date()).getTime()){
                session.cookie.expire=(new Date()).getTime()+EXPIRES;
                req.session=session;
            }else{
                delete session[id];
                req.session=generate();
            }
        }else{
            req.session=generate();
        }
    }
    handle(req,res);
};
var writeHead=res.writeHead;
res.writeHead=function(){
    var cookies=res.getHeader('set-Cookie');
    var session=serialize(key,req.session.id);
    cookies=Array.isArray(cookies)?cookies.concat(session):[cookies,session];
    res.setHeader('Set-Cookie',cookies);
    return writeHead.apply(this,arguments);
};
var handle=function(req,res){
    if(!req.session.isVisit){
        req.session.isVisit=true;
        res.writeHead(200);
        res.end("ffff");
    }else{
        res.writeHead(200);
        res.end("dsdsd");
    }
}*/
var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var identityKey = 'skey';

app.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));