<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>HandiDraw</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 36px;
            color: #333;
        }

        .menu {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 300px;
            float: left;
        }

        .menu button {
            padding: 15px;
            font-size: 18px;
            text-align: left;
            background-color: #ffcc80;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .menu button:hover {
            background-color: #ffa726;
        }

        .menu button i {
            font-size: 24px;
        }

        .content {
            margin-left: 350px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .content img {
            width: 400px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .content button {
            padding: 10px 20px;
            font-size: 18px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .content button:hover {
            background-color: #388e3c;
        }

        .content iframe {
            width: 560px;
            height: 315px;
            border-radius: 10px;
            border: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('imagenes/fondo1.png'); /* Reemplaza con la ruta correcta */
            background-size: cover; /* Ajusta la imagen para que cubra toda la pantalla */
            background-repeat: no-repeat; /* Evita que la imagen se repita */
            background-attachment: fixed; /* Hace que el fondo se quede fijo al hacer scroll */
            background-position: center; /* Centra la imagen */
        }

    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>HandiDraw</h1>
    </div>
    <div class="menu">
        <button onclick="navigate('dibujoLibre')"><i class="fas fa-pencil-alt"></i> Dibujo libre</button>
        <button onclick="navigate('pintarPlantilla')"><i class="fas fa-paint-brush"></i> Pintar plantilla</button>
        <button onclick="navigate('dibujoMemoria')"><i class="fas fa-brain"></i> Dibujo de memoria</button>
        <button onclick="navigate('calcarDibujo')"><i class="fas fa-drafting-compass"></i> Calcar un dibujo</button>
        <button onclick="navigate('galeria')"><i class="fas fa-images"></i> Galería</button>
      </div>
    <div class="content">
        <iframe
                src="https://www.youtube.com/embed/COwC0F6wxbU?start_radio=1&list=RDCOwC0F6wxbU"
                title="Video de YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>
        <button onclick="startGame()">Jugar</button>
    </div>
</div>


<script>
    function navigate(section) {

        // Aquí puedes redirigir a otras páginas o cargar contenido dinámico.
    }

    function startGame() {
        alert("Iniciando el juego...");
        // Aquí puedes incluir la lógica para iniciar el juego o la funcionalidad deseada.
    }
</script>
</body>
</html>
