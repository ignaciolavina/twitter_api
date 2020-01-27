
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
    });
}




// ______________________ VUE COMPONENT ______________________


let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        data_loaded: true,
        tweet: []
    },
    methods: {
        get_data: get_data,
    }
});


on_page_load();

