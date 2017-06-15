+(function ($) {
    $(function () {
        var target = $("[data-role='events-count']");
        if (target.length > 0) {
            target.each(function (index, element) {
                var eventName = $(element).data("target");

                $.getJSON("/api/count/" + eventName, function (response) {
                    var value = response[0].count;
                    $(element).text(parseInt(value));
                });
            });
        }
    });
})(jQuery);
