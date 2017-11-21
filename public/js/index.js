supportIe();
var pageRandom = function () {
    const STR_START_INDEX = 2;
    const STR_END_INDEX = 12;
    var str = Math.random().toString();
    return encodeURIComponent(str.substring(STR_START_INDEX, STR_END_INDEX));

};
(function () {
    var nd = pageRandom();
    $.each($("#navMenu li>a"), function (i, v) {
        var webUrl = $(v).attr("href").indexOf("?") >= 0 ? $(v).attr("href").substring(0, $(v).attr("href").indexOf("?")) : $(v).attr("href");
        $(v).attr("href", webUrl + "?nd=" + nd);
    });
})();

function audiData() {
    var audiData = {
        moduleId: 3,
        state:1
    };
    $.ajax({
        type: 'post',
        url: 'pullout',
        data: audiData,
        dateType: "json",
        success: function () {
        },
        error: function () {
        }
    });
    window.location = '/';
}

function getCookie(c_name) {
    c_start = document.cookie.indexOf(c_name + '=');

    if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(';', c_start);
        if (c_end == -1) {
            c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
    }
    return "";


};
(function () {
    data = getCookie('data');
    var tem = data.split(',');
    var username = tem[0];
    if (username != '' && username != null) {
        $('.getUsername').text(username);
    }
    ;

})();