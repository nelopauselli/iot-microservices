var baseUrl = "http://192.168.1.116:8081";

+(function ($) {
    $(function () {
        var target = $("[data-role='events-count']");
        if (target.length > 0) {
            target.each(function (index, element) {
                var eventName = $(element).data("target");

                $.getJSON(baseUrl + "/count/" + eventName, function (response) {
                    var value = response[0].count;
                    $(element).text(parseInt(value));
                });
            });
        }
    });
})(jQuery);