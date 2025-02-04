import {Lapiz} from './Lapiz.js';
import {Pincel} from './Pincel.js';
import {Borrador} from './Borrador.js';
import {Spray} from './Spray.js';
import {Pintura} from './Pintura.js';

export class Lienzo {
    constructor(p,x, y, w, h, title, colorLienzo) {
        this.p5 =p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.title = title;
        this.visible = true;
        this.ultimoX = null;
        this.ultimoY = null;
        this.buffer = this.p5.createGraphics(w, h);
        this.buffer.pixelDensity(1);
        this.buffer.background(colorLienzo);

        this.historial = [];
    }

    draw() {
        if (!this.visible) return;
        this.p5.fill(0);
        this.p5.rect(this.x, this.y, this.w, this.h);
        this.p5.image(this.buffer, this.x, this.y);
    }

    guardarEstado() {
        let bufferActual = this.p5.createGraphics(this.w, this.h);
        bufferActual.pixelDensity(1);
        bufferActual.image(this.buffer, 0, 0);
        this.historial.push(bufferActual);
    }

    deshacerAlEstadoPrevio() {
        if (this.historial.length <= 0) {
            return;
        }
        this.buffer = this.historial.pop();
    }

    mousePressed(mx, my, herramientaActual) {
        this.guardarEstado()
        this.ultimoX = mx;
        this.ultimoY = my;

        herramientaActual.iniciarTrazo(mx,my,this.buffer);
    }

    mouseDragged(mx, my, herramientaActual) {
        if (this.ultimoX !== null && this.ultimoY !== null) {
            herramientaActual.trazar(this.ultimoX, this.ultimoY, mx, my, this.buffer)
        }
        this.ultimoX = mx;
        this.ultimoY = my;
    }

    mouseReleased() {
        this.ultimoX = null;
        this.ultimoY = null;
    }

    limpiarLienzo(colorLienzo){
        this.buffer.clear();
        this.buffer.background(colorLienzo);
        this.historial = [];
    }
}