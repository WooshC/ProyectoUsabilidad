import {Herramienta} from './Herramienta.js'; 

export class Pintura extends Herramienta {

    constructor(p5,color, grosor) {
        super(color, grosor);
        this.p5 = p5;
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 1, 1, 1);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {
        const nuevoColor = this.p5.color(this.colorImpregnado);
        buffer.loadPixels();

        let targetColor = buffer.get(posicionX, posicionY);
        let esElMismo = this.coloresIguales(targetColor, nuevoColor, 0);
        if (esElMismo) {
            return;
        }

        let pixelActivo = new Set();
        let queue = [[posicionX, posicionY]];

        const deberiaColorearPixel = (x1, y1) => {
            if (x1 < 0 ||
                y1 < 0 ||
                x1 > buffer.width ||
                y1 > buffer.height) { return false; }

            let idx = y1 * buffer.width + x1;
            if (pixelActivo.has(idx)) { return false; }

            let esteColor = buffer.get(x1, y1);
            return this.coloresIguales(esteColor, targetColor);
        };

        while (queue.length > 0) {
            let [x, y] = queue.shift();
            let idx = y * buffer.width + x;

            if (!pixelActivo.has(idx)) {
                buffer.set(x, y, nuevoColor);
                pixelActivo.add(idx);

                let direcciones = [
                    [0, -1],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                ];

                for (let [xOffset, yOffset] of direcciones) {
                    if (deberiaColorearPixel(x + xOffset, y + yOffset)) {
                        queue.push([x + xOffset, y + yOffset]);
                    }
                }
            }
        }

        buffer.updatePixels();
    }

    coloresIguales(col1, col2, tolerancia = 10) {
        col1 = this.normalizarColor(col1);
        col2 = this.normalizarColor(col2);

        return (
            Math.abs(col1[0] - col2[0]) <= tolerancia &&
            Math.abs(col1[1] - col2[1]) <= tolerancia &&
            Math.abs(col1[2] - col2[2]) <= tolerancia &&
            Math.abs(col1[3] - col2[3]) <= tolerancia
        );
    }

    normalizarColor(color) {
        if (color instanceof this.p5.color) {
            return [
                red(color),
                green(color),
                blue(color),
                alpha(color),
            ];
        } else {
            if (color.length === 3) {
                return [...color, 255];
            }
            return color;
        }
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {}
}