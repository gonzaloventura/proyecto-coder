const autos = []

const nombre = localStorage.getItem("usuario") ? localStorage.getItem("usuario") : "";

window.onload = function() {
    const userCheck = localStorage.getItem("usuario");
    if (userCheck == "admin") {

        const getContainer = document.querySelector(".container");

        const h2 = document.createElement("h2");
        h2.textContent = `Bienvenido/a ${nombre}`;
        getContainer.appendChild(h2);

        mostrarAlerta("success", `El usuario <strong>${nombre}</strong> se encuentra autorizado.`);

        mostrarOpciones();

    } else {
        loginCreate();
        login();
    }
};

function loginCreate() {
    const main = document.getElementById("main");
    main.className = "fullscreen";

    const div = document.createElement("div");
    div.setAttribute("id", "login");
    div.className = "loginBox";
    const divLogo = document.createElement("div")
    divLogo.classList.add("logo");
    const loginBox = document.createElement("div");
    loginBox.className = "login";
    loginBox.innerHTML = `
    <div class="container">
        <div class="row">
            <h3>Ingresar al Sistema</h3>
            <div class="row">
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="nombreVisitante" placeholder="Para ingresar el usuario es admin">
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-primary" id="btn">Enviar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    main.appendChild(div);
    div.appendChild(divLogo)
    div.appendChild(loginBox);
};

function login() {

    const btnLogin = document.getElementById("btn");

    btnLogin.addEventListener("click", () => {
        localStorage.setItem("usuario", nombreVisitante.value);
        const usuarioLocalStorage = localStorage.getItem("usuario");

        if (!isUser(usuarioLocalStorage)) {
            mostrarAlerta("error", `El usuario <strong>${nombre}</strong> no se encuentra autorizado.`);
        } else {
            const main = document.getElementById("main");
            main.classList.remove("fullscreen");

            const login = document.getElementById("login");
            main.removeChild(login);

            const bienvenida = document.getElementById("mensajeBienvenida");
            bienvenida.textContent = `Bienvenido/a ${nombre}`;

            mostrarAlerta("success", `El usuario <strong>${nombre}</strong> se encuentra autorizado.`);

            mostrarOpciones();
        }
    });
}

function mostrarOpciones() {
    const opciones = ["Nuevo ingreso", "Ver Autos", "Autos Reparados", "Autos sin reparar", "Salir"];

    opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        if (opcion === "Salir") {
            boton.className = "btn btn-danger m-1";
        } else {
            boton.className = "btn btn-dark m-1";
        }

        opcionesUsuario = document.getElementById("opcionesUsuario");
        opcionesUsuario.appendChild(boton);

        boton.addEventListener("click", () => {
            if (opcion === "Nuevo ingreso") {
                nuevoIngreso();
            } else if (opcion === "Ver Autos") {
                verAutos(autos);
            } else if (opcion === "Autos Reparados") {
                verAutosReparados();
            } else if (opcion === "Autos sin reparar") {
                verAutosSinReparar();
            } else if (opcion === "Salir") {
                salir();
            }
        });

    });
}

function nuevoIngreso() {
    const menuUsuario = document.getElementById("opcionesUsuario");
    menuUsuario.setAttribute("style", "display: none");

    const containerMain = document.querySelector(".container");
    const divMain = document.createElement("div");
    divMain.classList.add("border", "border-secondary", "p-3", "rounded");
    divMain.innerHTML = `
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="nombre" placeholder="Cliente">
                </div>
            </div>
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="marca" placeholder="Marca">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="modelo" placeholder="Modelo">
                </div>
            </div>
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="dominio" placeholder="Dominio">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="odometro" placeholder="Kilometraje">   
                </div>
            </div>  
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <button class="btn btn-primary m-1" id="btnAgregar">Agregar</button>
            </div>
        </div>
    `;

    containerMain.appendChild(divMain);

    const btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const dominio = document.getElementById("dominio").value;
        const odometro = document.getElementById("odometro").value;

        const auto = new Auto(nombre, marca, modelo, dominio, odometro);
        autos.push(auto);

        mostrarAlerta("success", `<strong>¡Listo!</strong> Se cargó correctamente.`);

        const menuUsuario = document.getElementById("opcionesUsuario");
        menuUsuario.setAttribute("style", "display: block");

        const divMain = document.querySelector(".container");
        divMain.removeChild(divMain.lastChild);
    });
}

function verAutos(arrayAutos) {
    const container = document.querySelector(".container");
    const listResult = document.createElement("div")
    listResult.setAttribute("id", "listResult");

    listResult.innerHTML = "";

    for (let auto of autos) {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.innerHTML = `
            <div class="card-header">
                Cliente: ${auto.cliente}
            </div>
            <div class="card-body">
                <h6 class="card-title">Marca: ${auto.marca}</h6>
                <h6 class="card-title">Modelo: ${auto.modelo}</h6>
                <h6 class="card-title">Dominio: ${auto.dominio}</h6>
                <h6 class="card-title">Kilometraje: ${auto.odometro}</h6>
                <h6 class="card-title text-primary">Estado: ${auto.reparado ? "REPARADO" : 'SIN REPARAR'}</h6>
                <br>
                <button class="btn btn-info btn-sm" id="reparar">Marcar como reparado</button>
            </div>
        `;
        container.appendChild(listResult);
        listResult.appendChild(card);
    }
}

function verAutosSinReparar(arrayAutos) {
    const listResult = document.getElementById("listResult");
    listResult.innerHTML = "";

    let contador = 0;

    for (let auto of autos) {
        if (!auto.reparado) {
            const card = document.createElement("div");
            card.classList.add("card", "mb-3");
            card.innerHTML = `
                <div class="card-header">
                    Cliente: ${auto.cliente}
                </div>
                <div class="card-body">
                    <h6 class="card-title">Marca: ${auto.marca}</h6>
                    <h6 class="card-title">Modelo: ${auto.modelo}</h6>
                    <h6 class="card-title">Dominio: ${auto.dominio}</h6>
                    <h6 class="card-title">Kilometraje: ${auto.odometro}</h6>
                    <button class="btn btn-info btn-sm" id="reparar">Marcar como reparado</button>
                </div>
            `;
            listResult.appendChild(card);
        }
    }
}

function mostrarAlerta(status, mensaje) {
    const main = document.getElementById("main");
    if (status == "success") {
        const mensajeAlerta = document.createElement("div");
        mensajeAlerta.setAttribute("role", "alert");
        mensajeAlerta.setAttribute("id", "mensajeAlerta");
        mensajeAlerta.classList.add("container", "alert", "alert-success", "alert-dismissible", "fade", "show", "mt-3")
        mensajeAlerta.innerHTML = `
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        main.appendChild(mensajeAlerta);
    } else {
        const mensajeAlerta = document.createElement("div");
        mensajeAlerta.setAttribute("role", "alert");
        mensajeAlerta.setAttribute("id", "mensajeAlerta");
        mensajeAlerta.classList.add("container", "alert", "alert-danger", "alert-dismissible", "fade", "show", "mt-3")
        mensajeAlerta.innerHTML = `
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        main.appendChild(mensajeAlerta);
    }
}

function salir() {
    localStorage.removeItem("usuario");
    location.reload();
}