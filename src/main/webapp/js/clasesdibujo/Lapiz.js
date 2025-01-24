import {Herramienta} from './Herramienta.js'; 

export class Lapiz extends Herramienta {

    constructor(color, grosor) {
        const colorOpaco = color(color)
        colorOpaco.setAlpha(85);
        super(colorOpaco, grosor);
    }

    definirGrosor() {
        return super(grosorSeleccionado, grosor1 = 2, grosor2 = 3, grosor3 = 4);
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