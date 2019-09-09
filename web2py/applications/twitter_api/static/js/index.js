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
        console.log(response);
        // app.label = response.tweet;
        // app.label = JSON.stringify(response.tweet, null, "\t");
        // console.log(response.tweet);
        app.tweets = response.tweets;
        app.retweets = response.retweets;


        get_top_users();
        // document.body.appendChild(document.createTextNode(JSON.stringify(response.tweet, null, 4)));
        document.body.appendChild(document.createTextNode(JSON.stringify(app.retweets, null, 4)));
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
        word_search: '',
        tweets: [],
        retweets: [],
        top_users: []
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



on_page_load();

