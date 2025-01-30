from datetime import date
import mysql.connector
from tabulate import tabulate  

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

# Función para crear un artista
def crear_artista(nombre, correo):
    query = """
    INSERT INTO artistas (nombre, correo)
    VALUES (%s, %s)
    """
    valores = (nombre, correo)
    cursor.execute(query, valores)
    conexion.commit()
    print(f"Artista '{nombre}' creado con éxito.")

# Función para crear una obra de arte
def crear_obra_arte(id_artista, nombre_obra, descripcion, fecha_creacion):
    query = """
    INSERT INTO obras_arte (id_artista, nombre_obra, descripcion, fecha_creacion)
    VALUES (%s, %s, %s, %s)
    """
    valores = (id_artista, nombre_obra, descripcion, fecha_creacion)
    cursor.execute(query, valores)
    conexion.commit()
    print(f"Obra de arte '{nombre_obra}' creada con éxito.")

# Función para consultar la tabla artistas
def consultar_artistas():
    query = "SELECT * FROM artistas"
    cursor.execute(query)
    resultados = cursor.fetchall()
    print("\n--- Artistas ---")
    print(tabulate(resultados, headers=["ID", "Nombre", "Correo", "Fecha de Registro"], tablefmt="pretty"))

# Función para consultar la tabla obras_arte
def consultar_obras_arte():
    query = "SELECT * FROM obras_arte"
    cursor.execute(query)
    resultados = cursor.fetchall()
    print("\n--- Obras de Arte ---")
    print(tabulate(resultados, headers=["ID Obra", "ID Artista", "Nombre Obra", "Descripción", "Fecha Creación", "Puntaje", "Records"], tablefmt="pretty"))

# Función para consultar la tabla logros
def consultar_logros():
    query = "SELECT * FROM logros"
    cursor.execute(query)
    resultados = cursor.fetchall()
    print("\n--- Logros ---")
    print(tabulate(resultados, headers=["ID Logro", "ID Artista", "Título", "Descripción", "Fecha Logro"], tablefmt="pretty"))

# Función para consultar la tabla puntajes
def consultar_puntajes():
    query = "SELECT * FROM puntajes"
    cursor.execute(query)
    resultados = cursor.fetchall()
    print("\n--- Puntajes ---")
    print(tabulate(resultados, headers=["ID Puntaje", "ID Obra", "Puntaje", "Fecha Puntaje"], tablefmt="pretty"))

# Función para consultar la tabla records
def consultar_records():
    query = "SELECT * FROM records"
    cursor.execute(query)
    resultados = cursor.fetchall()
    print("\n--- Records ---")
    print(tabulate(resultados, headers=["ID Record", "ID Obra", "Record", "Fecha Record"], tablefmt="pretty"))

# Ejemplo de uso
if __name__ == "__main__":
    # Crear un artista

    # Consultar todas las tablas
    consultar_artistas()
    consultar_obras_arte()
    consultar_logros()
    consultar_puntajes()
    consultar_records()

    # Cerrar la conexión
    cursor.close()
    conexion.close()