(function () {
    var getUsername = $("span.getUsername").text();
    var data = {
        name: getUsername,
        url: encodeURI(window.location.href)
    };
    $.ajax({
        type: 'post',
        url: '/insertAcclog',
        data: data,
        dateType: "json",
        success: function () {
        }
    });
})();

