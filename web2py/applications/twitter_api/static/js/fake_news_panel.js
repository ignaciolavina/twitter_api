
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
    $.getJSON(getDataFakeNewsPanel, {
        id: id
    }, function (response) {
        app.data = response.data;
        app.tweet = JSON.parse(response.data.tweet);
        app.retweets = JSON.parse(response.data.retweets);
        app.data_loaded = true;
        // test_function();
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

let check_request = function () {
    console.log("aaaaa");
}


// ______________________ VUE COMPONENT ______________________


let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        data_loaded: false,
        tweet: [],
        switch1: true,
        switch2: true,
        top_users: [],
        top_first_users: [],
        other_tweets: [],
        url_id: ""
    },
    methods: {
        get_data: get_data,
        start_tracking: start_tracking,
        delete_tracking: delete_tracking,
        check_request: check_request
    }
});


on_page_load();

