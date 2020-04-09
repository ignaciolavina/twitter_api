
const TWITTER_CHARACTER_LIMIT = 280;

let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

    // Retrieveing the params from the url
    var url_string = window.location.href
    var url = new URL(url_string);
    app.url_id = url.searchParams.get("id");

    // Api method for pull the data
    if (app.url_id == null) {
        alert("redirect");
    } else {
        get_data(app.url_id);
    }
};


let get_data = function (id) {
    console.log('get data');
    $.getJSON(getDataFakeNewsPanelURL, {
        id: id
    }, function (response) {
        app.data = response.data;
        app.tweet = JSON.parse(response.data.tweet);
        app.retweets = JSON.parse(response.data.retweets);
        app.data_loaded = true;

        prepare_message()
        // test_function();
    });
}



let get_retweets = function () {
    // DEPRECATED??? yA HAY UNO PARA UPDATE RETWEETS, E INICIALMENTE YA NOS TRAEMOS LOS RETWEETS
    // onrejectionhandled, REVISAR XQ EL GETTWEET YA TRAE LOS RETWEEETS!
    console.log("get retweets");
    // $.getJSON(getRetweetsURL, {
    //     id: app.tweet.id_str,
    // }, function (response) {
    //     app.retweets = response.retweets;
    //     app.retweets_retrieved = true;
    // });
}

let update_retweets = function () {
    console.log("update retweets");
    $.getJSON(updateRetweetsURL, {
        id: app.tweet.id_str,
    }, function (response) {
        console.log("respuesta");
        console.log(response);
        app.retweets = response.retweets_list;
        app.retweets_retrieved = true;
    });
}

let test_function = function () {

    for (let i = 0; i < app.retweets.length; i++) {
        console.log(app.retweets[i].retweeted_status.id_str);
    }

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

let check_request = function () {
    console.log("aaaaa");
}


// ______________________ VUE COMPONENT ______________________

let prepare_message = function () {
    let user = app.tweet.user.screen_name;
    let text = "Hola! Soy parte de un proyecto de investigación sobre Fake News, y el sistema parece detectar que tu tweet como falso, ¿Podrías revisar su veracidad y eliminarlo si es falso?. Si me equivoco, o quires opt-out (Responde <NO>) y así mejoraré. Muchas Gracias!";
    let fuente_o_link = app.fuente_o_link;
    app.text_response = "@" + user + text + " " + fuente_o_link;
}

let analize_btn = function () {
    console.log("analize_btn");
    console.log(app.pressed_analyze);
    // app.pressed_analyze = !app.pressed_analyze;
    app.pressed_analyze = true;
    const top_number = 5;

    for (let i = 0; i < top_number; i++) {
        app.top_first_retweets.push(app.retweets[i]);

    }


    // Calculamos los usuarios con mas followers que han hecho retweet
    let cola = []
    let k = 0;
    let max_value_followers = 0;
    while (k < app.retweets.length && k < top_number) {
        cola.push(app.retweets[k]);
        console.log("k " + k);
        if (app.retweets[k].user.followers_count > max_value_followers) {
            max_value_followers = app.retweets[k].user.followers_count;
        }
        k++;
    }

    cola = order_queue(cola);
    max_value_followers = cola[0].user.followers_count
    for (let i = 0; i < cola.length; i++) {
        console.log(cola[i].user.followers_count);
    }
    console.log("max value followers" + max_value_followers);

    for (let i = k; i < app.retweets.length; i++) {
        followers_number = app.retweets[i].user.followers_count;
        console.log("Comparando " + max_value_followers + " con " + followers_number);
        print_cola(cola);
        if (followers_number > max_value_followers) {
            max_value_followers = cola[0].user.followers_count;
            cola.unshift(app.retweets[i]);
            cola.pop();
        }
    }
    console.log("max value" + max_value_followers);
    app.top_fake_retweets = cola;
}

let print_cola = function (cola) {
    for (let i = 0; i < cola.length; i++) {
        console.log(cola[i].user.followers_count);
    }
}

let order_queue = function (cola) {
    for (let i = cola.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            // Si encuentra uno mayor, se intercambia
            if (cola[j].user.followers_count > cola[i].user.followers_count) {
                aux = cola[i];
                cola[i] = cola[j];
                cola[j] = aux;
            }
        }
    }

    return cola;
}


let get_similar_tweets = function () {
    console.log("get_similar_tweets");

    // Boolean 0 | 1, poner asi porque en Python va con mayuscula
    let es_noticia = 0;
    let url_noticia = "";
    let exclude_retweets = true;

    // for (let i = 0; i < 5; i++) {
    //     app.similar_tweets.push(app.tweet);
    // }
    // app.similar_tweets_retrieved = true;

    if (app.tweet.urls.length > 0) {
        if (app.tweet.urls[0].expanded_url) {
            console.log(app.tweet.urls[0].expanded_url);
            es_noticia = 1;
            url_noticia = app.tweet.urls[0].expanded_url;
        }
    }

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
        app.similar_tweets = response.results_article;
        app.similar_tweets_retrieved = true;
    });
};

let add_to_list = function (tweet) {
    console.log("added");
    app.list_agregated_tweets.push(tweet);
};


let remove_forever = function (tweet) {
    console.log("added");
    // app.list_agregated_tweets.push(tweet);
};


let save_as_new = function (tweet) {
    console.log("added");
    // app.list_agregated_tweets.push(tweet);
};

let remove_from_list_agregated_tweets = function (index) {
    console.log("remove_from_list_agregated_tweets");
    console.log("remove index" + index);
    app.list_agregated_tweets.splice(index, 1);

}

let group_btn = function () {
    tweet_list_id = []
    for (let i = 0; i < app.list_agregated_tweets.length; i++) {
        tweet_list_id.push(app.list_agregated_tweets[i].id_str);
    }

    console.log("mandamos " + tweet_list_id);
    console.log("mandamo22s " + tweet_list_id.length);



    $.getJSON(groupURL, {
        group_name: app.tweet.id_str,
        tweet_list_id: JSON.stringify(tweet_list_id),
        tweet_list: JSON.stringify(app.list_agregated_tweets)
        // id: app.tweet.id_str, 
    }, function (response) {
        // app.similar_tweets = response.similar_tweets;
        // app.retweets_retrieved = true;
    });
}

let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        data_loaded: false,
        tweet: [],
        switch1: true,
        switch2: true,
        top_fake_users: [],
        top_first_users: [],
        other_tweets: [],
        url_id: "",
        similar_tweets_retrieved: false,
        similar_tweets: [],
        retweets: [],
        retweets_retrieved: false,
        fuente_o_link: "",
        text_response: "",
        pressed_analyze: false,
        top_first_retweets: [],
        top_fake_retweets: [],
        // nuevos
        list_agregated_tweets: [],
        add_to_list: add_to_list,
        remove_forever: remove_forever,
        save_as_new: save_as_new

    },
    methods: {
        get_data: get_data,
        start_tracking: start_tracking,
        delete_tracking: delete_tracking,
        check_request: check_request,
        get_similar_tweets: get_similar_tweets,
        get_retweets: get_retweets,
        update_retweets: update_retweets,
        prepare_message: prepare_message,
        analize_btn: analize_btn,
        remove_from_list_agregated_tweets: remove_from_list_agregated_tweets,
        group_btn: group_btn
    }
});


on_page_load();

