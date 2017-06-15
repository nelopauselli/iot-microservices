function createChart(events) {
    var sensor = 'sensor';

    var ctx = document.getElementById("chart").getContext("2d");

    var labels = [];

    var datasets = [],
        mapper = [];
    var colors = [
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
        { backgroundColor: randomColor(), borderColor: randomColor() },
    ];



    events.dimensions.forEach(function (dimension) {
        var index = datasets.length;

var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        datasets.push({
            label: dimension,
            fillColor: gradient,
            //backgroundColor: colors[index].backgroundColor,
            borderColor: colors[index].borderColor,
            strokeColor : colors[index].borderColor,
            pointColor : "#fff",
            pointStrokeColor : "#ff6c23",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#ff6c23",
            data: [],
            cubicInterpolationMode: 'monotone',
            fill: true,
        });
        mapper[dimension] = index;
    });



    events.data.forEach(function (event) {
        if (labels.indexOf(event.moment) == -1)
            labels.push(event.moment);

        var index = mapper[event.place.friendlyName];
        datasets[index].data.push({ x: event.moment, y: event.value });
    });

    var config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: sensor
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'h:mm:ss a'
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                }]
            }
        }
    };

    window.myLine = new Chart(ctx, config);
}