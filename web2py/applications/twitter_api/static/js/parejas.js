

// Processes the books and adds an index to each one
let processParejas = function () {
    console.log('process qgrsdxwESDZ');
    let index = 0;
    app.parejas.map((pareja) => {
        Vue.set(pareja, 'index', index++);
        Vue.set(pareja, 'on_edit', false);
    });
};

let on_page_load = function () {
    console.log('on_page_load');
    get_parejas();
    get_logged_user();
}

let get_logged_user = function () {
    $.getJSON(loggedUserURL, function (response) {
        if (response.user != null) {
            app.logged = true;
            console.log(response.user);

        }
    });
};

let delete_pareja = function (pareja) {

    // app.parejas.pop();
    console.log('delete pareja por implementar');
    console.log(pareja);
    $.post(deleteParejaURL, {
        id: pareja.id,
        jugador_uno: pareja.jugador_uno,
        jugador_dos: pareja.jugador_dos
    }, function (response) {
        console.log(pareja);
        app.parejas.splice(pareja.index, 1);
        processParejas();
    });
};

let edit_pareja = function (pareja) {
    console.log('edit pareja');
    app.parejas.forEach(function (pareja) {
        pareja.on_edit = false;
    });
    pareja.on_edit = true;
};

// Validation when updating pareja
let validate_form = function (pareja) {
    if (pareja.grupo < 0) {
        pareja.grupo = 0;
    }
    if (pareja.grupo > 20) {
        pareja.grupo = 20;
    }

};

let update_pareja = function (pareja) {
    console.log('update_pareja');

    // Validation
    validate_form(pareja);

    $.post(updateParejaURL, {
        id: pareja.id,
        grupo: pareja.grupo,
        jugador_uno: pareja.jugador_uno,
        jugador_dos: pareja.jugador_dos,
        nombre_jugador_uno: pareja.nombre_jugador_uno,
        nombre_jugador_dos: pareja.nombre_jugador_dos,
        restricciones_jugador_uno: pareja.restriccion_jugador_uno,
        restricciones_jugador_dos: pareja.restriccion_jugador_dos
    }, function (response) {
        // correctly updated
    });

    pareja.on_edit = false;
}

let get_parejas = function () {
    console.log('get_parejas');
    $.getJSON(getParejasURL, function (response) {
        app.parejas = response.parejas;
        processParejas();
    });
    console.log(app.parejas);
};

let app = new Vue({
    el: "#app_parejas",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        parejas: [],
        logged: false
    },
    methods: {
        delete_pareja: delete_pareja,
        edit_pareja: edit_pareja,
        update_pareja: update_pareja
    }
});

on_page_load();