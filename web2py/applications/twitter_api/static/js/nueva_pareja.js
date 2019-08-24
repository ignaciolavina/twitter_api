
let on_page_load = function () {
}


let form_validation = function () {
    if (app.jugador_uno == "") {
        alert('Por favor, introduzca el nombre al menos del primer jugador');
        return false;
    }
    else if ((app.grupo < 0) || (app.grupo > 50)) {
        alert('Por favor, introduzca el grupo correctamente');
        return false;
    }
    else if (app.grupo.toString() == '-' || app.grupo.toString() == "+" || app.grupo.toString() == "e") {
        alert('Por favor, introduzca el grupo correctamente');
        return false;
    }
    else {
        return true;
    }
};

let submit = function () {
    let valid_form = form_validation();
    if (valid_form) {
        $.post(saveParejaURL, {
            jugador_uno: app.jugador_uno,
            jugador_dos: app.jugador_dos,
            restricciones_uno: app.restricciones_uno,
            restricciones_dos: app.restricciones_dos,
            grupo: app.grupo

        }, function (response) {
            console.log(response);
            // Double check
            if (response) {
                console.log("added correctly");
                window.location.href = '/';
            }
            else {
                alert('Algo fue mal, por favor vuelve a intentarlo');
            }
        })
        // console.log('valid form');
    }
}

let app = new Vue({
    el: "#nueva_pareja",
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        jugador_uno: '',
        jugador_dos: '',
        restricciones_uno: '',
        restricciones_dos: '',
        grupo: ''
    },
    methods: {
        submit: submit
    }
});

on_page_load();