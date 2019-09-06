
let get_data_for_graphs = function () {
    console.log('creating data');
    let counter = 1;
    app.retweets.forEach(function (retweet) {
        console.log(retweet.created_at);
        data.push(

            {
                x: retweet.created_at, y: counter
            }
        );
        counter++;
    });
    console.log(app.retweets);

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
}




// var timeFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
var timeFormat = "ddd MMM dd HH:mm:ss Z yyyy"

var config = {
    type: 'line',
    data: {
        datasets: [
            {
                label: "US Dates",
                data: data,
                fill: false,
                borderColor: '#212529'
            },
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Chart.js Time Scale"
        },

        layout: {
            padding: {
                left: 10,
                right: 10,
                bottom: 30
            },
            // margin: {
            //     bottom: 60
            // },
        },
        scales: {
            xAxes: [{
                type: "time",
                time: {
                    displayFormats: {
                        'millisecond': 'h:mm:ss',
                        'second': 'HH:mm:ss',
                        'minute': 'HH:mm',
                        'hour': ' D MMM - HH:mm',
                        'day': 'D MMM',
                        'week': 'D MMM',
                        'month': 'D MMM',
                        'quarter': 'D MMM',
                        'year': 'DD MMM YYYY',
                    },
                    // format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    // beginAtZero: true
                    minRotation: 30
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        }
    }
};

// window.onload = function () {

// };
