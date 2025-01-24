import {Herramienta} from './Herramienta.js'; 

export class Pintura extends Herramienta {

    constructor(color, grosor) {
        super(color, grosor);
    }

    definirGrosor() {
        return super(grosorSeleccionado, grosor1 = 1, grosor2 = 1, grosor3 = 1);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {
        const nuevoColor = color(this.colorImpregnado);
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
        this.reemplazarBufferConElNuevoLienzo(buffer);
    }

    reemplazarBufferConElNuevoLienzo(buffer) {
        let nuevoBuffer = createGraphics(this.w, this.h);
        nuevoBuffer.image(buffer, 0, 0);
        buffer = nuevoBuffer;
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
        if (color instanceof p5.Color) {
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