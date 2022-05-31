const autos = [];

const btnLogin = document.getElementById("btn");

btnLogin.addEventListener("click", () => {
    const nombre = nombreVisitante.value;
    if (!isUser(nombre)) {
        const mensajeError = document.getElementById("notificacion");
        mensajeError.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            El usuario <strong>${nombre}</strong> no se encuentra autorizado.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    } else {

        const login = document.getElementById("login");
        login.removeChild(loginBox);

        const bienvenida = document.getElementById("mensajeBienvenida");
        bienvenida.textContent = `Bienvenido/a ${nombre}`;

        const mensajeAlerta = document.getElementById("notificacion");
        mensajeAlerta.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            El usuario <strong>${nombre}</strong> se encuentra autorizado.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

        mostrarOpciones();

    }
});

function mostrarOpciones() {
    const opciones = ["Nuevo ingreso", "Ver Autos", "Autos Reparados", "Autos sin reparar", "Salir"];

    opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        if (opcion === "Salir") {
            boton.className = "btn btn-danger m-1";
        } else {
            boton.className = "btn btn-primary m-1";
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
                location.reload();
            }
        });

    });
}

function nuevoIngreso() {
    const menuUsuario = document.getElementById("opcionesUsuario");
    menuUsuario.setAttribute("style", "display: none");

    const listResult = document.getElementById("listResult");
    listResult.innerHTML = "";

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

        const mensajeAlerta = document.getElementById("notificacion");
        mensajeAlerta.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Auto agregado correctamente
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

        const menuUsuario = document.getElementById("opcionesUsuario");
        menuUsuario.setAttribute("style", "display: block");

        const divMain = document.querySelector(".container");
        divMain.removeChild(divMain.lastChild);
    });
}

function verAutos(arrayAutos) {
    const listResult = document.getElementById("listResult");
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
        listResult.appendChild(card);
    }
}

function verAutosSinReparar(arrayAutos) {
    const listResult = document.getElementById("listResult");
    listResult.innerHTML = "";

    const mensajeAlerta = document.getElementById("notificacion");

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
            contador++;
        }
    }
    if (contador !== 0) {
        mensajeAlerta.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
               Hay ${contador} auto/s sin reparar
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
    } else {
        mensajeAlerta.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                No hay autos sin reparar
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
    }
}