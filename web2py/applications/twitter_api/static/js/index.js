
let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

    // Hidding unnecesary elements
    document.getElementById("data_panel").hidden = true;

    // Only for testing purposes
    // get_tweet();
};




let guardar_tweet = function (tweet) {
    console.log('Guardar tweet');
    console.log(tweet.full_text);
    id = tweet.id_str;
    console.log("id es: " + id);
    $.post(GuardarTweetURL, {
        id: id,
        text: tweet.full_text,
        tweet: JSON.stringify(tweet)
    }, function (response) {
        // Response
    });
}




let pressed_analyze_btn = function () {
    // if (app.test_mode && app.word_search == '') {
    //     app.word_search = 'casa';
    // }
    if (app.word_search == '') {
        alert('Please, insert something on the search line');
    } else {
        document.getElementById("data_panel").hidden = false;
        get_tweet();
    }
}


let get_tweet = function () {
    console.log('get tweet function');
    $.post(getTweetURL, {
        word: app.word_search,
        test_mode: app.test_mode
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
    });
}




// ______________ GRAPHS AND LIST COMMON METHODS ______________

let top_to_display = 10;




// ______________________ VUE COMPONENT ______________________

let show_advanced_search = function () {
    app.advanced_search = !app.advanced_search;
}

let change_test_mode = function () {
    app.test_mode = !app.test_mode;
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
        advanced_search: false,
        test_mode: true
    },
    methods: {
        get_tweet: get_tweet,
        show_advanced_search: show_advanced_search,
        pressed_analyze_btn: pressed_analyze_btn,
        change_test_mode: change_test_mode,
        guardar_tweet: guardar_tweet
    }
});


on_page_load();

