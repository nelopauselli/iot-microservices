+(function ($) {
    $("#header").load("/partials/header.html");
    $("#aside").load("/partials/aside.html", function () {
        $(function () {
            var devicesCount = $("[data-role='devices-count']");
            if (devicesCount.length > 0) {
                $.getJSON("/devices/count", function (response) {
                    devicesCount.each(function(index, element){
                        $(element).text(response.total);
                    });
                });
            }
        });
    });

    //_toastr("Bienvenido, hay "+parseInt(Math.random()*2000)+" eventos nuevos","top-right","success",false);

})(jQuery);