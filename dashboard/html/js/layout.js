+(function ($) {
    Chart.defaults.global.defaultFontFamily = "'Inconsolata', monospace";
    Chart.defaults.global.defaultFontSize = 14;

    $(function () {
        var devicesCount = $("[data-role='devices-count']");
        if (devicesCount.length > 0) {
            var stored = localStorage.getItem("devices");
            if (stored) {
                var ips = JSON.parse(stored);

                devicesCount.each(function (index, element) {
                    $(element).text(ips.length);
                });
            }
        }
    });

    jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});
})(jQuery, Chart);
