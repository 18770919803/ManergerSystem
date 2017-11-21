(function () {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if (version[1] != '' && version[1] != null) {
        var trim_Version = version[1].replace(/[ ]/g, "");
        if ((browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") || (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") || (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0")) {
            var filename = 'css/ie-eight.css?version=' + new Date().getTime();
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }
})();