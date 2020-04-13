

let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');



    // Only for testing purposes
    // get_tweet();
};



let test_btn = function () {

    console.log("Testing function");
    $.getJSON(testURL, function (response) {
        console.log("Testing function");

    });
}


let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        test_mode: true,
        retweets: []
    },
    methods: {
        test_btn: test_btn
    }
});


on_page_load();

