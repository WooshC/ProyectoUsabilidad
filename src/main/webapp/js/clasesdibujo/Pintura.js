import { Herramienta } from './Herramienta.js';

export class Pintura extends Herramienta {

    constructor(p5, color, grosor) {
        super(color, grosor);
        this.p5 = p5;
    }

    definirGrosor(grosorSeleccionado) {
        super.definirGrosor(grosorSeleccionado, 1, 1, 1);
    }

    iniciarTrazo(posicionX, posicionY, buffer) {
        posicionX = Math.floor(posicionX);
        posicionY = Math.floor(posicionY);

        const nuevoColor = this.p5.color(this.colorImpregnado).levels;
        buffer.loadPixels();

        const pixels = buffer.pixels;
        const width = buffer.width;

        const getPixelColor = (x, y) => {
            let idx = 4 *(y * width + x);
            return [pixels[idx], pixels[idx + 1], pixels[idx + 2], pixels[idx + 3]];
        };

        const setPixelColor = (x, y, color) => {
            let idx = 4 *(y * width + x);
            pixels[idx] = color[0];
            pixels[idx + 1] = color[1];
            pixels[idx + 2] = color[2];
            pixels[idx + 3] = color[3];
        };

        let targetColor = getPixelColor(posicionX, posicionY);


        let esElMismo = this.coloresIguales(targetColor, nuevoColor, 0);
        if (esElMismo) {
            return;
        }

        let pixelActivo = new Set();
        let stack = [[posicionX, posicionY]];

        const deberiaColorearPixel = (x1, y1) => {
            if (x1 < 0 ||
                y1 < 0 ||
                x1 > buffer.width ||
                y1 > buffer.height) { return false; }

            let idx = y1 * buffer.width + x1;
            if (pixelActivo.has(idx)) { return false; }

            let esteColor = getPixelColor(x1, y1);
            return this.coloresIguales(esteColor, targetColor);
        };

        while (stack.length > 0) {
            let [x, y] = stack.pop();
            let idx = y * buffer.width + x;

            if (!pixelActivo.has(idx)) {
                setPixelColor(x, y, nuevoColor);
                pixelActivo.add(idx);

                let direcciones = [
                    [0, -1],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                ];

                for (let [xOffset, yOffset] of direcciones) {
                    if (deberiaColorearPixel(x + xOffset, y + yOffset)) {
                        stack.push([x + xOffset, y + yOffset]);
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
                this.p5.red(color),
                this.p5.green(color),
                this.p5.blue(color),
                this.p5.alpha(color),
            ];
        } else {
            if (color.length === 3) {
                return [...color, 255];
            }
            return color;
        }
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) { }
}