
let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

    // Only for testing purposes
    // get_tweet();
    get_data()
};


let get_data = function () {
    console.log('get data');
    $.getJSON(getDataFakeNewsPanel, function (response) {
        app.data = response.data;
        app.tweet = JSON.parse(response.data.stored_data);
        app.retweets = JSON.parse(response.data.retweets);
        test_function();
    });
}

let test_function = function () {
    for (let i = 0; i < 10; i++) {
        app.top_users.push(app.tweet.user);
    }
    app.top_first_users = app.top_users;

    for (let i = 0; i < 5; i++) {
        app.other_tweets.push(app.tweet);
    }
}

let start_tracking = function () {
    console.log('start tracking');
}

let delete_tracking = function () {
    console.log('delete tracking');
}


// ______________________ VUE COMPONENT ______________________


let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        data_loaded: true,
        tweet: [],
        switch1: true,
        switch2: true,
        top_users: [],
        top_first_users: [],
        other_tweets: []
    },
    methods: {
        get_data: get_data,
        start_tracking: start_tracking,
        delete_tracking: delete_tracking
    }
});


on_page_load();

