document.onkeydown = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        keyCode = 0;
        e.returnValue = false;
        if ($('.layui-layer').length > 0) {
        } else {

            $('#addData').click();
        }
        return false;
    }
};
$(".cancel").click(function () {
    var index = window.parent.layer.getFrameIndex(window.name);
    window.parent.layer.close(index);
});
$('#addData').click(function () {
    if (typeof($('#addData').attr('disabled')) == "undefined") {
        filterAjax('#addData');
        var keyword = $('#keyWord').val();
        if (keyword.length > 0) {
            var data = {
                keyword: keyword
            };
            $.ajax({
                type: 'post',
                url: '/insertKeyWord',
                data: data,
                dateType: "json",
                success: function (data) {
                    if ($('.layui-layer').length <= 0) {
                        var datas = data;
                        if (typeof(datas.error) != "undefined") {
                            layer.msg("<span style='color:#000'>" + datas.error + "</span>", {
                                icon: 5,
                                area: ['220px', '70px']
                            });
                        } else {
                            layer.msg("<span style='color:#000'>提交成功!</span>", {icon: 1, area: ['220px', '70px']});
                            setTimeout(function () {
                                window.parent.location.reload();
                            }, 1000);
                        }
                    }

                },
                error: function (data) {
                    layer.msg("<span style='color:#000'>提交失败!</span>", {icon: 2, area: ['220px', '70px']});
                }
            });
        }
    }


})