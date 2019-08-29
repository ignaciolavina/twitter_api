let on_page_load = function () {
    console.log('action');

    $.post(logginTwitterURL, {
        word: 'tweet'
    }, function (response) {

    });
};

let action = function () {
    console.log('post tweet function');

    $.post(postTweetURL, {
        string: 'third tweet'
    }, function (response) {

    });
}

let get_tweet = function () {
    console.log('get tweet function');
    $.post(getTweetURL, {
        word: 'casa'
    }, function (response) {
        console.log(response);
        // app.label = response.tweet;
        // app.label = JSON.stringify(response.tweet, null, "\t");
        // console.log(response.tweet);
        document.body.appendChild(document.createTextNode(JSON.stringify(response.tweet, null, 4)));
    });
}

let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        label: 'none'
    },
    methods: {
        action: action,
        get_tweet: get_tweet
    }
});

on_page_load();

