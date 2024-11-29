<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Estudiantil EPN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/header.css"> <!-- Enlace al CSS externo -->
</head>
<body>
<header class="bg-blue-600 text-white p-4">
    <div class="container flex justify-between items-center">
        <div class="flex items-center">
            <img src="${pageContext.request.contextPath}/imagenes/buho.webp" alt="Búho" class="mr-2" width="32" height="32"/>
            <h1 class="text-2xl font-bold">Portal Estudiantil EPN</h1>
        </div>
        <nav>
            <ul class="nav">
                <!-- Redirige a los controladores -->
                <li><a href="${pageContext.request.contextPath}/Inicio" class="nav-link">Inicio</a></li>
                <li><a href="${pageContext.request.contextPath}/Servicios" class="nav-link">Servicios</a></li>
                <li><a href="${pageContext.request.contextPath}/Contacto" class="nav-link">Contacto</a></li>
            </ul>
        </nav>
    </div>
</header>

<script>
    // JavaScript Personalizado
    // Aquí puedes agregar tu código JavaScript personalizado.
</script>
</body>
</html>
