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
        const nuevoColor = this.p5.color(this.colorImpregnado);
        buffer.loadPixels();

        const xInicial = Math.round(posicionX);
        const yInicial = Math.round(posicionY);

        const targetColor = this.getPixelColor(buffer, xInicial, yInicial);
        const nuevoColorRGBA = this.colorToRGBA(nuevoColor);

        if (this.coloresIguales(targetColor, nuevoColorRGBA)) {
            return;
        }

        const procesado = new Array(buffer.width)
            .fill()
            .map(() => new Array(buffer.height).fill(false));

        const stack = [[xInicial, yInicial]];

        while (stack.length > 0) {
            const [x, y] = stack.pop();

            const xRedondeado = Math.round(x);
            const yRedondeado = Math.round(y);

            if (
                xRedondeado < 0 ||
                yRedondeado < 0 ||
                xRedondeado >= buffer.width ||
                yRedondeado >= buffer.height ||
                procesado[xRedondeado][yRedondeado]
            ) {
                continue;
            }

            const currentColor = this.getPixelColor(buffer, xRedondeado, yRedondeado);

            if (this.coloresIguales(currentColor, targetColor)) {
                this.setPixelColor(buffer, xRedondeado, yRedondeado, nuevoColorRGBA);
                procesado[xRedondeado][yRedondeado] = true;

                // Agregar vecinos al stack (redondeados)
                stack.push([xRedondeado + 1, yRedondeado]);
                stack.push([xRedondeado - 1, yRedondeado]);
                stack.push([xRedondeado, yRedondeado + 1]);
                stack.push([xRedondeado, yRedondeado - 1]);
            }
        }

        buffer.updatePixels();
    }

    getPixelColor(buffer, x, y) {
        const xRedondeado = Math.round(x);
        const yRedondeado = Math.round(y);
        const idx = (yRedondeado * buffer.width + xRedondeado) * 4;
        return [
            buffer.pixels[idx],     
            buffer.pixels[idx + 1], 
            buffer.pixels[idx + 2], 
            buffer.pixels[idx + 3],
        ];
    }

    setPixelColor(buffer, x, y, color) {
        const xRedondeado = Math.round(x);
        const yRedondeado = Math.round(y);
        const idx = (yRedondeado * buffer.width + xRedondeado) * 4;
        buffer.pixels[idx] = color[0];     
        buffer.pixels[idx + 1] = color[1]; 
        buffer.pixels[idx + 2] = color[2]; 
        buffer.pixels[idx + 3] = color[3]; 
    }

    colorToRGBA(color) {
        return [
            this.p5.red(color),
            this.p5.green(color),
            this.p5.blue(color),
            this.p5.alpha(color),
        ];
    }

    coloresIguales(col1, col2, tolerancia = 10) {
        return (
            Math.abs(col1[0] - col2[0]) <= tolerancia &&
            Math.abs(col1[1] - col2[1]) <= tolerancia &&
            Math.abs(col1[2] - col2[2]) <= tolerancia &&
            Math.abs(col1[3] - col2[3]) <= tolerancia
        );
    }

    trazar(ultimoX, ultimoY, actualX, actualY, buffer) {}
}