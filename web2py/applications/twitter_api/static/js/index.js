let on_page_load = function () {
};

let action = function () {
    console.log('action');
}

let app = new Vue({
    el: "#index",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {

    },
    methods: {
        action: action
    }
});

on_page_load();

