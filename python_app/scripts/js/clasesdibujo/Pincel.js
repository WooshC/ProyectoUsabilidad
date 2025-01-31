import {Herramienta} from './Herramienta.js'; 

export class Pincel extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 5, 8, 11);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        buffer.point(posicionX, posicionY);
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        buffer.line(ultimoX, ultimoY, actualX, actualY);
    }
}