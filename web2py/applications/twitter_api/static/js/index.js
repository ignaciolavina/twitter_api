let on_page_load = function () {
    // console.log(response);
    // console.log(request.args(0));
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');
    // console.log('route', this.$router.params);
    // get_tweet();
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

let save_data = function () {
    console.log('save data');
    console.log(app.list_tweets_and_retweets);
    variable = app.list_tweets_and_retweets.join();
    $.post(saveDataURL, {
        stored_data: variable
    }, function (response) {
        console.log('server response')
        if (response.result == true) {
            console.log('data saved');
        } else {
            window.alert(response.error);
        }
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
        // document.body.appendChild(document.createTextNode(JSON.stringify(response.tweets, null, 4)));
        document.body.appendChild(document.createTextNode(JSON.stringify(app.list_tweets_and_retweets, null, 4)));

    });
}


let mark_as_fake = function () {
    console.log('mark as fake new');
    stored_data = app.list_tweets_and_retweets.join();
    $.post(markFakeURL, {
        search_line: app.word_search,
        topic: '',
        stored_data: stored_data

        // word: app.word_search

    }, function (response) {
        console.log('server response')
        if (response.result == true) {
            console.log('data saved');
            // window.alert('data saved');
        } else {
            window.alert(response.error);
        }
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
        list_tweets_and_retweets: [],
        agregated_retweets: [],
        mark_as_fake: mark_as_fake
    },
    methods: {
        action: action,
        get_tweet: get_tweet,
        test_btn: test_btn,
        save_data: save_data
    }
});


// ________________________________________________________________
// For agreggated graphic

var data = [];


let get_data_for_graphs = function () {

    //Creation of the agregated graph
    create_agregated_graph();
    create_multiple_graph();
}


let create_agregated_graph = function () {

    console.log('creating data for agregated graph');
    let counter = 1;

    // Creation of a list that will agregate all the agregated retweets
    let agregate_rt = [];
    for (let i = 0; i < app.retweets.length; i++) {
        app.agregated_retweets = agregate_rt.concat(app.retweets[i]);
    }

    // Date sorting to display the agregated graph
    app.agregated_retweets.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });

    // app.agregated_retweets.sort(function (a, b) => new Date(a.created_at) - new Date(b.created_at));
    app.agregated_retweets.forEach(function (retweet) {
        console.log(retweet.created_at + ", cnt:" + counter);
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
var data_two = [];

let create_multiple_graph = function () {

    var graph_two = document.getElementById("canvas_two").getContext("2d");
    window.myLine = new Chart(graph_two, config_multiple_graph);
};

// var timeFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
var timeFormat = "ddd MMM dd HH:mm:ss Z yyyy"

var config = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Date',
                data: data,
                fill: true,
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
                        'hour': 'D MMM - HH:mm',
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


var config_multiple_graph = {
    type: 'line',
    data: {
        datasets: [
            {
                label: "US Dates",
                data: data_two,
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
                        'hour': 'D MMM - HH:mm',
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

