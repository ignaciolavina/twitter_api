let on_page_load = function () {
    get_grupos()
};

// function that retrieves the groups from the server api.py
let get_grupos = function () {
    $.getJSON(getGruposURL, function (response) {
        let max_group = response.max_group;
        app.parejas_sin_grupo = response.parejas_sin_grupo;
        for (let i = 0; i < max_group; i++) {
            app.grupos.push(response.parejas[i]);
        }
    });
};

let assign_group = function (pareja, id, grupo) {
    // Validation
    if (grupo < 0) {
        grupo = 0;
    }

    // pareja.grupo = grupo;
    // if (grupo <= 0) {
    //     app.parejas_sin_grupo.push(pareja);
    // } else {
    //     app.grupos[grupo - 1].push(pareja);
    // }

    // app.parejas_sin_grupo.remove(pareja);
    $.post(saveGroupURL, {
        index: id,
        grupo: grupo,
    }, function (response) {
        // get_grupos();
    });
    // console.log(id);
};

let app = new Vue({
    el: "#app_grupos",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        parejas_sin_grupo: [],
        grupos: []
    },
    methods: {
        get_grupos: get_grupos,
        assign_group: assign_group

    }
});

on_page_load();

