import {Herramienta} from './Herramienta.js'; 

export class Borrador extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 10, 15, 20);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {}

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        buffer.line(ultimoX, ultimoY, actualX, actualY);
    }

    cambiarColor(){
        super.cambiarColor(this.colorImpregnado);
    }
}