import {Herramienta} from './Herramienta.js'; 

export class Pincel extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
    }

    definirGrosor() {
        return super(grosorSeleccionado, grosor1 = 5, grosor2 = 6, grosor3 = 7);
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