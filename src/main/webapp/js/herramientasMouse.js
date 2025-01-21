let lienzo;
let herramientaActual = "pincel";
let colorActual = "green";
let colorLienzo = "#FFF8E1";

const HERRAMIENTAS_DISPONIBLES = [
    "lapiz",
    "pincel",
    "spray",
    "borrador",
    "pintura"
];

const PALETA_COLORES = [
    "black", "gray", "maroon", "blue", "green", "yellow",
    "red", "orange", "purple", "pink", "white"
];

class Lienzo {
    constructor(x, y, w, h, title) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.title = title;
        this.visible = true;
        this.ultimoX = null;
        this.ultimoY = null;
        this.buffer = createGraphics(w, h);
        this.buffer.background(colorLienzo);
    }

    draw() {
        if (!this.visible) return;
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        image(this.buffer, this.x, this.y);
    }

    mousePressed(mx, my) {
        this.ultimoX = mx;
        this.ultimoY = my;
        switch (herramientaActual) {
            case "spray":
                this.dibujarConSpray(mx, my);
                break;
            case "lapiz":
                const colorOpaco = color(colorActual);
                colorOpaco.setAlpha(85);
                this.buffer.stroke(colorOpaco);
                this.buffer.strokeWeight(2);
                this.buffer.point(mx, my);
                break;
            case "pincel":
                this.buffer.stroke(colorActual);
                this.buffer.strokeWeight(5);
                this.buffer.point(mx, my);
                break;
            case "pintura":
                this.pintarEspacio(mx, my);
                break;
        }
    }

    mouseDragged(mx, my) {
        switch (herramientaActual) {
            case "spray":
                this.dibujarConSpray(mx, my);
                break;
            case "borrador":
                this.borrar(pmouseX - this.x, pmouseY - this.y, mx, my);
                break;
            case "lapiz":
                if (this.ultimoX !== null && this.ultimoY !== null) {
                    const colorOpaco = color(colorActual);
                    colorOpaco.setAlpha(85);
                    this.buffer.stroke(colorOpaco);
                    this.buffer.strokeWeight(2);
                    this.buffer.line(this.ultimoX, this.ultimoY, mx, my);
                }
                this.ultimoX = mx;
                this.ultimoY = my;
                break;
            case "pincel":
                if (this.ultimoX !== null && this.ultimoY !== null) {
                    this.buffer.stroke(colorActual);
                    this.buffer.strokeWeight(5);
                    this.buffer.line(this.ultimoX, this.ultimoY, mx, my);
                }
                this.ultimoX = mx;
                this.ultimoY = my;
                break;
        }
    }

    mouseReleased() {
        this.ultimoX = null;
        this.ultimoY = null;
    }

    dibujarConSpray(x, y) {
        let densidad = 25;
        let radio = 10;
        this.buffer.stroke(colorActual);
        this.buffer.strokeWeight(1);
        for (let i = 0; i < densidad; i++) {
            let angulo = random(TWO_PI);
            let r = random(radio);
            let offsetX = r * cos(angulo);
            let offsetY = r * sin(angulo);
            this.buffer.point(x + offsetX, y + offsetY);
        }
    }

    borrar(x1, y1, x2, y2, strokeWeightVal = 10) {
        this.buffer.stroke(colorLienzo);
        this.buffer.strokeWeight(strokeWeightVal);
        this.buffer.line(x1, y1, x2, y2);
    }

    pintarEspacio(x, y) {
        const nuevoColor = color(colorActual);
        this.buffer.loadPixels();

        let targetColor = this.buffer.get(x, y);
        let esElMismo = this.coloresIguales(targetColor, nuevoColor, 0);
        if (esElMismo) {
            return;
        }

        let pixelActivo = new Set();
        let queue = [[x, y]];

        const deberiaColorearPixel = (x1, y1) => {
            if (x1 < 0 ||
                y1 < 0 ||
                x1 > this.buffer.width ||
                y1 > this.buffer.height) { return false; }

            let idx = y1 * this.buffer.width + x1;
            if (pixelActivo.has(idx)) { return false; }

            let esteColor = this.buffer.get(x1, y1);
            return this.coloresIguales(esteColor, targetColor);
        };

        while (queue.length > 0) {
            let [x, y] = queue.shift();
            let idx = y * this.buffer.width + x;

            if (!pixelActivo.has(idx)) {
                this.buffer.set(x, y, nuevoColor);
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

        this.buffer.updatePixels();
        this.reemplazarBufferConElNuevoLienzo();
    }

    reemplazarBufferConElNuevoLienzo() {
        let nuevoBuffer = createGraphics(this.w, this.h);
        nuevoBuffer.image(this.buffer, 0, 0);
        this.buffer = nuevoBuffer;
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
}

function setup() {
    var canvasContainer = select('#canvas');
    var canva = createCanvas(canvasContainer.width, canvasContainer.height);
    // Posiciona el canvas en la misma ubicación del contenedor
    canva.position(canvasContainer.position().x, canvasContainer.position().y);
    lienzo = new Lienzo(0, 0, canva.width, canva.height, "nuevo");
    canva.parent('canvas');
}


function draw() {
    background(colorLienzo);  // Fondo del lienzo
    lienzo.draw();
    if (mouseIsPressed) if (mouseButton === RIGHT) herramientaActual = "lapiz";
}

function mousePressed() {
    lienzo.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
    lienzo.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
    lienzo.mouseReleased();
}

// Funciones para cambiar herramienta y color

function setHerramienta(herramienta) {
    herramientaActual = herramienta;
}

function setColor(color) {
    colorActual = color;
}

function clearLienzo() {
    lienzo.buffer.background(colorLienzo);
}

function downloadLienzo() {
    saveCanvas(lienzo.buffer, 'mi_dibujo', 'png');
}

// Función para mostrar u ocultar el cuadro de selección de colores
function toggleColors() {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.style.display = colorPicker.style.display === 'block' ? 'none' : 'block';
}

// Función para cambiar el color
function setColor(color) {
    colorActual = color;  // Asigna el color elegido a la variable global
    const colorPicker = document.getElementById('color-picker');
    colorPicker.style.display = 'none';  // Cierra el cuadro después de seleccionar un color
}
