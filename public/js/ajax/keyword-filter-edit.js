document.onkeydown = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        keyCode = 0;
        e.returnValue = false;
        if ($('.layui-layer').length > 0) {
        } else {
            $('#editData').click();
        }
        return false;
    }
};
var wordId = '';
if (isIeEight() == true) {
    wordId = location.search.substring(location.search.indexOf('wordId=') + 7, location.search.indexOf('&'));
    var keyWord = location.search.substring(location.search.indexOf('keyWord=') + 8);
    $('#keyWord').val(unescape(keyWord));
} else {

    $(window.parent.rowObjectID).each(function (k, v) {
        $('#keyWord').val(v.keyWord);
        wordId = v.wordId;
    });
}
$(".cancel").click(function () {
    var index = window.parent.layer.getFrameIndex(window.name);
    window.parent.layer.close(index); //再执行关闭
});
$('#editData').click(function () {
    if (typeof($('#editData').attr('disabled')) == "undefined") {
        filterAjax('#editData');
        var keyWord = $('#keyWord').val();
        var data = {
            keyWord: keyWord,
            wordId: wordId
        };
        $.ajax({
            type: 'post',
            url: '/updateKey',
            data: data,
            dateType: "json",
            success: function (data) {
                var datas = data;
                if ($('.layui-layer').length <= 0) {
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
            }
        });
    }
});