export class Herramienta {
    constructor(colorImpregnado, grosor) {
        if (new.target === Herramienta) {
            throw new Error("No se puede instanciar una clase abstracta.");
        }
        this.colorImpregnado = colorImpregnado;
        this.grosor = this.definirGrosor(grosor);
    }

    definirGrosor(grosorSeleccionado,grosor1 = 1,grosor2=2,grosor3=3) {
        const grosores = {
            pequeño : grosor1,
            mediano : grosor2,
            grande : grosor3
        };
        return grosores[grosorSeleccionado] || 1;
    }

    iniciarTrazo() {
        throw new Error("Debe implementar el método iniciarTrazo en la clase hija.");
    }

    trazar() {
        throw new Error("Debe implementar el método trazar en la clase hija.");
    }
}