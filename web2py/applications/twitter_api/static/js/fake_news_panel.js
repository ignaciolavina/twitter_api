
const TWITTER_CHARACTER_LIMIT = 280;

// let test_function = function () {
//     for (let i = 0; i < app.retweets.length; i++) {
//         console.log(app.retweets[i].retweeted_status.id_str);
//     }
// }


let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

    // Retrieveing the params from the url
    let url = new URL(window.location.href);
    let url_id = url.searchParams.get("id");
    origin = url.searchParams.get("origin");

    console.log("Params: " + url_id + ", " + origin);

    // Api method for pull the data
    if (url_id == null) {
        alert("redirect A");
    } else {
        get_data(url_id, origin);
        // if (origin == "groups") {
        //     get_data_groups(url_id, origin);
        //     alert("from groups");
        // } else if (origin == "panel") {
        //     // get_data(url_id); No pasar ese ID sino que buscar el de master
        // } else if (origin == "stored") {
        //     get_data(url_id);
        // } else {
        //     alert("redirect B");
        // }
    }
};


let get_data = function (id, origin) {
    console.log('get data');
    $.getJSON(getDataFakeNewsPanelURL, {
        id: id,
        origin: origin
    }, function (response) {
        console.log(response);
        // main tweet entity
        app.tweet = JSON.parse(response.main_tweet.tweet);
        main_retweets = JSON.parse(response.main_tweet.retweets);
        // (entity = {tweet, retweets})

        // list_tweet_entities contains ALL tweet entities (main + others)
        // first we include the main tweet
        app.list_tweet_entities.push([app.tweet, main_retweets]);
        // then we include the others
        list_agregated_tweets = response.list_agregated_tweets;
        // agregating the rest of the entities (we have to JSON parse first)
        for (let i = 0; i < list_agregated_tweets.length; i++) {
            tweet = JSON.parse(list_agregated_tweets[i].tweet);
            retweets = JSON.parse(list_agregated_tweets[i].retweets)
            app.list_tweet_entities.push([tweet, retweets]);
            // for the list dislpayed
            app.list_agregated_tweets.push(tweet);
        }

        app.data_loaded = true;

        // Preparing the respond messaje
        prepare_message()
    });
}

// DEPRECATED 
// let get_retweets = function () {
//     // DEPRECATED??? yA HAY UNO PARA UPDATE RETWEETS, E INICIALMENTE YA NOS TRAEMOS LOS RETWEETS
//     // onrejectionhandled, REVISAR XQ EL GETTWEET YA TRAE LOS RETWEEETS!
//     console.log("get retweets");
//     // $.getJSON(getRetweetsURL, {
//     //     id: app.tweet.id_str,
//     // }, function (response) {
//     //     app.retweets = response.retweets;
//     //     app.retweets_retrieved = true;
//     // });
// }


let update_retweets = function () {
    console.log("update retweets");
    $.getJSON(updateRetweetsURL, {
        id: app.tweet.id_str,
    }, function (response) {
        // console.log(response);
        app.retweets = response.retweets_list;
        app.retweets_retrieved = true;
    });
}


let start_tracking = function () {
    console.log('start tracking');
    if (app.text_response.length > TWITTER_CHARACTER_LIMIT || app.text_response.length == 0) {
        alert("Cuidado, el mensaje no puede estar vacio ni superar el limite de caracteres de twitter(280), por favor, revisa el mensaje")
    } else {
        $.getJSON(startTrackingURL, {
            tweet_id: app.tweet.id_str,
            text_response: app.text_response,
            username: app.tweet.user.name,
        }, function (response) {

        });
    }
}

let delete_tracking = function () {
    console.log('delete tracking');
}







// ______________________ MAIN MENU ______________________


let analize_btn = function () {
    prepare_data();
    // To swich between graphs section or tweet section
    app.display_section = !app.display_section;
    if (app.display_section) {
        setTimeout(() => { create_graphs(); }, 500);
    } else {
        // Cleaning the datasets of the graphs so we don't display them twice
        data_agregated_graph = [];
        dataset_multiline = [];
    }

    lista = app.list_agregated_retweets_graph;
    //  Sorting the list according to Data (to display it in order on the agregated graph)
    lista.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });

    // Display the top X users that were the first ones (tweet or retweets)
    const top_number = 5;
    for (let i = 0; i < top_number; i++) {
        app.top_first_retweets.push(lista[i]);

    }

    if (app.list_tweet_entities.length > 1) {
        app.display_multiline_graph = true;
    }
}



let get_similar_tweets = function () {
    console.log("get_similar_tweets");

    // Boolean 0 | 1, poner asi porque en Python va con mayuscula
    let es_noticia = false;
    let url_noticia = "";
    let exclude_retweets = true;

    // Si detectamos que puede ser una NOTICIA (si tiene url)
    if (app.tweet.urls.length > 0) {
        if (app.tweet.urls[0].expanded_url) {
            console.log(app.tweet.urls[0].expanded_url);
            es_noticia = true;
            url_noticia = app.tweet.urls[0].expanded_url;
        }
    }

    // llamamos a la api API.get_similar_tweets
    $.getJSON(getSimilarTweetsURL, {
        id: app.tweet.id,
        text: app.tweet.full_text,
        user: app.tweet.user.screen_name,
        es_noticia: es_noticia,
        url_noticia: url_noticia,
        exclude_retweets: exclude_retweets
    }, function (response) {
        // app.similar_tweets = response.similar_tweets;
        // app.retweets_retrieved = true;
        console.log(response.results_article);
        // SI ya estan en la lista los eliminamos
        // NOT WORKING !!!
        for (let i = 0; i < response.results_article.length; i++) {
            if (!app.similar_tweets.includes(response.results_article[i])) {
                app.similar_tweets.push(response.results_article[i]);
            }
        }

        // app.similar_tweets = response.results_article;
        if (app.similar_tweets.length == 0) {
            alert("Not similar tweets were found");
        } else {
            alert("Found: " + app.similar_tweets.length + " similar tweets");
            app.similar_tweets_retrieved = true;
        }
    });
};


let add_to_list = function (tweet, index) {
    // Si esta repetido no lo anadimos
    // if (!app.similar_tweets.includes(tweet)) {
    //     app.list_agregated_tweets.push(tweet);
    // }
    app.list_agregated_tweets.push(tweet);
    // Eliminamos de la otra lista el tweet
    app.similar_tweets.splice(index, 1);
};


let remove_forever = function (tweet, index) {
    console.log("remove forever");
    app.similar_tweets.splice(index, 1);
    // app.list_agregated_tweets.push(tweet);
};


let save_as_new = function (tweet, index) {
    console.log("save as new");
    // app.list_agregated_tweets.push(tweet);
};

// Remove from the list that form the group, the specific tweet
let remove_from_list_agregated_tweets = function (tweet, index) {
    console.log("remove_from_list_agregated_tweets");
    console.log("remove index" + index);
    app.similar_tweets.unshift(tweet);
    app.list_agregated_tweets.splice(index, 1);

}

let group_btn = function () {
    tweet_list_id = []
    for (let i = 0; i < app.list_agregated_tweets.length; i++) {
        tweet_list_id.push(app.list_agregated_tweets[i].id_str);
    }

    $.getJSON(groupURL, {
        group_name: app.tweet.id_str,
        main_id: app.tweet.id_str,
        tweet_list_id: JSON.stringify(tweet_list_id),
        tweet_list: JSON.stringify(app.list_agregated_tweets)
        // id: app.tweet.id_str, 
    }, function (response) {
        // app.similar_tweets = response.similar_tweets;
        // app.retweets_retrieved = true;
    });
}







// ____________________  GRAPHS SECTION _______________________


var data_agregated_graph = [];
// var timeFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
var timeFormat = "ddd MMM dd HH:mm:ss Z yyyy"

var dataset_multiline = [];


let prepare_data = function () {

    // PREPARAMOS LA LSITA AGREAGADA
    lista = []
    for (let i = 0; i < app.list_tweet_entities.length; i++) {
        lista.push(app.list_tweet_entities[i][0]);

        if (app.list_tweet_entities[i][1].length > 0) {
            aux_list = app.list_tweet_entities[i][1];
            for (let j = 0; j < aux_list.length; j++) {
                lista.push(aux_list[j]);
            }
        }
    }

    // Sorting the list according to Data (to display it in order on the agregated graph)
    lista.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });
    app.list_agregated_retweets_graph = lista;

    let lista2 = lista.slice();
    for (let j = 0; j < lista2.length; j++) {
        if (!lista2[j].user.followers_count) {
            lista2[j].user.followers_count = 0;
        }
    }

    // Sorting the list according to Data (to display it in order on the agregated graph)
    lista2.sort(function (a, b) { return ((b.user.followers_count) - (a.user.followers_count)) });
    app.top_fake_retweets = lista2;
}


let create_graphs = function () {
    create_agregated_graph();
    if (app.list_tweet_entities.length > 1) {
        app.display_multiline_graph = true;
        create_multiple_graph();
    }
}





// ____________________ AGREGATED GRAPH _______________________

let create_agregated_graph = function () {

    let counter = 0;
    // Agregating each retweet to the list "data" that is used for the graph
    app.list_agregated_retweets_graph.forEach(function (tweet) {
        data_agregated_graph.push(
            {
                x: tweet.created_at, y: counter
            }
        );
        counter++;
    });


    // Creating and displaying the graph
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config_agregated_graph);
}


var config_agregated_graph = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Tweet',
                data: data_agregated_graph,
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


let prepare_multiline_graph = function () {
    // For each list of retweets, we must a dataset entry with all the retweets as data
    // Therefore, each tweet's retweets are display as diferent values on the graph



    for (let i = 0; i < app.list_tweet_entities.length; i++) {
        lista = []
        multiline_data = []
        lista.push(app.list_tweet_entities[i][0]);

        if (app.list_tweet_entities[i][1].length > 0) {
            aux_list = app.list_tweet_entities[i][1];
            for (let j = 0; j < aux_list.length; j++) {
                lista.push(aux_list[j]);
            }
        }

        // // Sorting the list according to Data (to display it in order on the agregated graph)
        lista.sort(function (a, b) { return (new Date(a.created_at) - new Date(b.created_at)).toString() });

        let counter = 0;
        // Agregating each retweet to the list "data" that is used for the graph
        lista.forEach(function (tweet) {
            multiline_data.push(
                {
                    x: tweet.created_at, y: counter
                }
            );
            counter++;
        });

        // data = app.list_tweets_and_retweets[i][1];
        dataset_multiline.push({
            label: 'Tweet ' + i,
            data: multiline_data,
            fill: true,
            borderColor: '#212529'
        });
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


let prepare_message = function () {
    let user = app.tweet.user.screen_name;
    let text = "Hola! Soy parte de un proyecto de investigación sobre Fake News, y el sistema parece detectar que tu tweet como falso, ¿Podrías revisar su veracidad y eliminarlo si es falso?. Si me equivoco, o quires opt-out (Responde <NO>) y así mejoraré. Muchas Gracias!";
    let fuente_o_link = app.fuente_o_link;
    app.text_response = "@" + user + text + " " + fuente_o_link;
}




let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        data_loaded: false,
        // Teeet entities
        list_tweet_entities: [],
        // Main tweet
        tweet: [],
        retweets: [],
        // Settings panel 
        switch1: true,
        switch2: true,
        fuente_o_link: "", // Not used yet
        text_response: "",
        // Similar tweets section
        similar_tweets_retrieved: false,
        similar_tweets: [],
        // Update retweets
        retweets_retrieved: false,
        // Display section
        top_first_retweets: [],
        top_fake_retweets: [],

        // Graphs
        list_agregated_retweets_graph: [],
        display_multiline_graph: false,
        list_agregated_retweets: [],

        // TWEETS AGRUPADOS (cambiar nombre)
        list_agregated_tweets: [],
        // for single page view
        display_section: false
        //test

    },
    methods: {
        get_data: get_data,
        start_tracking: start_tracking,
        delete_tracking: delete_tracking,
        get_similar_tweets: get_similar_tweets,
        // get_retweets: get_retweets,
        update_retweets: update_retweets,
        prepare_message: prepare_message,
        analize_btn: analize_btn,
        remove_from_list_agregated_tweets: remove_from_list_agregated_tweets,
        group_btn: group_btn,
        // nuevos
        add_to_list: add_to_list,
        remove_forever: remove_forever,
        save_as_new: save_as_new
    }
});


on_page_load();
