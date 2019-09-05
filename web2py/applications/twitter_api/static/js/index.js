let on_page_load = function () {
    get_tweet();
    // console.log('action');

    // $.post(logginTwitterURL, {
    //     word: 'tweet'
    // }, function (response) {

    // });
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

on_page_load();

