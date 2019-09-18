let on_page_load = function () {
    get_tweet();
};

let test_btn = function () {
    console.log("test btn pressed");
    $.post(testBtnURL, {
    }, function (response) {

    });
}

let action = function () {
    console.log('post tweet function');
    $.post(postTweetURL, {
        string: 'third tweet'
    }, function (response) {

    });
}

let get_tweet = function () {
    console.log('get tweet function');
    // app.label = app.word_search;
    $.post(getTweetURL, {
        word: app.word_search
    }, function (response) {
        console.log('server response')
        console.log(response);

        // Empty the varlue in case of refresh or new data comming
        app.tweets = [];
        app.retweets = [];
        // Retrieveing the data from request vars
        app.list_tweets_and_retweets = response.list_tweets_and_retweets;
        for (let i = 0; i < app.list_tweets_and_retweets.length; i++) {
            app.tweets.push(app.list_tweets_and_retweets[i][0]);
            app.retweets.push(app.list_tweets_and_retweets[i][1]);
        }

        app.data_loaded = true;
        // This function is in index_agregated_graph.js file
        get_data_for_graphs();

        get_top_users();
        document.body.appendChild(document.createTextNode(JSON.stringify(response.tweets, null, 4)));
        // document.body.appendChild(document.createTextNode(JSON.stringify(app.retweets, null, 4)));

    });
}


let get_top_users = function () {
    for (let i = 0; i < 10; i++) {
        app.top_users.push(app.tweets[0].user);
    }
};

let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        label: 'none',
        data_loaded: true,
        word_search: 'casa',
        tweets: [],
        retweets: [],
        top_users: [],
        list_tweets_and_retweets: []
    },
    methods: {
        action: action,
        get_tweet: get_tweet,
        test_btn: test_btn
    }
});


// ________________________________________________________________
// For agreggated graphic

var data = [];


// Now the retweets of different tweets are agregated in a single Array,
// try to join in a more visual and effective way
// Creating the data for the aggregated graph
let get_data_for_graphs = function () {
    console.log('creating data for agregated graph');
    let counter = 1;

    // Creation of a list that will agregate all the agregated retweets
    let agregate_rt = [];
    for (let i = 0; i < app.retweets.length; i++) {
        agregate_rt = agregate_rt.concat(app.retweets[i]);
    }

    agregate_rt.forEach(function (retweet) {
        console.log(retweet.created_at);
        data.push(

            {
                x: retweet.created_at, y: counter
            }
        );
        counter++;
    });

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



on_page_load();

