if(isIeSeven()==true){
    $("#login-form1 input").attr("style","width:90%!important;line-height:40px");
}else if(isIeSix()==true){
    $("#login-form1 .input").attr("style","position:static!important");
    $("#login-form1 i").remove();
    $("#login-form1 b").remove();
}
function checkUser(a,b){
    if($('#'+b).parents('.checking').find('em.invalid').text()==''||$('#'+b).parents('.checking').find('em.invalid').text()==null){
        $('#'+b).parents('.checking').find('em.invalid').remove()&&$('#'+b).parents('.checking').append("<em for="+b+"  class='invalid'style='font-style: normal;font-size: 11px;line-height: 15px;color:#d56161;'>"+a.error+"</em>")
    }else{
        $('#'+b).parents('.checking').find('em.invalid').text(a.error).css({'font-style': 'normal','font-size':' 11px','line-height': '15px','color':'#d56161','display':'inline'});
    }
}
document.onkeyup=function(event){
    var e=event||window.event;
    var keyCode=e.keyCode||e.which;
    if(keyCode==13){
        keyCode=0;
        e.returnValue=false;
        $('#submit').click();
        return false;
    }
};
runAllForms();
$(function () {
    var passwordY = '';
    var passwordR = '';
    var passwordN = '';
    $("#login-form1").validate({
        rules: {
            passwordY: {
                required: true,
                minlength: 10,
                maxlength: 16
            },
            passwordN: {
                required: true,
                minlength: 10,
                maxlength: 16
            },
            passwordR: {
                required: true,
                minlength: 10,
                maxlength: 16
            }
        },
        messages: {
            passwordY: {
                required: '请输入密码',
                passwordY:'密码为10-16位！'
            },passwordN: {
                required: '请输入密码',
                passwordN:'密码为10-16位！'
            },passwordR: {
                required: '请输入密码',
                passwordR:'密码为10-16位！'
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    var check = function (a,b) {
        var checkN = /[0-9]{1,}/g;
        var checkSz = /[a-z]{1,}/g;
        var checkBz = /[A-Z]{1,}/g;
        var checkS = /[^a-zA-Z0-9\u4E00-\u9FA5\s]{1,}/g;
        var checkB = /\s/g;
        if (checkN.test(a) == true && checkSz.test(a) == true && checkBz.test(a) == true && checkS.test(a) == true && checkB.test(a) == false) {
            var data = {
                passwordY: b,
                passwordN: a

            }
            $.ajax({
                type: 'post',
                url: '/updatePwd',
                dateType: 'json',
                data: data,
                success: function (data) {
                    var data=JSON.parse(data);
                    if (data.error == '原密码错误') {
                        checkUser(data,"passwordY");
                        // layer.msg("<span style='color:#000'>原密码错误！</span>", {icon: 0, time: 2000});
                    } else {
                        layer.msg("<span style='color:#000'>操作成功!</span>", {icon: 1, time: 2000,area: ['220px', '70px']});
                        window.setTimeout(function(){
                            window.location='./login';
                        },2000);

                    }
                },
                error:function(data){
                    if($('.layui-layer').length<=0){

                        layer.msg("<span style='color:#000'>服务器连接失败！请稍后！</span>", {icon: 2, time: 2000,area: ['260px', '70px']});
                    }


                }
            });
        } else if (a.length < 10 || a.length > 16) {
            var data1={
                error:'密码长度必须在10~16位'
            };
            checkUser(data1,"passwordN");

        } else {
            var data2={
                error:'至少包含1个大写字母、1个小写字母、1个特殊字符、1个数字且不能有空格'
            };
            checkUser(data2,"passwordN");

        }
    };
    $('#submit').click(function () {
        if(typeof($('#submit').attr('disabled'))=="undefined"){
            filterAjax('#submit');
            passwordY = $('#passwordY').val();
            passwordR = $('#passwordR').val();
            passwordN = $('#passwordN').val();
            if (passwordR != passwordN) {
                var data={
                    error:'新密码与重复密码不一致，请重新输入！'
                };
                checkUser(data,"passwordR");
            } else {
                check(passwordN,passwordY);
            }}
    });
    checkPassword('passwordY','原密码');
    checkPassword('passwordN','新密码');
    checkPassword('passwordR','新密码');
});

