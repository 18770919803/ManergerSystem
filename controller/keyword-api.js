var conns = require("../database/app-pooling");
var url = require("url");
var keyWord = {
    //搜索+列表
    selectkey: function (req, res, next) {
        var key = req.query.key;
        var page = req.query.page;
        var records = 0;
        var allSql = typeof (key) == undefined || key == "" || key == null ? "select count(*) as counts from keyword " : "select count(*) as counts  from keyword where  key_word like ?";
        var keySql = typeof (key) == undefined || key == "" || key == null ? "select * from  keyword ORDER BY word_id DESC limit " + (page - 1) * 20 + ",20 " : "select * from  keyword where key_word like ? ORDER BY word_id DESC limit " + ((page - 1) * 20) + ",20 ";
        conns.conn.query(allSql, ['%' + key + '%'], function (err, result) {
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
            conns.conn.query(keySql, ['%' + key + '%'],
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
    insertKeyWord: function (req, res, next) {
        var key = req.body.keyword;
        var allSql = "select * from  keyword where key_word=?";
        var addKeySql = "insert into keyword (key_word) values (?)";
        conns.conn.query(allSql, [key], function (err, result) {
            if (err) {

                throw err;
            }
            ;
            if (result.length > 0) {
                res.json({error: '关键字已存在'});
            } else {
                if (typeof (key) == undefined || key == "" || key == null) {
                    res.json({error: '不能识别该关键字'});
                } else {
                    conns.conn.query(addKeySql, [key],
                        function (err, result) {
                            if (err) {
                                throw err;
                            }
                            ;
                            res.json({success: '提交成功'});
                        });
                }

            }
            ;

        });

    },
    updateKey: function (req, res, next) {
        var key = req.body.keyWord;
        var keyId = req.body.wordId;
        var allSql = "select * from  keyword where key_word=?";
        var editKeySql = "update keyword set key_word=? where word_id=?";
        conns.conn.query(allSql, [key], function (err, result) {
            if (err) {
                throw err;
            }
            ;
            if (result.length > 0) {
                res.json({error: '关键字已存在'});
            } else {
                if (typeof (key) == undefined || key == "" || key == null) {
                    res.json({error: '不能识别该关键字'});
                } else {
                    conns.conn.query(editKeySql, [key, keyId],
                        function (err, result) {
                            if (err) {
                                throw err;
                            }
                            ;
                            res.json({success: '提交成功'});
                        });
                }

            }
            ;

        });

    },
    deletekey: function (req, res, next) {
        var keyId = req.body.wordId;
        var deleKeySql = "delete from  keyword where word_id=?";
        conns.conn.query(deleKeySql, [keyId], function (err, result) {
            if (err) {
                throw err;
            }
            ;
            res.json({success: '提交成功'});
        });
    }
};
module.exports = keyWord;