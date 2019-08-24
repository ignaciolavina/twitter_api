
// check resultados! validation del anterior no se cumple si no le das al boton


let calculate_results = function (matches, parejas) {
    // console.log(parejas);
    console.log('Calculating resutls');
    for (let i = 0; i < matches.length; i++) {

        // find pareja_uno on parejas.array
        let pareja_uno = (parejas.find(x => x.id === matches[i].pareja_uno));
        let pareja_dos = (parejas.find(x => x.id === matches[i].pareja_dos));

        pareja_uno.juegos_favor += matches[i].resultado_uno;
        pareja_uno.juegos_contra += matches[i].resultado_dos;
        pareja_dos.juegos_favor += matches[i].resultado_dos;
        pareja_dos.juegos_contra += matches[i].resultado_uno;

        if (matches[i].resultado_uno > matches[i].resultado_dos) {
            pareja_uno.partidos_ganados++;
            pareja_dos.partidos_perdidos++;
        } else {
            pareja_uno.partidos_perdidos++;
            pareja_dos.partidos_ganados++;
        }
    }

    // Short the results by:
    // 1. matches_win - lost
    // 2. direct match
    // 3. diff games
    for (let i = 0; i < parejas.length; i++) {
        let parejas_empate = [];
        parejas_empate.push(parejas[i]);
        for (let j = (i + 1); j < parejas.length; j++) {
            let diferencia_partidos = (parejas[i].partidos_ganados - parejas[i].partidos_perdidos) - (parejas[j].partidos_ganados - parejas[j].partidos_perdidos);
            if (diferencia_partidos < 0) {
                let aux = parejas[i];
                parejas[i] = parejas[j];
                parejas[j] = aux;
            }
            // SI hay empate, anado a la lista de empatados la pareja
            if (diferencia_partidos == 0) {
                parejas_empate.push(parejas[j]);
            }
        }
        // Resuelvo los empates
        if (parejas_empate.length > 1) {
            // solve_tie(parejas_empate, parejas);
        }
    }

    for (let i = 0; i < parejas.length; i++) {
        let parejas_empate = [];
        parejas_empate.push(parejas[i]);
        for (let j = (i + 1); j < parejas.length; j++) {
            let diferencia_partidos = (parejas[i].partidos_ganados - parejas[i].partidos_perdidos) - (parejas[j].partidos_ganados - parejas[j].partidos_perdidos);
            if (diferencia_partidos == 0) {
                parejas_empate.push(parejas[j]);
            }

        }
        if (parejas_empate.length > 1) {
            solve_tie(parejas_empate, parejas);
        }
    }

};

let solve_tie = function (parejas_empatadas, parejas) {
    // alert('triple empate solved. Show grupo, y parejas');
    console.log('solve tie');
    console.log(parejas_empatadas);

}

let process_parejas = function (parejas) {
    console.log('processing matches');
    parejas.map((pareja) => {
        Vue.set(pareja, 'partidos_ganados', 0);
        Vue.set(pareja, 'partidos_perdidos', 0);
        Vue.set(pareja, 'juegos_favor', 0);
        Vue.set(pareja, 'juegos_contra', 0);
    });
};

let get_data = function () {
    $.getJSON(getResultsURL, function (response) {
        let max_group = response.max_group;
        for (let i = 0; i < max_group; i++) {
            if (response.parejas[i]) {
                process_parejas(response.parejas[i]);
                app.parejas_grupos.push(response.parejas[i]);
                app.enfrentamiento_grupos.push(response.enfrentamientos[i]);
                calculate_results(response.enfrentamientos[i], response.parejas[i]);

            }
        }
    });
};


let on_page_load = function () {
    get_data();
    // calculate_results();
};



// Change name to results_validation or sht like that
// let results = function () {

//     console.log('results');
//     for (let i = 0; i < app.grupos.length; i++) {
//         for (let j = 0; j < app.grupos[i].length; j++) {
//             console.log(app.grupos[i][j]);
//             if ((app.grupos[i][j].resultado_uno <= 0) || (app.grupos[i][j].resultado_dos <= 0)) {
//                 alert('Faltan resultados! Por favor, revisa el partido numero ' + app.grupos[i][j].id);
//                 return;
//             }
//             if (app.grupos[i][j].resultado_uno == app.grupos[i][j].resultado_dos) {
//                 alert('Por favor, revisa el resultado del partido numero: ' + app.grupos[i][j].id + ' (No hay un ganador)');
//                 return;
//             }
//         }
//     }

//     // GO to page
// };

let app = new Vue({
    el: "#app_resultados",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        enfrentamiento_grupos: [],
        parejas_grupos: []
    },
    methods: {
    }
});

on_page_load();