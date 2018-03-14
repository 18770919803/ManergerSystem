function checkUser(a, b) {
    if (isIeEight() == true || isIeSeven() == true || isIeSix() == true) {
        if ($('#' + b).parents('label').next('em.invalid').text() == '' || $('#' + b).parents('label').next('em.invalid').text() == null) {
            $('#' + b).parents('label').next('em.invalid').remove();
            $('#' + b).parents('label').after("<em for=" + b + "  class='invalid'style='font-style: normal;font-size: 11px;line-height: 15px;color:#d56161;'>" + a.error + "</em>");
        } else {
            $('#' + b).parents('label').next('em.invalid').text(a.error).css({
                'font-style': 'normal',
                'font-size': ' 11px',
                'line-height': '15px',
                'color': '#d56161',
                'display': 'inline'
            });
        }
    } else {

        if ($('#' + b).parents('.checking').find('em.invalid').text() == '' || $('#' + b).parents('.checking').find('em.invalid').text() == null) {
            $('#' + b).parents('.checking').find('em.invalid').remove();
            $('#' + b).parents('.checking').append("<em for=" + b + "  class='invalid'style='font-style: normal;font-size: 11px;line-height: 15px;color:#d56161;'>" + a.error + "</em>")
        } else {

            $('#' + b).parents('.checking').find('em.invalid').text(a.error).css({
                'font-style': 'normal',
                'font-size': ' 11px',
                'line-height': '15px',
                'color': '#d56161',
                'display': 'inline'
            });
        }
    }
}
var pageRandom = function () {
    const STR_START_INDEX = 2;
    const STR_END_INDEX = 12;
    var str = Math.random().toString();
    return encodeURIComponent(str.substring(STR_START_INDEX, STR_END_INDEX));

};
document.onkeyup = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        $('#submit').click();
    }
};
var config = {
    username: '',
    password: '',
    remerber: '',
    audiData: 3,
    getCookie: function (c_name) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
        return ''
    },
    setCookie: function (c_name, value, expiredays) {/*存值到cookie*/
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
    },
    checkCookie: function () {
        data = config.getCookie('data');
        var tem = data.split(',');
        if (tem[2] == 1) {
            if (tem[0] != null && tem[0] != '') {
                $('#username').val(tem[0]);
                $('#password').val(tem[1]);
            }
        } else {
            if (tem[0] != null && tem[0] != '') {
                $('#username').val(tem[0]);
            }
        }
    }
};
runAllForms();
config.checkCookie();
$(function () {
    checkPassword('username', '用户名');
    checkPassword('password', '密码');
    $("#login-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 1,
                maxlength: 20
            },
            password: {
                required: true,
                minlength: 10,
                maxlength: 16
            }
        },
        messages: {
            username: {
                required: '请输入用户名',
                username: '请输入有效的用户名'
            },
            password: {
                required: '请输入密码'
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    $('#submit').click(function () {
        if (typeof($('#submit').attr('disabled')) == "undefined") {
            filterAjax('#submit');
            config.username = $('#username').val();
            config.password = $('#password').val();
            config.remerber = '';
            if ($("#remerber").is(":checked")) {
                config.remerber = 1;
            } else {
                config.remerber = 0;
                config.password = ' ';
            }
            var datas = {
                userName: config.username,
                userPwd: $('#password').val(),
                moduleId: config.audiData
            };
            if ($('.invalid').length <= 0 || $('em.invalid').text().length <= 0 || $('em.invalid').css('display') == 'none') {
                $.ajax({
                    type: 'post',
                    url: '/login',
                    data: datas,
                    async:false,
                    dateType: "json",
                    success: function (a) {
                        $('#submit').removeAttr("disabled");
                        if (a.error == '用户名不存在') {
                            checkUser(a, 'username');

                        } else if (a.error == '用户名错误') {
                            checkUser(a, 'username');

                        } else if (a.error == '密码错误') {
                            checkUser(a, 'password');

                        } else {
                            var nd = pageRandom();
                            config.setCookie('data', config.username + ',' + config.password + ',' + config.remerber, 365);
                            window.location = 'index#ajax/keyword-filter?nd=' + nd;
                        }
                    },
                    error: function () {
                        $('#submit').removeAttr("disabled");
                        if ($('.layui-layer').length <= 0) {

                            layer.msg("<span style='color:#000'>服务器连接失败！请稍后！</span>", {
                                icon: 2,
                                time: 2000,
                                area: ['260px', '70px']
                            });
                        }
                    }

                });
            }
        }
    })
});