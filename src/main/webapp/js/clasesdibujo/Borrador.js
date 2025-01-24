import {Herramienta} from './Herramienta.js'; 

export class Borrador extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
    }

    definirGrosor() {
        return super(grosorSeleccionado, grosor1 = 4, grosor2 = 5, grosor3 = 6);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {}

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        buffer.line(ultimoX, ultimoY, actualX, actualY);
    }
}