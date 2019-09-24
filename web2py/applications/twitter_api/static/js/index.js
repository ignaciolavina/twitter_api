// Fixes and to do list
// - word_search is defined as 'casa' for testing purposes. set to ''
// - when refreshing the page, clear all the variables and arrays array= []
// - Check if save data is working, it seems to be storing[Object(object)], etc
// - On EACH server response, check server response and display errors
// - Check also if server response is empty
// - Implement 'topic' on mark as fake and store data function; IDEA
//      - IDEA: get the topics among the top hastaghs detected
// - Improve Colors, labels, fillments, and other graph properties
// - Check in chart.js documentation if there are more interesting properties to put on "config" for the graphs
// - Agregate names to the containers
// - Check if app.list_tweets_and_retweets.length or app.list_tweets_and_retweets[0].length {I think its okay}
// - Estoy haciendo sort en 3 sitios diferentes, mejor hacer sort en el server o en Cliente al principio
// - Check in multiline_graph if retweets.length < 1 Then not add to dataset
//      - Add a warning UI display warning why not all of them are showed
// - En la leyenda del gráfico, en date poner la fecha de creación del primer tweet (Mes/año)?

// 21-sept-sabado -> 3 hours/ 2 effective hours

// TO-DO list
// - Imlpement tables:
//     - top fake spreaders 10 que mas han repercutido
//     - top first users: 10 primeros
//     - top potential viewers users: top 10 users con mas followers (mas potential scope)
// - Download libraries instead of fetching them online
// - Implement advanced search
// - Potential scope, for each tweeter and retweeter, get the number of followers [REPEATED]


let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

    // Only for testing purposes
    // get_tweet();
};


let save_data = function () {
    console.log('save data function');
    $.post(saveDataURL, {
        stored_data: app.list_tweets_and_retweets.join()
    }, function (response) {
        // console.log('server response');
        if (response.result == true) {
            console.log('data saved corretly');
        } else {
            window.alert(response.error);
        }
    });
}



let pressed_analyze_btn = function () {
    if (app.word_search == '') {
        alert('Please, insert something on the search line');
    } else {
        get_tweet();
    }
}


let get_tweet = function () {
    console.log('get tweet function');
    $.post(getTweetURL, {
        word: app.word_search
    }, function (response) {
        console.log('server response')
        // console.log(response);

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
        create_tables();
        create_graphs();

        // document.body.appendChild(document.createTextNode(JSON.stringify(response.tweets, null, 4)));
        // document.body.appendChild(document.createTextNode(JSON.stringify(app.list_tweets_and_retweets, null, 4)));
    });
}


let mark_as_fake = function () {
    console.log('mark as fake function');
    stored_data = app.list_tweets_and_retweets.join();
    $.post(markFakeURL, {
        search_line: app.word_search,
        topic: '',
        stored_data: stored_data
    }, function (response) {
        if (response.result == true) {
            console.log('data saved');
            // window.alert('data saved');
        } else {
            window.alert(response.error);
        }
    });
}

let create_tables = function () {
    get_first_users();
    get_top_users();
}


// ______________ GRAPHS AND LIST COMMON METHODS ______________

let top_to_display = 10;

let get_top_users = function () {
    for (let i = 0; i < 10; i++) {
        app.top_users.push(app.tweets[0].user);
    }
};


// Test with retweets_list = []
let get_first_users = function () {
    let provisional_list = [];

    // Retrieve the first "top_to_display" first users from each retweet list
    for (let i = 0; i < app.list_tweets_and_retweets.length; i++) {
        let retweets_list = app.list_tweets_and_retweets[i][1];
        retweets_list.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });
        for (let j = 0; j < top_to_display; j++) {
            if (retweets_list[j] == null) {
                continue;
            } else {
                provisional_list.push(retweets_list[j]);
            }
        }
    }

    // Sort the list and slice it in the first "top_to_display" users    
    provisional_list.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });

    // Slice the list for not display all the retweeters
    app.top_first_users = provisional_list.slice(0, top_to_display);
};

let create_graphs = function () {
    create_agregated_graph();
    create_multiple_graph();
}



// ____________________ AGREGATED GRAPH _______________________

var data = [];
// var timeFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
var timeFormat = "ddd MMM dd HH:mm:ss Z yyyy"

let create_agregated_graph = function () {

    // Joining all the retweets from different tweets in a single list "app.agregated_retweets"
    app.agregated_retweets = [];
    for (let i = 0; i < app.retweets.length; i++) {
        app.agregated_retweets = app.agregated_retweets.concat(app.retweets[i]);
    }

    // Sorting the list according to Data (to display it in order on the agregated graph)
    app.agregated_retweets.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });

    let counter = 0;
    // Agregating each retweet to the list "data" that is used for the graph
    app.agregated_retweets.forEach(function (retweet) {
        data.push(
            {
                x: retweet.created_at, y: counter
            }
        );
        counter++;
    });

    // Creating and displaying the graph
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
}

var config = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Date ',
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

// ____________________ MULTIPLE LINE GRAPH _______________________

var dataset_multiline = [];

let prepare_multiline_graph = function () {
    // For each list of retweets, we must a dataset entry with all the retweets as data
    // Therefore, each tweet's retweets are display as diferent values on the graph

    // For each tweet, retrieve all the retweets and sotre them in the dataset_multiline for the graph
    for (let i = 0; i < app.list_tweets_and_retweets.length; i++) {
        let counter = 0;
        let multiline_data = []
        let retweets = app.list_tweets_and_retweets[i][1];
        if (retweets.length < 1) {
            continue;
        } else {
            retweets = retweets.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });
            retweets.forEach(function (retweet) {
                // console.log(retweet.created_at + ", cnt:" + counter);
                multiline_data.push(

                    {
                        x: retweet.created_at, y: counter
                    }
                );
                counter++;
            });

            // data = app.list_tweets_and_retweets[i][1];
            dataset_multiline.push({
                label: 'Retweets ' + i,
                data: multiline_data,
                fill: true,
                borderColor: '#212529'
            });
        }
    }
}

let create_multiple_graph = function () {
    // Isolate the preparation of the data in other method
    prepare_multiline_graph();
    var graph_two = document.getElementById("canvas_two").getContext("2d");
    window.myLine = new Chart(graph_two, config_multiple_graph);
};


var config_multiple_graph = {
    type: 'line',
    data: {
        datasets: dataset_multiline
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

// ______________________ VUE COMPONENT ______________________

let show_advanced_search = function () {
    app.advanced_search = !app.advanced_search;
}

let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        label: 'none',
        data_loaded: true,
        word_search: '',
        tweets: [],
        retweets: [],
        top_users: [],
        top_first_users: [],
        list_tweets_and_retweets: [],
        agregated_retweets: [],
        twitter_api: [],
        advanced_search: false
    },
    methods: {
        get_tweet: get_tweet,
        save_data: save_data,
        mark_as_fake: mark_as_fake,
        show_advanced_search: show_advanced_search,
        pressed_analyze_btn: pressed_analyze_btn
    }
});


on_page_load();

