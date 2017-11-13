function loadData(datas){
        $.ajax({
            type: 'post',
            url: '/selectAudit',
            data: datas,
            dateType: "json",
            success: function (data) {
                clear();
                var datas=JSON.parse(data);
                var pagesNum=Number(datas.page);
                if ( datas.error=='什么都没找到') {
                    layer.alert("<span style='color:#000'>抱歉，找不到相关结果！</span>", { icon: 5 });
                }
                var tableWidth=$('#widget-grid').width();
                var dataTitle =[ '序号','时间', '用户名', 'IP', '模块', '结果', '消息'];
                var trWidth=Math.ceil((tableWidth-90)/dataTitle.length)-3;
                $('#ID_gridTable table').attr('style','width:'+tableWidth+'px');
                $('#ID_gridPager').attr('style','width:'+tableWidth+'px');
                $.each(dataTitle, function (index, value) {
                    addHead(index,value,trWidth);
                });
                $.each(datas.rows, function (index, value) {
                    var time= exchangeTime(datas.rows[index].auditTime);
                    addBody(index, index+(pagesNum*20-19),"90");
                    addBody(index,time ,trWidth);
                    addBody(index, datas.rows[index].userName,trWidth);
                    addBody(index, datas.rows[index].auditIp,trWidth);
                    addBody(index, datas.rows[index].auditModule,trWidth);
                    addBody(index, datas.rows[index].auditResult,trWidth);
                    addBody(index, datas.rows[index].auditMessage,trWidth);
                });
                footTable(datas.page, datas.total, datas.records);
                ieChangePageCss(datas.page,datas.total);
            },
            error: function (data) {
            }
        });
    };
addDele();
document.onkeydown=function(event){
    var e=event||window.event;
    var keyCode=e.keyCode||e.which;
    if(keyCode==13){
        keyCode=0;
        e.returnValue=false;
        if($('.layui-layer').length>0){

            $('.layui-layer-btn0').click();

        }else{

            $('#searchBtn').click();
        }
        return false;
    }
};
auditSlide();
function auditSlide(){
    $.ajax({
        type:'post',
        url:'/selectModule',
        success:function(data){
            var data=JSON.parse(data);
            $.each(data, function(index,obj){

                var  moduleName = data[index].moduleName;
                if(moduleName=='全部'){
                    $("#module").append("<option value="+ moduleName+" selected>"+ moduleName+"</option>");
                }else{
                    $("#module").append("<option value="+ moduleName+">"+ moduleName+"</option>");
                }

            })


        }
    });
}
$('#startTime').datetimepicker({
    todayBtn: "linked",
    autoclose: true,
    language: 'ch',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    clearBtn: true,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
}).on('changeDate', function (e) {
    var startTime = e.date;
    $('#endTime').datetimepicker('setStartDate', startTime);
});
$('#endTime').datetimepicker({
    todayBtn: "linked",
    autoclose: true,
    language: 'ch',
    clearBtn: true,
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
}).on('changeDate', function (e) {
    var endTime = e.date;
    $('#startTime').datetimepicker('setEndDate', endTime);
});
if(isIeEight() == true||isIeSeven()==true||isIeSix()==true){
    initForm();
    var module =encodeURIComponent('全部');
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var username = $("#username").val();
    var ip = $("#ip").val();
    var opt = $("#opt").val();
    var result = encodeURIComponent($("#result").val());
    var page=$('#current').text();
    var data = {
        endtime: endTime,
        ip: ip,
        starttime: startTime,
        action: opt,
        module:module,
        result:result,
        userName: username,
        page:1,
        isIe:true
    };
    loadData(data);
    $('#next_ID_gridPager>span').click(function(){
        if(typeof($('#next_ID_gridPager>span').attr('disabled'))=="undefined"){
            filterAjax('#next_ID_gridPager>span');
            if(Number($('#current').text())>=Number($('#total').text())){
                $('#next_ID_gridPager').removeClass('ui-corner-all').addClass('ui-state-disabled');
                $('#prev_ID_gridPager').removeClass('ui-state-disabled').addClass('ui-corner-all');
            }else{
                var module = encodeURIComponent($("#module").val());
                var startTime = $("#startTime").val();
                var endTime = $("#endTime").val();
                var username = $("#username").val();
                var ip = $("#ip").val();
                var opt = $("#opt").val();
                var result = encodeURIComponent($("#result").val());
                var page =Number($('#current').text())+1;
                var data = {
                    endtime: endTime,
                    ip: ip,
                    starttime: startTime,
                    action: opt,
                    result: encodeURI(result),
                    module: encodeURI(module),
                    userName: username,
                    page:page,
                    isIe:true
                };
                loadData(data);}}
    });
    $('#prev_ID_gridPager>span').click(function(){

        if(typeof($('#prev_ID_gridPager>span').attr('disabled'))=="undefined"){
            filterAjax('#prev_ID_gridPager>span');
            if(Number($('#current').text())<=1){
                $('#prev_ID_gridPager').removeClass('ui-corner-all').addClass('ui-state-disabled');
                $('#next_ID_gridPager').addClass('ui-corner-all').removeClass('ui-state-disabled');
            }else{
                var module = encodeURIComponent($("#module").val());
                var startTime = $("#startTime").val();
                var endTime = $("#endTime").val();
                var username = $("#username").val();
                var ip = $("#ip").val();
                var opt = $("#opt").val();
                var result = encodeURIComponent($("#result").val());
                var page =Number($('#current').text())-1;
                var data = {
                    endtime: endTime,
                    ip: ip,
                    starttime: startTime,
                    action: opt,
                    result: result,
                    module: module,
                    userName: username,
                    page:page,
                    isIe:true
                };
                loadData(data);}}
    });
}else{
    var pagefunction = function () {
        loadScript("js/plugin/jqgrid/jquery.jqGrid.min.js", reloadGrid);
        function reloadGrid() {
            $("#ID_gridTable").jqGrid({
                url: '/selectAudit',
                postData: {
                    module:encodeURIComponent('全部'),
                    result:encodeURIComponent('全部'),
                    isIe:false
                },
                datatype: "json",
                height: 'auto',
                colNames: [ '时间', '用户名', 'IP', '模块', '结果', '消息'],
                colModel: [
                    {name: 'auditTime', index: 'auditTime', editable: true,formatter:function(cellvalue, options, rowObject){
                        return exchangeTime(cellvalue);
                    }},
                    {name: 'userName', index: 'userName', editable: true},
                    {name: 'auditIp', index: 'auditIp', editable: true},
                    {name: 'auditModule', index: 'auditModule', editable: true},
                    {name: 'auditResult', index: 'auditResult', editable: true},
                    {name: 'auditMessage', index: 'auditMessage', editable: true},

                ],
                pager: '#ID_gridPager',
                sortable:true,
                toolbarfilter: true,
                viewrecords: true,
                sortorder: "asc",
                rowNum: 20,
                rownumbers:true,
                caption: "数据表",
                autowidth: true,
                page:page,
                recordtext:"{0} - {1} 共 {2} 条",
                pgtext:"第 {0} 页 共 {1} 页",
                jsonReader: {
                    root: 'rows',
                    page: 'page',
                    total: 'total',
                    records: 'records',
                    repeatitems: false
                },
                gridComplete: function () {
                    $('#ID_gridTable tr>td:first').attr('style','height:0px;width:100px;');
                    $('#ID_gridTable_rn').attr('style','height:0px;width:100px;');
                    $('.ui-pg-input').css({'border':'none','text-align':'center'});
                    $('.ui-pg-input').attr('disabled',true);
                    if ($("#ID_gridTable>tbody>tr").length <= 1) {
                        layer.alert("<span style='color:#000'>抱歉，找不到相关结果！</span>", { icon: 5 });
                    }}
            }).trigger("reloadGrid"); //重新载入;
        };
        notieChangePageCss();
        $(window).on('resize.jqGrid', function () {
            jQuery("#ID_gridTable").jqGrid('setGridWidth', $("#content").width());
        });
    }
}
loadScript("js/plugin/jqgrid/grid.locale-en.min.js", pagefunction);
var config = {
    load: function () {
        var module = encodeURIComponent($("#module").val());
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        var username = $("#username").val();
        var ip = $("#ip").val();
        var opt = $("#opt").val();
        var result = encodeURIComponent($("#result").val());
        var page=$('#current').text();
        var data = {
            endtime: endTime,
            ip: ip,
            starttime: startTime,
            action:opt,
            result:result,
            module:module,
            userName: username,
            page:1,
            isIe:false
        };
        if(isIeEight() == true||isIeSeven()==true||isIeSix()==true){
            var data = {
                endtime: endTime,
                ip: ip,
                starttime: startTime,
                action:opt,
                result:result,
                module:module,
                userName: username,
                page:1,
                isIe:true
            };
            loadData(data);
        }else{
            $("#ID_gridTable").jqGrid('setGridParam', {
                datatype: 'json',
                postData: data, //发送数据
                page: 1
            }).trigger("reloadGrid"); //重新载入
        }
    }
};
$('#searchBtn').click(function () {
    if(typeof($('#searchBtn').attr('disabled'))=="undefined"){
        filterAjax('#searchBtn');
        config.load();}
});
