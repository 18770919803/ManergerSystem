var stateKey = "";

function stateKeyEvent() {
    stateKey = true;
    if (stateKey == true) {
        stateKey = false;
        document.onkeydown = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == 13) {
                keyCode = 0;
                e.returnValue = false;
                if ($('.layui-layer').length > 0) {
                    $('.layui-layer-btn0').click();
                } else {
                    $('#searchBtn').click();
                }
                return false;
            }
            stateKey = true;
        }
    }
}

stateKeyEvent();

function loadData(data) {
    $.ajax({
        type: 'post',
        url: '/selectkey',
        data: data,
        dateType: "json",
        success: function (data) {
            clear();
            var datas = JSON.parse(data);
            var pagesNum = Number(datas.page);
            if (datas.error == '什么都没找到') {
                layer.alert("<span style='color:#000'>抱歉，找不到相关结果！</span>", {icon: 5});
            }
            var tableWidth = $('.index-main-header').width();
            var dataTitle = ['序号', '关键字', '时间', '操作'];
            var trWidth = Math.ceil((tableWidth - 90) / dataTitle.length) - 3;
            $('#ID_gridTable table').attr('style', 'width:' + tableWidth + 'px');
            $('#ID_gridPager').attr('style', 'width:' + tableWidth + 'px');
            $.each(dataTitle, function (index, value) {
                addHead(index, value, trWidth);
            });
            $.each(datas.rows, function (index, value) {
                var time = exchangeTime(datas.rows[index].word_time);
                var be = "<button class='btn btn-xs btn-primary editbtn'  onclick=\"edit('" + datas.rows[index].word_id + "','" + datas.rows[index].key_word + "')\">编辑</button>";
                var de = "<button class='btn btn-xs btn-danger delebtn'  onclick='deleteone(" + datas.rows[index].word_id + ")';>删除</button>";
                var str = be + de;
                addBody(index, index + (pagesNum * 20 - 19), "90");
                addBody(index, datas.rows[index].key_word, trWidth);
                addBody(index, time, trWidth);
                addBody(index, str, trWidth);
            });

            footTable(datas.page, datas.total, datas.records);
            ieChangePageCss(datas.page, datas.total);
        }
    });
}

var rowObjectID = '';

function deleteone(wordId) {

    if (typeof($('.delebtn').attr('disabled')) == "undefined") {
        filterAjax('.delebtn');
        layer.confirm('<span style="color:#000">您确定要删除？</span>', {
            btn: ['确定', '取消'],
            offset: ['50%!important', '50%!important']
        }, function () {
            $.post("/deletekey", {wordId: wordId}, function (data) {
                layer.msg("<span style='color:#000'>操作成功！</span>", {icon: 1, time: 2000, area: ['220px', '70px']});
                if (isIeEight() == true || isIeSeven() == true || isIeSix() == true) {
                    window.parent.location.reload(); //重新载入
                } else {
                    pagefunction(); //重新载入
                }
                ;
            })
        })
    }
}

function edit(wordId, keyWord) {
    if (typeof($('.editbtn').attr('disabled')) == "undefined") {
        filterAjax('.editbtn');
        if ($('.layui-layer').length <= 0) {
            var data = {
                wordId: wordId,
                key_word: keyWord
            };
            rowObjectID = data;
            layer.open({
                title: '编辑',
                type: 2,
                area: ['260px', '240px'],
                offset: ['300px!important', '800px!important'],
                fix: false, //不固定
                maxmin: true,
                scrollbar: false,
                content: 'ajax/keyword-filter-edit?wordId=' + wordId + '&&keyWord=' + escape(keyWord)
            });
        }
    }
}

if (isIeEight() == true || isIeSeven() == true || isIeSix() == true) {
    initForm();
    $('#searchBtn').css('diplay', 'inline-block');
    var name = $("#name").val();
    var page = $('#current').text();
    var data = {
        key: name,
        page: 1,
        isIe: true
    };
    loadData(data);
    $('#next_ID_gridPager>span').click(function () {
        if (typeof($('#next_ID_gridPager>span').attr('disabled')) == "undefined") {
            filterAjax('#next_ID_gridPager>span');
            if (Number($('#current').text()) >= Number($('#total').text())) {
                $('#next_ID_gridPager').removeClass('ui-corner-all').addClass('ui-state-disabled');
                $('#prev_ID_gridPager').removeClass('ui-state-disabled').addClass('ui-corner-all');
            } else {

                var name = $("#name").val();
                var page = Number($('#current').text()) + 1;
                var data = {
                    key: name,
                    page: page,
                    isIe: true
                };
                loadData(data);
            }
        }
    });
    $('#prev_ID_gridPager>span').click(function () {
        if (typeof($('#prev_ID_gridPager>span').attr('disabled')) == "undefined") {
            filterAjax('#prev_ID_gridPager>span');
            if (Number($('#current').text()) <= 1) {
                $('#prev_ID_gridPager').removeClass('ui-corner-all').addClass('ui-state-disabled');
                $('#next_ID_gridPager').addClass('ui-corner-all').removeClass('ui-state-disabled');
            } else {
                var name = $("#name").val();
                var page = Number($('#current').text()) - 1;
                var data = {
                    key: name,
                    page: page,
                    isIe: true
                };
                loadData(data);
            }
        }
    });

} else {
    var pagefunction = function () {
        loadScript("js/plugin/jqgrid/jquery.jqGrid.min.js", reloadGrid);

        function reloadGrid() {
            $("#ID_gridTable").jqGrid({
                url: '/selectkey',
                datatype: "json",
                height: 'auto',
                colNames: ['关键词', '时间', '操作'],
                colModel: [
                    {name: 'key_word', index: 'key_word', editable: true},
                    {
                        name: 'word_time',
                        index: 'id',
                        editable: true,
                        formatter: function (cellvalue, options, rowObject) {
                            return exchangeTime(cellvalue);
                        }
                    },
                    {
                        name: 'act',
                        index: 'act',
                        sortable: false,
                        formatter: function (cellvalue, options, rowObject) {

                            var wordId = rowObject.word_id;
                            var keyWord = rowObject.key_word;

                            var be = "<button class='btn btn-xs btn-default editbtn' data-original-title='Edit Row' onclick=\"edit('" + wordId + "','" + keyWord + "')\"><i class='fa fa-pencil'></i></button>";
                            var de = "<button class='btn btn-xs btn-default delebtn'  data-original-title='del' onclick='deleteone(" + wordId + ")';><i class='fa fa-times'></i></button>";
                            var str = be + de;
                            return str;
                        }
                    }
                ],
                rowNum: 20,
                pager: '#ID_gridPager',
                sortable: true,
                sortorder: "asc",
                toolbarfilter: true,
                rownumbers: true,
                viewrecords: true,
                caption: "数据表",
                multiselect: false,
                autowidth: true,
                page: page,
                recordtext: "{0} - {1} 共 {2} 条",
                pgtext: "第 {0} 页 共 {1} 页",
                jsonReader: {
                    root: 'rows',
                    page: 'page',
                    total: 'total',
                    records: 'records',
                    repeatitems: false
                },
                gridComplete: function () {
                    $('#ID_gridTable tr>td:first').attr('style', 'height:0px;width:100px;');
                    $('#ID_gridTable_rn').attr('style', 'height:0px;width:100px;');
                    $('.ui-pg-input').css({'border': 'none', 'text-align': 'center'});
                    $('.ui-pg-input').attr('disabled', true);
                    if ($("#ID_gridTable>tbody>tr").length <= 1) {
                        layer.alert("<span style='color:#000'>抱歉，找不到相关结果！</span>", {icon: 5});
                    }
                }
            }).trigger("reloadGrid"); //重新载入;
        };
        notieChangePageCss();

        $(window).on('resize.jqGrid', function () {
            jQuery("#ID_gridTable").jqGrid('setGridWidth', $("#content").width());
        });

    };
    loadScript("js/plugin/jqgrid/grid.locale-en.min.js", pagefunction);
}
var config = {
    add: function () {
        if ($('.layui-layer').length <= 0) {
            layer.open({
                title: '添加',
                type: 2,
                area: ['260px', '240px'],
                offset: ['300px!important', '800px!important'],
                fix: false, //不固定
                maxmin: true,
                scrollbar: false,
                content: 'ajax/keyword-filter-add'
            });
        }
    },
    load: function () {
        var name = $("#name").val();
        var page = $('#current').text();

        if (isIeEight() == true || isIeSeven() == true || isIeSix() == true) {
            var data = {
                key: name,
                page: 1,
                isIe: true

            };
            loadData(data);
        } else {
            $("#ID_gridTable").jqGrid('setGridParam', {
                datatype: 'json',
                postData: {
                    key: name,
                    page: 1,
                    isIe: false

                },
                page: 1
            }).trigger("reloadGrid");
        }

    }
};
$('#addBtn').click(function () {
    if (typeof($('#addBtn').attr('disabled')) == "undefined") {
        filterAjax('#addBtn');
        config.add();
    }
});
$('#searchBtn').click(function () {
    if (typeof($('#searchBtn').attr('disabled')) == "undefined") {
        filterAjax('#searchBtn');
        config.load();
    }
});
