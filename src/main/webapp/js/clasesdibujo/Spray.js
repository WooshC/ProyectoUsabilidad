import {Herramienta} from './Herramienta.js'; 

export class Spray extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
        this.densidad = this.definirDensidad(grosor);
        this.radio = this.definirRadio(grosor)
    }

    definirGrosor() {
        return super(grosorSeleccionado, grosor1 = 1, grosor2 = 1, grosor3 = 1);
    }

    definirRadio(grosor) {
        const radios = {
            pequeño : 20,
            mediano : 30,
            grande : 40
        };
        return radios[grosor] || 20;
    }

    definirDensidad(grosor) {
        const radios = {
            pequeño : 60,
            mediano : 90,
            grande : 120
        };
        return radios[grosor] || 60;
    }


    iniciarTrazo(posicionX, posicionY, buffer) {
        dibujarEfecto(posicionX,posicionY,buffer);
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {
        dibujarEfecto(actualX,actualY,buffer);
    }

    dibujarEfecto(x,y,buffer){
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        for (let i = 0; i < this.densidad; i++) {
            let angulo = random(TWO_PI);
            let r = random(this.radio);
            let offsetX = r * cos(angulo);
            let offsetY = r * sin(angulo);
            this.buffer.point(x + offsetX, y + offsetY);
        }
    }
}