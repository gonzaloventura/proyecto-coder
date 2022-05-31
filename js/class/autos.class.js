class Auto {
    constructor(cliente, marca, modelo, dominio, odometro) {
        this.cliente = cliente;
        this.marca = marca;
        this.modelo = modelo;
        this.dominio = dominio;
        this.odometro = odometro;
        this.reparado = false;
    }

    consultarReparacion() {
        return this.reparado;
    }

    reparar() {
        this.reparado = true;
    }
}