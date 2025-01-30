from datetime import date, datetime
import mysql.connector

# Configuración de la conexión a la base de datos
config = {
    'user': 'root',          # Usuario
    'password': '1234',      # Contraseña
    'host': 'localhost',     # Host (usa 'localhost' o '127.0.0.1')
    'database': 'accesibilidad',   # Base de datos
    'port': 3309             # Puerto mapeado en Docker Compose
}

# Conectar a la base de datos
try:
    conexion = mysql.connector.connect(**config)
    cursor = conexion.cursor()
    print("¡Conexión exitosa!")
except mysql.connector.Error as err:
    print(f"Error de conexión: {err}")
    exit()

# Función para verificar si una obra fue completada en tiempo récord
def es_tiempo_record(id_obra):
    # Consulta para obtener el tiempo de creación de la obra
    query = """
    SELECT fecha_creacion 
    FROM obras_arte 
    WHERE id_obra = %s
    """
    cursor.execute(query, (id_obra,))
    resultado = cursor.fetchone()

    if resultado:
        fecha_creacion = resultado[0]
        # Si fecha_creacion es un datetime.datetime, conviértelo a datetime.date
        if isinstance(fecha_creacion, datetime):
            fecha_creacion = fecha_creacion.date()

        # Supongamos que el tiempo récord es menos de 7 días desde la fecha de registro del artista
        query_artista = """
        SELECT fecha_registro 
        FROM artistas 
        WHERE id_artista = (
            SELECT id_artista 
            FROM obras_arte 
            WHERE id_obra = %s
        )
        """
        cursor.execute(query_artista, (id_obra,))
        fecha_registro = cursor.fetchone()[0]

        # Si fecha_registro es un datetime.datetime, conviértelo a datetime.date
        if isinstance(fecha_registro, datetime):
            fecha_registro = fecha_registro.date()

        # Calcular la diferencia en días
        diferencia_dias = (fecha_creacion - fecha_registro).days
        return diferencia_dias < 7  # Si completó la obra en menos de 7 días, es un récord
    return False

# Función para asignar un logro a un artista
def asignar_logro(id_artista, titulo, descripcion):
    fecha_actual = date.today()
    query = """
    INSERT INTO logros (id_artista, titulo, descripcion, fecha_logro)
    VALUES (%s, %s, %s, %s)
    """
    valores = (id_artista, titulo, descripcion, fecha_actual)
    cursor.execute(query, valores)
    conexion.commit()
    print(f"Logro '{titulo}' asignado al artista con ID {id_artista}.")

# Lógica principal
def verificar_y_asignar_logro(id_obra):
    if es_tiempo_record(id_obra):
        # Obtener el ID del artista
        query_artista = """
        SELECT id_artista 
        FROM obras_arte 
        WHERE id_obra = %s
        """
        cursor.execute(query_artista, (id_obra,))
        id_artista = cursor.fetchone()[0]

        # Asignar el logro
        titulo = "Completado en tiempo récord"
        descripcion = "El artista completó una obra de arte en menos de 7 días desde su registro."
        asignar_logro(id_artista, titulo, descripcion)
    else:
        print("La obra no fue completada en tiempo récord.")

# Ejemplo de uso
id_obra_ejemplo = 1  # Cambia este valor por el ID de la obra que quieras verificar
verificar_y_asignar_logro(id_obra_ejemplo)

# Cerrar la conexión
cursor.close()
conexion.close()