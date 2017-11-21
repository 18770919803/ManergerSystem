var express = require('express');
var router = express.Router();
var userApi = require('../controller/user-api');
var accesslogApi = require('../controller/accesslog-api');
var auditlogApi = require('../controller/auditlog-api');
var keywordApi = require('../controller/keyword-api');
var url = require('url');
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


/*api*/
//user
router.post('/login',userApi.login);
router.post('/updatePwd',userApi.updatePwd);

//keyword
router.get('/selectkey',keywordApi.selectkey);
router.post('/insertKeyWord',keywordApi.insertKeyWord);
router.post('/updateKey',keywordApi.updateKey);
router.post('/deletekey',keywordApi.deletekey);
//auditlog
router.post('/selectModule',auditlogApi.selectModule);
router.get('/selectAudit',auditlogApi.selectAudit);
router.post('/insertAudit',auditlogApi.insertAudit);
router.post('/pullout',auditlogApi.pullout);

//accesslog
router.get('/selectAcclog',accesslogApi.selectAcclog);
router.post('/insertAcclog',accesslogApi.insertAcclog);
/*

router.post('/api',accesslogApi);
router.post('/api',accesslogApi);
router.post('/api',accesslogApi);
router.post('/api',accesslogApi);*/
module.exports = router;
