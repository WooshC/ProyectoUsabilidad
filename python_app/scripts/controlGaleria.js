window.onload = function () { loadGallery();
    updateCarousel();
 }

var currentIndex = -1; // Iniciar con el primer lienzo centrado
const carousel = document.querySelector(".carousel");
let canvases;
let totalCanvases;

function loadGallery() {
    const gallery = document.querySelector(".carousel"); // Seleccionar el div con clase 'carousel'
    if (!gallery) return; // Evitar errores si no se encuentra el elemento

    gallery.innerHTML = ""; // Limpiar la galería antes de cargar nuevos elementos

    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.forEach((drawing, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.className = "lienzo";

        const img = document.createElement("img");
        img.src = drawing;
        img.alt = `Dibujo ${index + 1}`;
        img.onclick = () => {
            localStorage.setItem("selectedDrawing", JSON.stringify(drawing));
            window.location.href = "./dibujoLibre.html";
        };

        thumbnail.appendChild(img);
        gallery.appendChild(thumbnail);
        canvases = document.querySelectorAll(".lienzo");
        totalCanvases = canvases.length
    });
}

function updateCarousel() {
    const offset = -currentIndex * (400 + 30); // 400px de ancho + 30px de margen
    carousel.style.transform = `translateX(${offset}px)`;
}

function prevCanvas() {
    if (currentIndex > -1) {
        currentIndex--;
        updateCarousel();
    }
}

function nextCanvas() {
    if (currentIndex < totalCanvases - 2) {
        currentIndex++;
        updateCarousel();
    }
}

function downloadCanvas() {
    const imageData = JSON.parse(localStorage.getItem("drawings"))

    if (!imageData) {
        console.error("No se encontró la imagen en localStorage");
        return;
    }

    const link = document.createElement("a");
    link.href = imageData[currentIndex+1]; // Usamos la URL base64 de la imagen
    link.download = 'Nuevo.jpg';
    document.body.appendChild(link); // Necesario en algunos navegadores
    link.click();
    document.body.removeChild(link); // Limpiar el DOM

}

//Borrar
function deleteDrawingWithConfirmation() {
    showDialog(
        "Eliminar Dibujo",
        "¿Estás seguro de que quieres eliminar este dibujo?",
        deleteDrawing, // Acción si acepta
        () => { } // Acción si rechaza
    );
}
function deleteDrawing() {
    if (totalCanvases >= 1) {
        const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
        drawings.splice(currentIndex + 1, 1);
        localStorage.setItem("drawings", JSON.stringify(drawings));
        const canvasToRemove = canvases[currentIndex + 1];
        carousel.removeChild(canvasToRemove);
        canvases = document.querySelectorAll(".lienzo");
        totalCanvases = canvases.length;
        if (currentIndex >= totalCanvases) {
            currentIndex = totalCanvases - 1;
        }
        updateCarousel();
        showSuccessMessage("¡Dibujo Borrado con éxito!");
    }
}
// Función para mostrar el modal con opciones
function showDialog(title, message, confirmCallback, cancelCallback) {
    const modal = document.getElementById('actionModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;

    // Mostrar el modal
    modal.style.display = 'block';

    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    confirmButton.onclick = () => {
        confirmCallback();
        modal.style.display = 'none'; // Cerrar el modal
    };

    cancelButton.onclick = () => {
        if (cancelCallback) cancelCallback();
        modal.style.display = 'none'; // Cerrar el modal
    };
}

function showSuccessMessage(message) {
    const successMessageElement = document.getElementById('successMessage');
    const successTextElement = document.getElementById('successText');
    // Cambiar el mensaje del texto
    successTextElement.textContent = message;
    // Mostrar el mensaje
    successMessageElement.classList.add('show');
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        successMessageElement.classList.remove('show');
    }, 3000);
}

function obtenerUrlDeLaImagenSeleccionada() {
    // Verifica si hay imágenes en el carrusel
    if (totalCanvases === 0) {
        console.error("No hay imágenes en el carrusel.");
        return null;
    }

    // Obtén el índice de la imagen seleccionada
    const selectedIndex = currentIndex + 1; // Ajusta según tu lógica

    // Verifica si el índice es válido
    if (selectedIndex < 0 || selectedIndex >= totalCanvases) {
        console.error("Índice de imagen seleccionada no válido.");
        return null;
    }

    // Obtén la URL de la imagen seleccionada
    const selectedCanvas = canvases[selectedIndex];
    const selectedImage = selectedCanvas.querySelector("img");
    if (!selectedImage) {
        console.error("No se encontró la imagen seleccionada.");
        return null;
    }

    return selectedImage.src; // Devuelve la URL de la imagen
}

function shareCanvas() {
    const selectedImageUrl = obtenerUrlDeLaImagenSeleccionada(); // Obtén la URL de la imagen seleccionada

    if (!selectedImageUrl) {
        console.error("No se pudo obtener la URL de la imagen seleccionada.");
        return;
    }

    // Guarda la URL en localStorage
    localStorage.setItem('selectedImageUrl', selectedImageUrl);

    // Redirige a la página de compartir
    window.location.href = 'compartirYEnviar.html';
}