  // Función para recibir y mostrar la imagen
  function recibirImagen() {
    const imagenRecibida = document.getElementById('imagenRecibida');
    const imagenBase64 = localStorage.getItem('imagenCompartida');

    if (imagenBase64) {
        imagenRecibida.src = imagenBase64; // Mostrar la imagen recibida
        localStorage.removeItem('imagenCompartida'); // Limpiar el LocalStorage
    } else {
        // Si no hay imagen en LocalStorage, mostrar la imagen predeterminada
        imagenRecibida.src = '../assets/imagenes/Dibujo.png';
        console.log('No se recibió ninguna imagen. Mostrando imagen predeterminada.');
    }
}

// Llamar a la función al cargar la página
window.onload = recibirImagen;