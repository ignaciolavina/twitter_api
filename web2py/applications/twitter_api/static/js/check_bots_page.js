

let on_page_load = function () {
    // To get retrieve data
    console.log('************url******');
    console.log(window.location.href);
    console.log('************End******');

};


let check_bot = function () {
    console.log('check bots');
    if (app.user_to_search == "") {
        alert("Ooops! It seem that you forgot to fill the search bar");
        return;
    }
    $.getJSON(checkBotURL, {
        // word: app.word_search,
        // test_mode: app.test_mode
        user_to_search: app.user_to_search


    }, function (response) {
        // response
        app.response = response;
        app.result = response.result;
        console.log(app.result);

        animateValue("interactions", 0, 0.34 * 100, 1);
        animateValue("bot_score", 0, 0.25 * 100, 1);
        animateValue("followers", 0, 0.7 * 100, 1);


        // if (response.has_error) {
        //     alert("Vaya, parece que hubo un error: " + response.error_message);
        // } else {
        //     alert("La cuenta tiene una probabilidad de error de: ")
        // }

    })
};

let test = function () {
    // animateValue("bot_score", 0, app.result.scores.universal * 100, 500);
    animateValue("interactions", 0, 0.34 * 100, 1);
    animateValue("bot_score", 0, 0.23 * 100, 1);
    animateValue("followers", 0, 0.7 * 100, 1);
}


let animateValue = function (id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : +1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


let app = new Vue({
    el: "#buscador",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        user_to_search: "@malditobulo", //"uki66816004",
        response: ''
    },
    methods: {
        check_bot: check_bot,
    }
});


on_page_load();

