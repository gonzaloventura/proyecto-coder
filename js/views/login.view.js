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

const cuadroLogin = document.getElementById("login");

login.appendChild(loginBox);