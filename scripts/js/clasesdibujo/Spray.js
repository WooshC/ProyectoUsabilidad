import {Herramienta} from './Herramienta.js'; 

export class Spray extends Herramienta {

    constructor(p5, color, grosor) {
        super(color, grosor);
        this.definirDensidad(grosor);
        this.definirRadio(grosor);
        this.p5 = p5;
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 1, 1, 1);
        this.definirDensidad(grosorSeleccionado);
        this.definirRadio(grosorSeleccionado);
    }

    definirRadio(grosor) {
        const radios = {
            pequeño : 20,
            mediano : 30,
            grande : 40
        };
        this.radio = radios[grosor] || 20;
    }

    definirDensidad(grosor) {
        const densidades = {
            pequeño : 60,
            mediano : 90,
            grande : 120
        };
        this.densidad = densidades[grosor] || 60;
    }


    iniciarTrazo(posicionX, posicionY, buffer) {
        this.dibujarEfecto(posicionX,posicionY,buffer);
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {
        this.dibujarEfecto(actualX,actualY,buffer);
    }

    dibujarEfecto(x,y,buffer){
        buffer.stroke(this.colorImpregnado);
        buffer.strokeWeight(this.grosor);
        for (let i = 0; i < this.densidad; i++) {
            let angulo = this.p5.random(this.p5.TWO_PI);
            let r = this.p5.random(this.radio);
            let offsetX = r * this.p5.cos(angulo);
            let offsetY = r * this.p5.sin(angulo);
            buffer.point(x + offsetX, y + offsetY);
        }
    }
}