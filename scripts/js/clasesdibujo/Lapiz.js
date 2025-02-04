import {Herramienta} from './Herramienta.js'; 

export class Lapiz extends Herramienta {
    constructor(p5, color, grosor) {
        let opacidad = 85
        let colorOpaco = p5.color(color);
        colorOpaco.setAlpha(opacidad);
        super(colorOpaco, grosor);
        this.opacidad = opacidad;
        this.p5 = p5;
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 1, 2, 3);
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

    cambiarColor(color){
        let colorOpaco = this.p5.color(color);
        colorOpaco.setAlpha(this.opacidad);
        super.cambiarColor(colorOpaco)
    }
}