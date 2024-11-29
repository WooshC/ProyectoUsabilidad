<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HandiDraw</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Estilo global */
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            background-image: url('assests/imagenes/fondo1.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Encabezado */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 36px;
            color: #333;
        }

        /* Estilo del menú lateral */
        .menu {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
            max-width: 300px;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9); /* Fondo ligeramente transparente */
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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

        /* Contenido principal */
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            flex: 1;
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
            width: 100%;
            max-width: 560px;
            height: 315px;
            border-radius: 10px;
            border: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Media Queries para adaptabilidad */
        @media (max-width: 768px) {
            .menu {
                width: 100%;
                max-width: none;
            }

            .menu button {
                font-size: 16px;
                padding: 12px;
            }

            .content iframe {
                width: 100%;
                max-width: 100%;
            }
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 28px;
            }

            .menu button {
                font-size: 14px;
                padding: 10px;
            }

            .content img {
                width: 90%;
                max-width: 350px;
            }
        }

    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>HandiDraw</h1>
    </div>

    <div class="main-layout">
        <!-- Menú Lateral -->
        <div class="menu">
            <button onclick="navigate('dibujoLibre')"><i class="fas fa-pencil-alt"></i> Dibujo libre</button>
            <button onclick="navigate('pintarPlantilla')"><i class="fas fa-paint-brush"></i> Pintar plantilla</button>
            <button onclick="navigate('dibujoMemoria')"><i class="fas fa-brain"></i> Dibujo de memoria</button>
            <button onclick="navigate('calcarDibujo')"><i class="fas fa-drafting-compass"></i> Calcar un dibujo</button>
            <button onclick="navigate('galeria')"><i class="fas fa-images"></i> Galería</button>
        </div>

        <!-- Contenido principal -->
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
</div>

<script>
    function navigate(section) {
        alert('Navegando a: ' + section);
    }

    function startGame() {
        alert("Iniciando el juego...");
    }
</script>
</body>
</html>