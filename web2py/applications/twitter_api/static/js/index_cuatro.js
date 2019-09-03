let on_page_load = function () {
    get_tweet();


};


var data = [];
// var data = [{
//     x: "Fri Aug 3 08:54:45 +0000 2019", y: 175
// }, {
//     x: "Fri Aug 30 08:56:45 +0000 2019", y: 17
// }, {
//     x: "Fri Aug 30 08:58:45 +0000 2019", y: 150
// }, {
//     x: "Fri Aug 30 08:59:45 +0000 2019", y: 178
// }];


let get_tweet = async function () {
    console.log('get tweet function');
    // app.label = app.word_search;
    $.post(getTweetURL, {
        word: app.word_search
    }, await function (response) {
        console.log(response);
        // app.label = response.tweet;
        // app.label = JSON.stringify(response.tweet, null, "\t");
        // console.log(response.tweet);
        document.body.appendChild(document.createTextNode(JSON.stringify(response.tweet, null, 4)));

        // document.body.appendChild(document.createTextNode(JSON.stringify(response.retweets, null, 4)));
        app.tweets = response.tweets;
        app.retweets = response.retweets;

        get_data_for_graphs();

    });
}



let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        label: 'none',
        word_search: 'coche',
        tweets: [],
        retweets: [],
    },
    methods: {
        get_tweet: get_tweet,
    }
});


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



on_page_load();
// Delete all previous
// __________________________________________________________




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
        scales: {
            xAxes: [{
                type: "time",
                time: {
                    displayFormats: {
                        'millisecond': timeFormat,
                        'second': timeFormat,
                        'minute': 'MMM DD HH',
                        'hour': 'MMM DD HH',
                        'day': 'MMM DD HH',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    },
                    // format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
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
