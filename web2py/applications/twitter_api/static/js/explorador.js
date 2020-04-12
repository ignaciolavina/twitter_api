

let on_page_load = function () {
    // Fetch the data
    fetch_data();
};


let fetch_data = function (tweet) {
    $.post(fetchDataURL, {
    }, function (response) {
        app.data = response.data;
        // app.tweets = response.data;
        for (let i = 0; i < app.data.length; i++) {
            try {
                app.tweets.push(JSON.parse(app.data[i].tweet));
            } catch (e) {
                console.log("error")
            }
        }
        app.data_loaded = true;
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
        fetch_data: fetch_data
    }
});


on_page_load();

