

let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

};


let search_btn = function () {
    console.log('Search');
    if (app.user_to_search == "") {
        alert("Ooops! It seem that you forgot to fill the search bar");
        return;
    }
    $.post(searchFunctionURL, {
        // word: app.word_search,
        // test_mode: app.test_mode
        user_to_search: app.user_to_search

    }, function (response) {
        // response

        app.data = response.data;
        app.tweets = response.data;
        app.data_loaded = true;
    })
};


// let mark_as_fake = function () {
//     console.log('mark as fake function');
//     stored_data = app.list_tweets_and_retweets.join();
//     $.post(markFakeURL, {
//         search_line: app.word_search,
//         topic: '',
//         stored_data: stored_data
//     }, function (response) {
//         if (response.result == true) {
//             console.log('data saved');
//             // window.alert('data saved');
//         } else {
//             window.alert(response.error);
//         }
//     });
// }

let track_btn = function (tweet) {
    console.log('Track tweet');
    console.log(tweet.full_text);
    id = tweet.id_str;
    console.log("id es: " + id);
    $.post(trackTweetURL, {
        id: id,
        text: tweet.full_text,
        tweet: JSON.stringify(tweet)
    }, function (response) {
        // Response
    });
}


let app = new Vue({
    el: "#buscador",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        user_to_search: "malditobulo", //"uki66816004",
        tweets: [],
        data_loaded: false
    },
    methods: {
        search_btn: search_btn,
        track_btn: track_btn
    }
});


on_page_load();

