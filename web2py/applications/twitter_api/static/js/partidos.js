

let process_match = function (matches) {
    // Vue.set(match, 'property', 5);
};

let get_partidos = function () {
    $.getJSON(getPartidosURL, function (response) {
        let max_group = response.max_group;
        for (let i = 0; i < max_group; i++) {
            // process_match(response.enfrentamiento[i]);
            app.grupos.push(response.enfrentamiento[i]);
        }
    });
};


let on_page_load = function () {
    get_partidos();
};

let save_changes = function (index, result_one, result_two) {
    $.post(saveResultURL, {
        index: index,
        result_one: result_one,
        result_two: result_two
    }, function (response) {

    });
};

// Change name to results_validation or sht like that
let results = function () {

    console.log('results');
    for (let i = 0; i < app.grupos.length; i++) {
        for (let j = 0; j < app.grupos[i].length; j++) {
            console.log(app.grupos[i][j]);
            if ((app.grupos[i][j].resultado_uno < 0) || (app.grupos[i][j].resultado_dos < 0)) {
                alert('Faltan resultados! Por favor, revisa el partido numero ' + app.grupos[i][j].id);
                return;
            }
            if (app.grupos[i][j].resultado_uno == app.grupos[i][j].resultado_dos) {
                alert('Por favor, revisa el resultado del partido numero: ' + app.grupos[i][j].id + ' (No hay un ganador)');
                return;
            }
        }
    }

    // GO to page
};

let app = new Vue({
    el: "#app_partidos",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        grupos: []
    },
    methods: {
        save_changes: save_changes,
        results: results
    }
});

on_page_load();