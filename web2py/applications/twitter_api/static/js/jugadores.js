
let on_page_load = function () {
    get_jugadores();
};

let process_jugadores = function () {
    console.log('process_jugafores');
    console.log(app.jugadores);
    let index = 0;
    app.jugadores.map((jugador) => {
        Vue.set(jugador, 'index', index++);
        Vue.set(jugador, 'show', true);
    });
};


// Retrieve all the players from applicationCache.py
let get_jugadores = function () {
    $.getJSON(getJugadoresURL, function (response) {
        app.jugadores = response.jugadores;
        process_jugadores();
    });
};

// mark as paid
let change_pagado = function (jugador) {
    $.post(changePagadoURL, {
        id: jugador.id,
        pagado: !jugador.pagado
    }, function (response) {

    });
    jugador.pagado = !jugador.pagado;
};

// mark present as given
let change_regalo = function (jugador) {
    $.post(changeRegaloURL, {
        id: jugador.id,
        regalo: !jugador.regalo
    }, function (response) {

    });
    jugador.regalo = !jugador.regalo;
};

let do_search = function () {
    app.search_string = app.search_string.toLowerCase();
    if (app.search_string == '') {
        app.jugadores.forEach(function (jugador) {
            jugador.show = true;
        });
        return;
    }

    app.jugadores.forEach(function (jugador) {
        if (jugador.nombre.toLowerCase().includes(app.search_string)) {
            jugador.show = true;
            console.log(jugador.show);
        } else {
            jugador.show = false
        }
    });

};

let app = new Vue({
    el: "#jugadores",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        jugadores: [],
        search_string: ''
    },
    methods: {
        change_pagado: change_pagado,
        change_regalo: change_regalo,
        do_search: do_search
    }
});

on_page_load();